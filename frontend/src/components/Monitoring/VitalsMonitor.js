import React, { useState, useEffect } from 'react';
import { Line } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Thermometer, Wind } from 'lucide-react';

const VitalsMonitor = ({ deviceId }) => {
  const [vitalsData, setVitalsData] = useState({
    heartRate: 0,
    spO2: 0,
    temperature: 0,
    respirationRate: 0
  });
  const [alertStatus, setAlertStatus] = useState('normal');

  useEffect(() => {
    const socket = new WebSocket(`ws://your-backend-url/vitals/${deviceId}`);
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setVitalsData(data.vitals);
      setAlertStatus(data.alertStatus);
    };

    return () => socket.close();
  }, [deviceId]);

  const renderAlert = () => {
    if (alertStatus === 'critical') {
      return (
        
          
            Critical condition detected! Emergency services have been notified.
          
        
      );
    }
    return null;
  };

  return (
    
      
        
          
            
            Heart Rate
          
          
            {vitalsData.heartRate} BPM
          
        
      

      
        
          
            
            SpO2
          
          
            {vitalsData.spO2}%
          
        
      

      
        
          
            
            Temperature
          
          
            {vitalsData.temperature}°C
          
        
      

      {renderAlert()}
    
  );
};

export default VitalsMonitor;
