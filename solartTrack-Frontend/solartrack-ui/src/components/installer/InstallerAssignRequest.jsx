import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

function InstallerAssignRequest() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get the ID from localStorage
    const installerId = localStorage.getItem('installerId');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                // The URL must include /requests/ to match your Backend Controller
                const response = await api.get(`requests/installer/${installerId}`);
                setRequests(response.data);
                setError(null);
            } catch (err) {
                console.error("Fetch error details:", err);
                setError("Could not load requests. Please check connection.");
            } finally {
                setLoading(false);
            }
        };

        if (installerId) {
            fetchRequests();
        } else {
            setError("No Installer ID found. Please log in again.");
            setLoading(false);
        }
    }, [installerId]);

    if (loading) return <p>Loading assigned tasks...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    const handleStatusUpdate=async(requestId) =>{
        try{
            await api.put(`requests/status/${requestId}?status=completed`)

            setRequests(prevRequests => 
            prevRequests.map(req => 
                req.id === requestId ? { ...req, status: 'completed' } : req
            ))
            alert("Installation status updated to Completed!");
        }catch(e){
            console.error(e);
            alert("Request Status not updated")
        }
    } 

    return (
        <div style={{ padding: '20px' }}>
            <h2>My assigned Installations</h2>
            
            {requests.length > 0 ? (
                <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#323030' }}>
                        <tr>
                            <th>Request ID</th>
                            <th>Resident ID</th>
                            <th>Capacity (KW)</th>
                            <th>Request Date</th>
                            <th>System Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((re) => (
                            <tr key={re.id}>
                                <td>{re.id}</td>
                                <td>{re.residentId}</td> 
                                <td>{re.capacitykw}</td>
                                <td>{re.requestDate}</td>
                                <td>{re.systemType}</td>
                                <td>
                                    {re.status === 'completed' ? (
                                        <span style={{ color: 'green', fontWeight: 'bold' }}>Completed</span>
                                    ) : (
                                        <button 
                                            onClick={() => handleStatusUpdate(re.id)}
                                            style={{
                                                backgroundColor: '#28a745',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 12px',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Mark as Complete
                                        </button>
                                    )}
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div style={{ padding: '20px', border: '1px dashed #ccc' }}>
                    <p>No requests found for Installer ID: {installerId}</p>
                </div>
            )}
        </div>
    );
}

export default InstallerAssignRequest;