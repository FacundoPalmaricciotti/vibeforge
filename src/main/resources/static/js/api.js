const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080/api'
    : 'https://vibeforge-backend.onrender.com/api';

const api = {
    async get(endpoint) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("API GET Error:", error);
            throw error;
        }
    },
    async post(endpoint, data) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const text = await response.text();
            try { return JSON.parse(text); } catch { return text; }
        } catch (error) {
            console.error("API POST Error:", error);
            throw error;
        }
    },
    async put(endpoint, data) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error("API PUT Error:", error);
            throw error;
        }
    },
    async patch(endpoint, data) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error("API PATCH Error:", error);
            throw error;
        }
    },
    async borrar(endpoint) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'DELETE' 
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return true; 
        } catch (error) {
            console.error("API DELETE Error:", error);
            throw error;
        }
    }
};