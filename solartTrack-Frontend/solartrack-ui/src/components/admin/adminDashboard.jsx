import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [view, setView] = useState('residents'); 
    const [residents, setResidents] = useState([]);
    const [installers, setInstallers] = useState([]);
const navigate = useNavigate();

    const loadData = async () => {
        try {
            const resData = await api.get('/residents/all'); 
            const instData = await api.get('/installers/all');
            setResidents(resData.data);
            setInstallers(instData.data);
        } catch (error) {
            console.error("Error:", error);
            alert("Data nahi aa raha!");
        }
    };
    const handleDelete=async(id)=>{
        if(window.confirm("confirm want to Delete INSTALLER")){
            try{
                await api.delete(`/installers/delete/${id}`);
                alert("Instlller is deleted")
                loadData()
            }
            catch(error){
                console.error("Delete karne mein error:", error);
                alert("Delete nahi ho paya, check karo backend!");                
            }
        }
    };

    useEffect(() => {
        loadData();
    }, []);
    const handleLogout = () => {
        // Agar tumne token storage use kiya hota toh yahan clear karte
        // Filhal simple redirect karte hain
        if (window.confirm("Kya aap logout karna chahte hain?")) {
            navigate('/admin'); // 3. Wapas login page par bhejo
        }
    };

    return (
        <div>
            {/* Header Buttons */}
            <div>
                <button onClick={() => setView('residents')}>
                    Show Residents ({residents.length})
                </button>
                <button onClick={() => setView('installers')}>
                    Show Installers ({installers.length})
                </button>
                <button onClick={loadData}>Refresh Data</button>
            </div>

      <button 
                    onClick={handleLogout} 
                    
                    style={{ marginLeft: 'auto', background: 'red', color: 'white', cursor: 'pointer' }}
                >
                    Logout 🚪
                </button>
            <hr />

            <h2>Current View: {view}</h2>

            {/* Residents Table */}
            {view === 'residents' && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Contact ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Aadhaar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.map((r) => (
                            <tr key={r.contactId}>
                                <td>{r.contactId}</td>
                                <td>{r.name}</td>
                                <td>{r.email}</td>
                                <td>{r.aadhaar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Installers Table */}
            {view === 'installers' && (
                <div>
                    <div style={{ marginBottom: '10px' }}>
                       <button 
                            onClick={() => navigate('/installer-register')}
                            style={{ background: 'green', color: 'white', padding: '5px 10px', cursor: 'pointer' }}
                        >
                            + Add New Installer
                        </button>
                    </div>

                <table border="1">
                    <thead>
                        <tr>
                            <th>Contact ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>License No</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {installers.map((i) => (
                            <tr key={i.contactId}>
                                <td>{i.contactId}</td>
                                <td>{i.name}</td>
                                <td>{i.email}</td>
                                <td>{i.licenseNo}</td>
                                <td>
                                    <button
                                    onClick={()=>handleDelete(i.contactId)}
                                    style={{ background: 'orange', color: 'white', cursor: 'pointer', border: 'none', padding: '5px' }}
                                    >
                                        Delete 🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;