import React, { useState } from 'react';
import api from '../../api/axiosConfig';

function InstallerProfile() {
    const [model, setModel] = useState(false);
    
    // Initialize state from localStorage for real-time UI updates
    const [installer, setInstaller] = useState({
        name: localStorage.getItem('installerName') || 'Not available',
        email: localStorage.getItem('installerEmail') || 'Not Available',
        contactId: localStorage.getItem('installerId') || 'Not Available',
        license: localStorage.getItem('licenseNo') || 'Not Available',
        role: localStorage.getItem('installerRole') || 'INSTALLER',
    });

    const [selectedInstaller, setSelectedInstaller] = useState(null);

    const handleEdit = (currentInstaller) => {
        setSelectedInstaller({ ...currentInstaller });
        setModel(true);
    };

    const handleEditSave = async () => {
        try {
            await api.put(`/installers/update/${selectedInstaller.contactId}`, selectedInstaller);
            
            // Sync with LocalStorage
            localStorage.setItem('installerName', selectedInstaller.name);
            localStorage.setItem('installerEmail', selectedInstaller.email);
            localStorage.setItem('licenseNo', selectedInstaller.license);
            
            // Update local state to refresh UI
            setInstaller(selectedInstaller);
            
            alert("Profile updated successfully! ✅");
            setModel(false);
        } catch (e) {
            console.error(e);
            alert("A problem occurred while updating the Installer Profile");
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            {/* 👤 PROFILE HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Agency Profile</h2>
                    <p className="text-gray-500 font-medium">Manage your technical credentials and contact details</p>
                </div>
                <button 
                    onClick={() => handleEdit(installer)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center gap-2"
                >
                    <span>✏️</span> Edit Profile
                </button>
            </div>

            {/* 📋 PROFILE CARD */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50/50 p-6 border-b border-gray-100">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Official Records</h3>
                </div>
                
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Agency Name</p>
                        <p className="text-lg font-bold text-gray-800">{installer.name}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Official Email</p>
                        <p className="text-lg font-bold text-gray-800">{installer.email}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Installer ID</p>
                        <p className="text-lg font-mono font-bold text-gray-800">#{installer.contactId}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">License Number</p>
                        <p className="text-lg font-mono font-bold text-gray-800 tracking-tighter">
                            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-100">
                                {installer.license}
                            </span>
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Account Role</p>
                        <div className="flex">
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">
                                {installer.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🛠️ EDIT MODAL (POPUP) */}
            {model && selectedInstaller && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-900">Update Agency Data</h3>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">Technical Verification Required</p>
                        </div>
                        
                        <div className="p-8 space-y-5">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Agency Name</label>
                                <input 
                                    type="text" 
                                    className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                                    value={selectedInstaller.name} 
                                    onChange={(e) => setSelectedInstaller({...selectedInstaller, name: e.target.value})} 
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                                <input 
                                    type="email" 
                                    className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                                    value={selectedInstaller.email} 
                                    onChange={(e) => setSelectedInstaller({...selectedInstaller, email: e.target.value})} 
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Technical License</label>
                                <input 
                                    type="text" 
                                    className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all font-mono"
                                    value={selectedInstaller.license} 
                                    onChange={(e) => setSelectedInstaller({...selectedInstaller, license: e.target.value})} 
                                />
                            </div>
                        </div>

                        <div className="p-8 pt-4 flex gap-4">
                            <button 
                                onClick={handleEditSave} 
                                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all active:scale-95"
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
        </div>
    );
}

export default InstallerProfile;