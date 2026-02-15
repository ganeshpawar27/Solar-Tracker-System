import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

function AssignToInstaller() {
    const [requests, setRequests] = useState([]);
    const [installers, setInstallers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    
    // Ye state track karegi ki kis resident ki request select hui hai
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [selectedInstallerId, setSelectedInstallerId] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await api.get("/requests/approved");
            const instData = await api.get("/installers/all");
            setRequests(res.data);
            setInstallers(instData.data); // .data zaroori hai
        } catch (err) {
            console.error("Error:", err);
        }
    };

    // 1. Button click par ID catch karna aur modal kholna
    const openAssignModal = (id) => {
        setSelectedRequestId(id);
        setIsOpen(true);
    };

    // 2. Final assignment function
    const handleAssign = async () => {
    try {
        console.log("Selected Request ID:", selectedRequestId); // Ye number hona chahiye
    console.log("Selected Installer ID:", selectedInstallerId); // Ye bhi number hona chahiye
        await api.put(`/requests/assign/${selectedRequestId}?installerId=${selectedInstallerId}`);
        alert("Mubarak ho! Installer assign ho gaya.");
        setIsOpen(false);
        loadData(); // Table refresh karo
    } catch (err) {
        alert("Kuch gadbad hai!");
    }
};

    return (
        <div style={{ padding: '20px' }}>
            <h3>Approved Requests (Ready for Assignment)</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>ID</th>
                        <th>Resident</th>
                        <th>Capacity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <tr key={req.id}>
                            <td>{req.id}</td>
                            <td>{req.resident?.name}</td>
                            <td>{req.capacitykw} KW</td>
                            <td>
                                    <button onClick={() => openAssignModal(req.id)}>
                                    Choose Installer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 🛠️ MODAL LAYER (Abhi tumne ye nahi likha tha) */}
            {isOpen && (
                <div style={{ 
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                    backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', 
                    justifyContent: 'center', alignItems: 'center' 
                }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '300px', color: 'black' }}>
                        <h4>Assign for Request #{selectedRequestId}</h4>
                        
                        <label>Select Installer:</label>
                       <select 
                            onChange={(e) => {
                                const val = e.target.value;
                                console.log("Installer Select Hua uski ID:", val); // Debugging ke liye
                                setSelectedInstallerId(val);
                            }}
                        >
                            <option value="">-- Select --</option>
                            {installers.map(inst => (
                                /* Check karo ki backend se 'contactId' aa raha hai ya sirf 'id' */
                                <option key={inst.contactId || inst.id} value={inst.contactId || inst.id}>
                                    {inst.name}
                                </option>
                            ))}
                        </select>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button onClick={handleAssign} style={{ background: 'green', color: 'white' }}>Confirm</button>
                            <button onClick={() => setIsOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssignToInstaller;