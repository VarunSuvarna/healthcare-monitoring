import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import VitalChart from './VitalChart';
import PatientCard from './PatientCard';
import AlertModal from './AlertModal';
import { getPatients, getReadings } from '../services/api';
import { socket } from '../services/websocket';

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [readings, setReadings] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        loadPatients();
        setupWebSocket();
    }, []);

    const loadPatients = async () => {
        const data = await getPatients();
        setPatients(data);
    };

    const setupWebSocket = () => {
        socket.on('new_reading', (reading) => {
            setReadings(prev => [...prev, reading]);
        });

        socket.on('alert', (alert) => {
            setAlerts(prev => [...prev, alert]);
            // Show alert notification
        });

        return () => {
            socket.off('new_reading');
            socket.off('alert');
        };
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-bold">Patients</h2>
                        </CardHeader>
                        <CardContent>
                            {patients.map(patient => (
                                <PatientCard 
                                    key={patient.id}
                                    patient={patient}
                                    onClick={() => setSelectedPatient(patient)}
                                />
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-9">
                    {selectedPatient && (
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardContent>
                                    <VitalChart 
                                        data={readings}
                                        vitalSign="heart_rate"
                                        title="Heart Rate"
                                    />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <VitalChart 
                                        data={readings}
                                        vitalSign="oxygen_saturation"
                                        title="Oxygen Saturation"
                                    />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <VitalChart 
                                        data={readings}
                                        vitalSign="temperature"
                                        title="Temperature"
                                    />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <VitalChart 
                                        data={readings}
                                        vitalSign="blood_pressure"
                                        title="Blood Pressure"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
            <AlertModal 
                alerts={alerts}
                onClose={() => setAlerts([])}
            />
        </div>
    );
};
