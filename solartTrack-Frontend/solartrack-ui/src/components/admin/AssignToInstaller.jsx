import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

function AssignToInstaller() {
    const [requests, setRequests] = useState([]);
    const [installers, setInstallers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
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
            setInstallers(instData.data);
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const openAssignModal = (id) => {
        setSelectedRequestId(id);
        setIsOpen(true);
    };

    const handleAssign = async () => {
        if (!selectedInstallerId) {
            alert("Please select an installer first!");
            return;
        }
        try {
            await api.put(`/requests/assign/${selectedRequestId}?installerId=${selectedInstallerId}`);
            alert("Assignment successful! Installer notified.");
            setIsOpen(false);
            loadData(); 
        } catch (err) {
            alert("Assignment failed. Check server logs.");
        }
    };

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800">Assign Installation Tasks</h3>
                <p className="text-sm text-gray-500">Authorized requests ready for agency deployment</p>
            </div>

            {/* Main Table Container */}
            <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm bg-white">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Request ID</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Resident Name</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">System Capacity</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {requests.length > 0 ? (
                            requests.map((req) => (
                                <tr key={req.id} className="hover:bg-blue-50/20 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-blue-600 font-medium">#{req.id}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-700">{req.resident?.name || "N/A"}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
                                            {req.capacitykw} KW
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => openAssignModal(req.id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md shadow-blue-100 transition-all active:scale-95"
                                        >
                                            CHOOSE INSTALLER
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-400 font-medium italic">
                                    No approved requests currently pending assignment.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 🛠️ ASSIGNMENT MODAL */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="p-6 bg-gray-50 border-b border-gray-100">
                            <h4 className="text-lg font-bold text-gray-800">Assign Request #{selectedRequestId}</h4>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">Select Service Agency</p>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-8">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Available Installers</label>
                            <select 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 transition-all text-sm font-semibold text-gray-700"
                                onChange={(e) => setSelectedInstallerId(e.target.value)}
                            >
                                <option value="">-- Choose from List --</option>
                                {installers.map(inst => (
                                    <option key={inst.contactId || inst.id} value={inst.contactId || inst.id}>
                                        {inst.name} ({inst.licenseNo})
                                    </option>
                                ))}
                            </select>

                            {/* Modal Footer / Buttons */}
                            <div className="flex flex-col gap-3 mt-8">
                                <button 
                                    onClick={handleAssign} 
                                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                                >
                                    CONFIRM ASSIGNMENT
                                </button>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="w-full bg-gray-100 text-gray-500 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssignToInstaller;