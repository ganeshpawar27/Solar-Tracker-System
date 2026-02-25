import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

function PendingRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadPending();
    }, []);

    const loadPending = async () => {
        try {
            const res = await api.get("/requests/pending");
            setRequests(res.data);
        } catch (err) {
            console.error("Error loading pending requests", err);
            alert("Requests load nahi ho payi!");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/requests/status/${id}?status=${status}`);
            alert(`Application ${status} Successfully! ✅`);
            loadPending(); 
        } catch (err) {
            console.error("Update error", err);
            alert("Status update fail ho gaya!");
        }
    };

    return (
        <div className="w-full">
            {/* Table Header Section */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800">Pending Approvals</h3>
                <p className="text-sm text-gray-500">Review and verify new solar installation applications</p>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm bg-white">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">ID</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Resident Name</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Capacity</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">System Type</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {requests.length > 0 ? (
                            requests.map((req) => (
                                <tr key={req.id} className="hover:bg-blue-50/20 transition-colors group">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-400 text-center">#{req.id}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-700">
                                        {req.resident?.name || "Unknown Resident"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                                            {req.capacitykw} KW
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                        {req.systemType}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200">
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => updateStatus(req.id, 'Approved')}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md shadow-emerald-100 transition-all active:scale-95"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => updateStatus(req.id, 'Rejected')}
                                                className="bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-400 font-medium italic">
                                    All caught up! No pending requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PendingRequests;