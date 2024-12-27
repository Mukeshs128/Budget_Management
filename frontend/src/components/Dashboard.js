// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in first!');
            window.location.href = '/login'; // Redirect to login
            return;
        }

        try {
            const response = await axios.get('/dashboard', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setUserData(response.data);
        } catch (error) {
            alert('Session expired, please log in again.');
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login
        }
        };

        fetchData();
    }, []);

    return (
        <div>
        <h1>Dashboard</h1>
        {userData ? (
            <p>Welcome, {userData.message}</p>
        ) : (
            <p>Loading user data...</p>
        )}
        </div>
    );
}

export default Dashboard;
