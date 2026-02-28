import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

function InstallerAssignRequest() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // FIX 1: Use 'userId' to match your Login/Dashboard storage key
    const installerId = localStorage.getItem('installerId');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                // API call to your backend endpoint
                const response = await api.get(`requests/installer/${installerId}`);
                setRequests(response.data);
                setError(null);
            } catch (err) {
                console.error("Fetch error details:", err);
                setError("Could not load assigned tasks. Please check connection.");
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

    const handleStatusUpdate = async (requestId) => {
        try {
            // Update status to 'completed' in backend
            await api.put(`requests/status/${requestId}?status=completed`);

            setRequests(prevRequests => 
                prevRequests.map(req => 
                    req.id === requestId ? { ...req, status: 'completed' } : req
                )
            );
            alert("Installation status updated to Completed! ✅");
        } catch (e) {
            console.error(e);
            alert("Request Status not updated");
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
            <p className="ml-4 text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Tasks...</p>
        </div>
    );

    if (error) return (
        <div className="p-8 bg-red-50 border border-red-100 rounded-2xl text-center">
            <p className="text-red-600 font-bold italic">{error}</p>
        </div>
    );

    return (
        <div className="w-full animate-in fade-in duration-500">
           

            {requests.length > 0 ? (
                <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm bg-white">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Request ID</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Resident ID</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Capacity</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {requests.map((re) => (
                                <tr key={re.id} className="hover:bg-emerald-50/20 transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-emerald-600 font-bold">#{re.id}</td>
                                    
                                    {/* FIX 2: Accessing the ID inside the resident object */}
                                    <td className="px-6 py-4 text-sm font-bold text-gray-700">
                                        #{re.resident?.contactId || "N/A"}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                                            {re.capacitykw} KW
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            re.status === 'completed' 
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                            : 'bg-amber-50 text-amber-700 border-amber-100'
                                        }`}>
                                            {re.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {re.status === 'completed' ? (
                                            <span className="text-emerald-600 text-sm font-bold">✅ Done</span>
                                        ) : (
                                            <button 
                                                onClick={() => handleStatusUpdate(re.id)}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md shadow-emerald-100 transition-all active:scale-95"
                                            >
                                                Mark Complete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-white">
                    <p className="text-gray-400 font-bold">No assigned tasks found for ID: {installerId}</p>
                </div>
            )}
        </div>
    );
}

export default InstallerAssignRequest;