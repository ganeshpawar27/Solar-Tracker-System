import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

function ResidentDashboard() {
    // Initial state hamesha array hi rakho
    const [requests, setRequests] = useState([]);
    const residentId = localStorage.getItem('userId');

    useEffect(() => {
        // ResidentDashboard.jsx ka useEffect update karo
    const fetchMyData = async () => {
        try {
            const res = await api.get(`/requests/resident/${residentId}`);
            
            // Logical Fix: Agar data array nahi hai, toh use array mein wrap kar do
            const data = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
            setRequests(data);
            
        } catch (err) {
            console.error("Data load error!", err);
            setRequests([]);
        }
    };
        
        if (residentId) fetchMyData();
    }, [residentId]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>My Activity Overview</h2>
            <p>Yahan tumhari saari solar applications ka status dikhega.</p>
            
            <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '' }}>
                    <tr>
                        <th style={{ padding: '10px' }}>ID</th>
                        <th>Capacity (KW)</th>
                        <th>System Type</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Fix: Map se pehle check karna ki requests exist karta hai aur array hai */}
                    {requests && requests.length > 0 ? (
                        requests.map((r) => (
                            <tr key={r.id} style={{ textAlign: 'center' }}>
                                <td style={{ padding: '10px' }}>{r.id}</td>
                                <td>{r.capacitykw}</td>
                                {/* Java variable 'systemType' use kar rahe hain */}
                                <td>{r.systemType}</td> 
                                <td style={{ 
                                    fontWeight: 'bold', 
                                    color: r.status === 'Approved' ? 'green' : r.status === 'Rejected' ? 'red' : 'orange' 
                                }}>
                                    {r.status}
                                </td>
                                <td>{r.requestDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                Bhai, koi application nahi mili! ☀️
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ResidentDashboard;