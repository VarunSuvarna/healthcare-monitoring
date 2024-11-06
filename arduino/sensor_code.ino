'''cpp
#include 
#include 
#include 
#include 
#include 
#include 
#include 

MAX30105 particleSensor;
TinyGPSPlus gps;

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqtt_server = "YOUR_MQTT_SERVER";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

// Buffer for JSON document
StaticJsonDocument<200> doc;

void setup() {
  Serial.begin(115200);
  
  // Initialize sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30105 was not found. Please check wiring/power.");
    while (1);
  }
  
  particleSensor.setup();
  particleSensor.setPulseAmplitudeRed(0x0A);
  particleSensor.setPulseAmplitudeGreen(0);
  
  // Connect to WiFi
  setupWiFi();
  
  // Connect to MQTT
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Read sensor data
  long irValue = particleSensor.getIR();
  float temperature = particleSensor.getTemperature();
  int heartRate = getHeartRate();
  int spO2 = getSpO2();
  
  // Get GPS coordinates
  float latitude = gps.location.lat();
  float longitude = gps.location.lng();
  
  // Create JSON payload
  doc["deviceId"] = "DEVICE_001";
  doc["vitals"]["heartRate"] = heartRate;
  doc["vitals"]["temperature"] = temperature;
  doc["vitals"]["spO2"] = spO2;
  doc["location"]["coordinates"][0] = longitude;
  doc["location"]["coordinates"][1] = latitude;
  
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);
  
  // Publish to MQTT topic
  client.publish("health/vitals", jsonBuffer);
  
  delay(1000);
}

void setupWiFi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localAddress());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ArduinoClient")) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

int getHeartRate() {
  // Add heart rate calculation logic
  return 75; // Placeholder
}

int getSpO2() {
  // Add SpO2 calculation logic
  return 98; // Placeholder
}
'''
