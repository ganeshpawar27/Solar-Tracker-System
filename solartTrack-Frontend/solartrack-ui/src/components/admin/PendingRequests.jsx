import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

function PendingRequests() {
    const [requests, setRequests] = useState([]);

    // Page load hote hi pending requests mangwao
    useEffect(() => {
        loadPending();
    }, []);

    const loadPending = async () => {
        try {
            // Backend endpoint jo humne banaya hai
            const res = await api.get("/requests/pending");
            setRequests(res.data);
        } catch (err) {
            console.error("Error loading pending requests", err);
            alert("Requests load nahi ho payi!");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            // PUT request with Query Parameter for status
            await api.put(`/requests/status/${id}?status=${status}`);
            alert(`Application ${status} Successfully! ✅`);
            
            // List refresh karo taaki Approved/Rejected requests hat jayein
            loadPending(); 
        } catch (err) {
            console.error("Update error", err);
            alert("Status update fail ho gaya!");
        }
    };

    return (
        <div>
            <h3>Pending Solar Installation Requests</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: 'grey' }}>
                        <th>ID</th>
                        <th>Resident Name</th>
                        <th>Capacity (KW)</th>
                        <th>System Type</th>
                        <th>Current Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.length > 0 ? (
                        requests.map((req) => (
                            <tr key={req.id}>
                                <td>{req.id}</td>
                                {/* Resident object se name nikalna */}
                                <td>{req.resident?.name || "Unknown"}</td>
                                <td>{req.capacitykw}</td>
                                <td>{req.systemType}</td>
                                <td>{req.status}</td>
                                <td>
                                    <button 
                                        onClick={() => updateStatus(req.id, 'Approved')}
                                        style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => updateStatus(req.id, 'Rejected')}
                                        style={{ backgroundColor: 'red', color: 'white' }}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>
                                No pending requests found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PendingRequests;