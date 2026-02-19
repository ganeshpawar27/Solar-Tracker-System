import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';


function Profile() {
    const navigate = useNavigate();
    const [model,setModel]=useState(false);
    const [selectedResident,setSelectedResident]=useState(null);

    // LocalStorage se data nikalna (Jo Login ke waqt set kiya tha)
    const user = {
        name: localStorage.getItem('userName') || "Not Available",
        email: localStorage.getItem('userEmail') || "Not Available",
        contactId: localStorage.getItem('userId') || "Not Available",
        role: localStorage.getItem('userRole') || "RESIDENT"
    };
    const openEditModel=(currentUser)=>{
        setSelectedResident({...currentUser});
        setModel(true);
    }
   const handleEdit = async () => {
    try {
        await api.put(`/residents/update/${selectedResident.contactId}`, selectedResident);
        
        
        localStorage.setItem('userName', selectedResident.name);
        localStorage.setItem('userEmail', selectedResident.email);
        
        alert("Profile updated successfully! ✅");
        
        // 2. UI refresh karne ke liye reload zaroori hai 
        window.location.reload(); 
        
        setModel(false);
    } catch (e) {
        console.error("Update fail:", e);
        alert("Backend check karo, update nahi hua.");
    }
}

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2 style={{ color: '#333' }}>👤 User Profile</h2>
            <button onClick={()=>openEditModel(user)}>Edit</button>
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

           {/* 4. Edit Modal UI (Pop-up) */}
            {model && selectedResident && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '300px', color: 'black' }}>
                        <h3>Edit Profile</h3>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            style={{ width: '100%', marginBottom: '10px' }}
                            value={selectedResident.name} 
                            onChange={(e) => setSelectedResident({...selectedResident, name: e.target.value})} 
                        />
                        <label>Email:</label>
                        <input 
                            type="email" 
                            style={{ width: '100%', marginBottom: '10px' }}
                            value={selectedResident.email} 
                            onChange={(e) => setSelectedResident({...selectedResident, email: e.target.value})} 
                        />
                        <button onClick={handleEdit} style={{ background: 'green', color: 'white' }}>Save</button>
                        <button onClick={() => setModel(false)} style={{ marginLeft: '10px' }}>Cancel</button>
                    </div>
                </div>
            )}

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