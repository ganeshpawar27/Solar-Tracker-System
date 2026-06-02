import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

function ResidentDashboard() {
    const [requests, setRequests] = useState([]);
    const residentId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        const fetchMyData = async () => {
            try {
                const res = await api.get(`/requests/resident/${residentId}`);
                // Ensure data is always an array for mapping
                const data = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
                setRequests(data);
            } catch (err) {
                console.error("Data load error!", err);
                setRequests([]);
            }
        };
        
        if (residentId) fetchMyData();
    }, [residentId]);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* 🏷️ WELCOME HEADER */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                            Welcome, <span className="text-blue-600">{userName || 'Citizen'}</span>!
                        </h2>
                        <p className="text-gray-500 font-medium mt-1">
                            Track the status of your government-subsidized solar applications here.
                        </p>
                    </div>
                   
                </div>

                {/* 📊 ACTIVITY OVERVIEW CARD */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Application History</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Request ID</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">System Details</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Capacity</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">Current Status</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Submission Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {requests && requests.length > 0 ? (
                                    requests.map((r) => (
                                        <tr key={r.id} className="hover:bg-blue-50/20 transition-colors group">
                                            <td className="px-8 py-6 text-sm font-mono text-blue-600 font-bold">
                                                #{r.id}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-sm font-bold text-gray-800 uppercase tracking-tight">
                                                    {r.systemType}
                                                </div>
                                                <div className="text-[10px] text-gray-400 font-bold">Solar Photovoltaic System</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                                                    {r.capacitykw} KW
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                    r.status === 'Approved' 
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                                        : r.status === 'Rejected' 
                                                        ? 'bg-red-50 text-red-700 border-red-100' 
                                                        : 'bg-amber-50 text-amber-700 border-amber-100'
                                                }`}>
                                                    {r.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-sm text-gray-500 font-medium italic">
                                                {r.requestDate}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <div className="text-4xl mb-4">☀️</div>
                                            <div className="text-gray-400 font-bold text-lg">No solar applications found!</div>
                                            <p className="text-gray-400 text-sm">Start your green energy journey by applying today.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 💡 HELP INFO */}
                
            </div>
        </div>
    );
}

export default ResidentDashboard;