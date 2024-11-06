import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VitalChart = ({ data, vitalSign, title }) => {
    return (
        <div className="h-64">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="timestamp"
                        tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                    />
                    <YAxis />
                    <Tooltip 
                        labelFormatter={(label) => new Date(label).toLocaleString()}
                    />
                    <Line 
                        type="monotone"
                        dataKey={vitalSign}
                        stroke="#8884d8"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
