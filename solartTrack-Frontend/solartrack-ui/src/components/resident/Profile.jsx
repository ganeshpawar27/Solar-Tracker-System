import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

function Profile() {
    const navigate = useNavigate();
    const [model, setModel] = useState(false);
    const [selectedResident, setSelectedResident] = useState(null);

    // LocalStorage retrieval
    const user = {
        name: localStorage.getItem('userName') || "Not Available",
        email: localStorage.getItem('userEmail') || "Not Available",
        contactId: localStorage.getItem('userId') || "Not Available",
        role: localStorage.getItem('userRole') || "RESIDENT"
    };

    const openEditModel = (currentUser) => {
        setSelectedResident({ ...currentUser });
        setModel(true);
    }

    const handleEdit = async () => {
        try {
            await api.put(`/residents/update/${selectedResident.contactId}`, selectedResident);
            
            localStorage.setItem('userName', selectedResident.name);
            localStorage.setItem('userEmail', selectedResident.email);
            
            alert("Profile updated successfully! ✅");
            window.location.reload(); 
            setModel(false);
        } catch (e) {
            console.error("Update fail:", e);
            alert("Update failed. Please check your connection.");
        }
    }

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            {/* 👤 PROFILE HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Account Settings</h2>
                    <p className="text-gray-500 font-medium">Manage your personal information and security</p>
                </div>
                <button 
                    onClick={() => openEditModel(user)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
                >
                    <span>✏️</span> Edit Profile
                </button>
            </div>

            {/* 📋 PROFILE CARD */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50/50 p-6 border-b border-gray-100">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Personal Details</h3>
                </div>
                
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Full Name</p>
                        <p className="text-lg font-bold text-gray-800">{user.name}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Email Address</p>
                        <p className="text-lg font-bold text-gray-800">{user.email}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Contact ID</p>
                        <p className="text-lg font-mono font-bold text-gray-800">#{user.contactId}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Account Type</p>
                        <div className="flex">
                            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🛠️ EDIT MODAL */}
            {model && selectedResident && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">Verified Resident Account</p>
                        </div>
                        
                        <div className="p-8 space-y-5">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Display Name</label>
                                <input 
                                    type="text" 
                                    className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                                    value={selectedResident.name} 
                                    onChange={(e) => setSelectedResident({...selectedResident, name: e.target.value})} 
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                                <input 
                                    type="email" 
                                    className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                                    value={selectedResident.email} 
                                    onChange={(e) => setSelectedResident({...selectedResident, email: e.target.value})} 
                                />
                            </div>
                        </div>

                        <div className="p-8 pt-4 flex gap-4">
                            <button 
                                onClick={handleEdit} 
                                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                            >
                                SAVE CHANGES
                            </button>
                            <button 
                                onClick={() => setModel(false)} 
                                className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation back */}
            <div className="mt-8 text-center">
                <button 
                    onClick={() => navigate('/resident-dashboard')}
                    className="text-gray-400 hover:text-gray-900 text-sm font-bold transition-all flex items-center justify-center gap-2 mx-auto"
                >
                    ← Back to Dashboard Overview
                </button>
            </div>
        </div>
    );
}

export default Profile;