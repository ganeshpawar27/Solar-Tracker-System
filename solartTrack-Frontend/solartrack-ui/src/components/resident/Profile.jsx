import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    // LocalStorage se data nikalna (Jo Login ke waqt set kiya tha)
    const user = {
        name: localStorage.getItem('userName') || "Not Available",
        email: localStorage.getItem('userEmail') || "Not Available",
        contactId: localStorage.getItem('userId') || "Not Available",
        role: localStorage.getItem('userRole') || "RESIDENT"
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2 style={{ color: '#333' }}>👤 User Profile</h2>
            <hr />
            
            <div style={{ lineHeight: '2.5', fontSize: '18px' }}>
                <div>
                    <strong>Full Name:</strong> <span>{user.name}</span>
                </div>
                <div>
                    <strong>Email Address:</strong> <span>{user.email}</span>
                </div>
                <div>
                    <strong>Contact ID (User ID):</strong> <span>{user.contactId}</span>
                </div>
                <div>
                    <strong>Account Type:</strong> <span>{user.role}</span>
                </div>
            </div>

            <hr style={{ marginTop: '20px' }} />

            {/* Navigation back to Dashboard */}
            <button 
                onClick={() => navigate('/resident-dashboard')}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                }}
            >
                Back to Dashboard Overview
            </button>
        </div>
    );
}

export default Profile;