import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AlertModal = ({ alerts, onClose }) => {
    if (alerts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 space-y-2">
            {alerts.map((alert, index) => (
                <Alert key={index} variant="destructive">
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
            ))}
        </div>
    );
};
