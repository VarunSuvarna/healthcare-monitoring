# Healthcare Monitoring System

A real-time health monitoring system that tracks vital signs, provides emergency alerts, and securely stores data on the blockchain.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Installation and Setup](#installation-and-setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Arduino](#arduino)
  - [Blockchain](#blockchain)
- [Usage](#usage)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
The Healthcare Monitoring System is a comprehensive solution that combines real-time health data tracking, emergency alert detection, and secure data storage on the blockchain. The system consists of a backend API, a frontend web application, and an Arduino-based sensor device.

## Features
- Real-time vital sign monitoring (heart rate, SpO2, temperature, respiration rate)
- GPS location tracking
- Automated emergency alerts
- Real-time data visualization
- Historical data analysis
- Emergency service notification system
- Secure data storage on the Ethereum blockchain using IPFS

## Architecture
The system is designed with a modular architecture, consisting of the following components:

1. **Backend**:
   - RESTful API for device management and data handling
   - Real-time data processing using MQTT
   - Automated alert system for emergency situations
   - Data storage and analysis

2. **Frontend**:
   - Real-time vital signs monitoring dashboard
   - Alert visualization
   - Historical data views
   - Emergency contact management

3. **Arduino**:
   - Sensor integration (heart rate, SpO2, temperature)
   - WiFi connectivity
   - MQTT communication
   - GPS location tracking

4. **Blockchain**:
   - Secure health data storage using Ethereum smart contracts and IPFS
   - Access control and authorization management

## Installation and Setup

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`
3. Configure environment variables (e.g., database connection, MQTT broker, etc.).
4. Start the server: `npm start`

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Configure environment variables (e.g., API endpoint, MQTT server, etc.).
4. Start the development server: `npm start`

### Arduino
1. Install the required Arduino libraries (e.g., MAX30105, ESP8266WiFi, PubSubClient, ArduinoJson, TinyGPS++).
2. Update the configuration with your WiFi, MQTT, and Ethereum node credentials.
3. Upload the `blockchain_sensor_code.ino` sketch to your Arduino device.

### Blockchain
1. Ensure you have Truffle and Ganache (or another Ethereum development environment) installed.
2. Navigate to the `contracts` directory.
3. Compile the Solidity contract: `truffle compile`
4. Deploy the contract to your Ethereum network: `truffle migrate --network your_network`
5. Update the backend and frontend configurations with the deployed contract address.

## Usage
1. Power on the Arduino device and ensure it's connected to the network.
2. Start the backend server and frontend development server.
3. Access the web application in your browser and view the real-time health data and emergency alerts.
4. Interact with the system by registering devices, authorizing users, and monitoring patient health data.

## Security Considerations
- Implement proper authentication and authorization mechanisms.
- Use HTTPS for all API endpoints.
- Encrypt sensitive data before storing on the blockchain.
- Secure MQTT and Ethereum communication channels.
- Regularly audit the system for security vulnerabilities.

## Contributing
Contributions to the Healthcare Monitoring System project are welcome. Please follow the standard fork-and-pull-request workflow. If you have any questions or suggestions, feel free to open an issue.

## License
This project is licensed under the [MIT License](LICENSE).
