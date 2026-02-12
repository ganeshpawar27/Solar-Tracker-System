import React, { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

function SolarApplication() { 
    const [formData, setFormData] = useState({
        capacitykw: '', 
        systemType: 'On-Grid'
    });

    const navigate = useNavigate();
    const residentId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                capacitykw: parseFloat(formData.capacitykw),
                systemType: formData.systemType,
                status: "Pending",
                request_date: new Date().toISOString().split('T')[0],
                resident: { contactId: parseInt(residentId) }
            };

            await api.post("/requests/apply", payload);
            alert("Bhai, Application Submit Ho Gayi! ☀️");
            navigate('/resident-dashboard');
            
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Application fail ho gayi! Backend check karo.");
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '400px', margin: '40px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Solar Installation</h2>
            <form onSubmit={handleSubmit}>
                
                {/* Capacity Field */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Capacity (KW):</label>
                    <input 
                        type="number" 
                        step="0.1"
                        required 
                        placeholder="Enter KW (e.g. 3.0)"
                        value={formData.capacitykw}
                        onChange={(e) => setFormData({...formData, capacitykw: e.target.value})}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                    />
                </div>

                {/* System Type Field */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>System Type:</label>
                    <select
                        value={formData.systemType}
                        onChange={(e) => setFormData({...formData, systemType: e.target.value})}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'black' }}
                    >
                        <option value="On-Grid">On-Grid</option>
                        <option value="Off-Grid">Off-Grid</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    style={{ width: '100%', padding: '12px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
                >
                    Submit Application
                </button>

            </form>
        </div>
    );
}

export default SolarApplication;