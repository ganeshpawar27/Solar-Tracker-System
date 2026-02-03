import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

function ResidentDashboard() {
    const [requests, setRequests] = useState([]);
    const residentId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchMyData = async () => {
            try {
                const res = await api.get(`/api/solar/resident/${residentId}`);
                setRequests(res.data);
            } catch (err) {
                console.error("Data load error!");
            }
        };
        if(residentId) fetchMyData();
    }, [residentId]);

    return (
        <div>
            <h2>My Activity Overview</h2>
            <p>Yahan tumhari saari solar applications ka status dikhega.</p>
            
            <table border="1" style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Capacity (KW)</th>
                        <th>System Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((r) => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.capacitykw}</td>
                            <td>{r.system_type}</td>
                            <td>{r.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ResidentDashboard;