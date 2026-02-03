import React from 'react'
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

function SolarApplication() { 
    const [formData, setFormData] = useState({
        capacitykw: '',   // Matches DB column
        system_type: 'On-Grid', // Default value
        address: '',      // Optional but good for UI
        mobile: ''
    });

    const navigate = useNavigate();

    // imp after login to save userID
    const residentId = localStorage.getItem('userId');


        const handleSubmit=async(e)=>{
        e.prevenntDefault();
        try{
            const payload={
                capacitykw:parseFloat(formData.capacitykw),
                system_type:formData.system_type,
                status:"Pending",
                request_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
                // Foreign Key ke liye object bhej rahe hain
                resident: { contactId: parseInt(residentId) }

            }
            await api.post("/requests/apply",payload);
            alert("Bhai, Application Submit Ho Gayi! ☀️");
            navigate('/resident-dashboard');
            
        }catch (error) {
            console.error("Error submitting form:", error);
            alert("Application fail ho gayi! Backend ya Database check karo.");
        }

    };
  return (
    <>
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center' }}>☀️ Solar Installation Form</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Capacity Required (KW):</label>
                    <input 
                        type="number" 
                        step="0.1"
                        required 
                        placeholder="e.g. 3.5"
                        onChange={(e) => setFormData({...formData, capacitykw: e.target.value})}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>System Type:</label>
                    <select
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    onChange={(e) => setFormData({...formData, system_type: e.target.value})}>
                        <option value="On-Grid">On-Grid</option>
                        <option value="Off-Grid">Off-Grid</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Installation Address:</label>
                    <textarea 
                        required 
                        placeholder="fill the address"
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        style={{ width: '100%', padding: '8px', marginTop: '5px', height: '80px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Mobile Number:</label>
                    <input 
                        type="text" 
                        required 
                        placeholder="10 digit number"
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '12px', background: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Submit Application
                </button>

    </form>
    </div>
    </>
  )
}

export default SolarApplication
