import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
};

export const getPatients = async () => {
    const response = await api.get('/patients');
    return response.data;
};

export const getReadings = async (patientId) => {
    const response = await api.get(`/readings/${patientId}`);
    return response.data;
};
