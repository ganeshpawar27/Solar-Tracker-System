import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import InstallerProfile from './InstallerProfile';
import InstallerAssignRequest from './InstallerAssignRequest';
import { useNavigate } from 'react-router-dom';

function InstallerDashboard() {
    const [view, setView] = useState('InstallerAssignRequest'); // Default to tasks
    const [installer, setInstaller] = useState(null);
    const installerId = localStorage.getItem('userId');
    const installerName = localStorage.getItem('installerName') || 'Agency';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyData = async () => {
            try {
                const res = await api.get(`installers/${installerId}`);
                setInstaller(res.data);
            } catch (err) {
                console.error("Data load error!", err);
                setInstaller(null);
            }
        };
        if (installerId) fetchMyData();
    }, [installerId]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/installer');
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* 🏷️ HEADER NAVIGATION (Reference: image_068b40.png) */}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    
                    {/* Left Group: Logo and Nav Buttons aligned together */}
                    <div className="flex items-center gap-12">
                        {/* Branding / Logo */}
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-emerald-200 shadow-lg transition-transform hover:scale-105">
                                S
                            </div>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">
                                Solar<span className="text-emerald-600">Track</span>
                            </h1>
                        </div>

                        {/* Navigation Pill */}
                        <nav className="flex items-center bg-gray-100 p-1 rounded-xl">
                            <button
                                onClick={() => setView('InstallerAssignRequest')}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    view === 'InstallerAssignRequest' 
                                    ? 'bg-white text-emerald-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Assigned Tasks
                            </button>
                            
                            <button
                                onClick={() => setView('InstallerProfile')}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    view === 'InstallerProfile' 
                                    ? 'bg-white text-emerald-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Agency Profile
                            </button>
                        </nav>
                    </div>

                    {/* Right Side: Identity & Logout */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Technician Portal</span>
                            <span className="text-sm font-bold text-gray-900">{installerName}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-bold text-red-500 hover:bg-red-50 px-5 py-2 rounded-lg transition-all"
                        >
                            LOGOUT
                        </button>
                    </div>
                </div>
            </header>

            {/* 📊 MAIN CONTENT AREA */}
            <main className="max-w-7xl mx-auto p-8">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[60vh]">
                    
                    {view === "InstallerAssignRequest" && (
                        <div className="animate-in fade-in duration-500">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Assigned Work Orders</h2>
                                    <p className="text-sm text-gray-500">Review and update status of pending solar installations</p>
                                </div>
                                <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100">
                                    Active Projects
                                </div>
                            </div>
                            <InstallerAssignRequest />
                        </div>
                    )}

                    {view === "InstallerProfile" && (
                        <div className="animate-in fade-in duration-500">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">Agency Profile</h2>
                            <InstallerProfile data={installer} />
                        </div>
                    )}
                </div>
            </main>

            {/* Footer Tag */}
            <div className="max-w-7xl mx-auto px-8 pb-8">
                <p className="text-center text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold">
                    Authorized Service Provider | Dept. of Renewable Energy
                </p>
            </div>
        </div>
    );
}

export default InstallerDashboard;