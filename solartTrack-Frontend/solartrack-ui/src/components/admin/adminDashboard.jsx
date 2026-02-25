import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import ResidentsTable from './ResidentsTable';
import InstallersTable from './InstallersTable';
import PendingRequests from './PendingRequests';
import AssignToInstaller from './AssignToInstaller';
import Help from './Help'; // Import the Help component

function adminDashboard1() {
    // State management for view switching and data
    const [view, setView] = useState('residents');
    const [residents, setResidents] = useState([]);
    const [installers, setInstallers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [selectedInstaller, setSelectedInstaller] = useState(null);
    const [showModel, setShowModel] = useState(false);
    const navigate = useNavigate();

    // Initial data fetch from Spring Boot backend
    useEffect(() => {
        loadData();
    }, []);

    const handleLogout = () => {
        navigate('/admin');
    };

    const loadData = async () => {
        try {
            const resData = await api.get("/residents/all");
            const instData = await api.get("/installers/all");
            const reqData = await api.get("/requests/all");
            setResidents(resData.data);
            setInstallers(instData.data);
            setRequests(reqData.data);
        } catch (error) {
            console.error(error);
            alert("Data not found");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Really want to delete this Installer?")) {
            try {
                await api.delete(`/installers/delete/${id}`);
                alert("Installer deleted");
                loadData();
            } catch (e) {
                console.error(e);
                alert("Problem occurred while deleting");
            }
        }
    };

    const openEditModel = (installer) => {
        setSelectedInstaller({ ...installer });
        setShowModel(true);
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/installers/update/${selectedInstaller.contactId}`, selectedInstaller);
            alert("Installer updated successfully! ✅");
            setShowModel(false);
            loadData();
        } catch (e) {
            console.error(e);
        }
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
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-blue-200 shadow-lg transition-transform hover:scale-105">
                                S
                            </div>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">
                                Solar<span className="text-blue-600">Track</span>
                            </h1>
                        </div>

                        {/* Navigation Pill */}
                        <nav className="flex items-center bg-gray-100 p-1 rounded-xl">
                            <button
                                onClick={() => setView('help')}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    view === 'help' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Guide
                            </button>
                            
                            <button
                                onClick={() => setView('residents')}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    view === 'residents' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Residents
                            </button>

                            <button
                                onClick={() => setView('installers')}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    view === 'installers' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Installers
                            </button>

                            <button
                                onClick={() => setView('requests')}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    view === 'requests' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Requests
                            </button>

                            <button
                                onClick={() => setView('assignToInstaller')}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    view === 'assignToInstaller' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Assign
                            </button>
                        </nav>
                    </div>

                    {/* Right Side: Logout Action */}
                    <button
                        onClick={handleLogout}
                        className="text-sm font-bold text-red-500 hover:bg-red-50 px-5 py-2 rounded-lg transition-all"
                    >
                        LOGOUT
                    </button>
                </div>
            </header>

            {/* 📊 MAIN CONTENT AREA */}
            <main className="max-w-7xl mx-auto p-8">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[60vh]">
                    
                    {/* View Switching Logic */}
                    {view === "help" && <Help />}

                    {view === "residents" && (
                        <div className="animate-in fade-in duration-500">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Resident Directory</h2>
                            <ResidentsTable data={residents} />
                        </div>
                    )}

                    {view === 'installers' && (
                        <div className="animate-in fade-in duration-500">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Verified Installers</h2>
                            <InstallersTable
                                data={installers}
                                onDelete={handleDelete}
                                onEdit={openEditModel}
                                onAddClick={() => navigate("/installer-register")}
                            />
                        </div>
                    )}

                    {view === "requests" && (
                        <div className="animate-in fade-in duration-500">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Installation Requests</h2>
                                <button onClick={loadData} className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-xl text-xs font-bold transition-all">
                                    Refresh List 🔄
                                </button>
                            </div>
                            <PendingRequests />
                        </div>
                    )}

                    {view === "assignToInstaller" && (
                        <div className="animate-in fade-in duration-500">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Technical Task Assignment</h2>
                            <AssignToInstaller />
                        </div>
                    )}
                </div>
            </main>

            {/* 🛠️ EDIT MODAL (POPUP) */}
            {showModel && selectedInstaller && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-900">Update Installer Details</h3>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">Security Level: Admin</p>
                        </div>
                        
                        <div className="p-8 space-y-5">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Agency Name</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                                    value={selectedInstaller.name || ''}
                                    onChange={(e) => setSelectedInstaller({ ...selectedInstaller, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Official Email</label>
                                <input
                                    type="email"
                                    className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                                    value={selectedInstaller.email || ''}
                                    onChange={(e) => setSelectedInstaller({ ...selectedInstaller, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">License Number</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                                    value={selectedInstaller.licenseNo || ''}
                                    onChange={(e) => setSelectedInstaller({ ...selectedInstaller, licenseNo: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="p-8 pt-4 flex gap-4">
                            <button 
                                onClick={handleUpdate} 
                                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                            >
                                SAVE CHANGES
                            </button>
                            <button 
                                onClick={() => setShowModel(false)} 
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

export default adminDashboard1;