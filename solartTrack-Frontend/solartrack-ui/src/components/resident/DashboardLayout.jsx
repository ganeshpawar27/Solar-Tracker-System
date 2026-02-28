import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation(); // Used to highlight the active button
    const userName = localStorage.getItem('userName') || 'Resident';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    // Helper function to check if a route is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* 🏷️ STICKY HEADER (Reference: image_068b40.png) */}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    
                    {/* Left Group: Logo and Nav grouped together */}
                    <div className="flex items-center gap-12">
                        {/* Branding / Logo */}
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/resident-dashboard')}>
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-blue-200 shadow-lg">
                                S
                            </div>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">
                                Solar<span className="text-blue-600">Track</span>
                            </h1>
                        </div>

                        {/* Navigation Pill */}
                        <nav className="flex items-center bg-gray-100 p-1 rounded-xl">
                            <button
                                onClick={() => navigate('/resident-dashboard')}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    isActive('/resident-dashboard') 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Dashboard
                            </button>

                            <button
                                onClick={() => navigate('/resident-dashboard/profile')}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    isActive('/resident-dashboard/profile') 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                My Profile
                            </button>

                            <button
                                onClick={() => navigate('/resident-dashboard/apply')}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    isActive('/resident-dashboard/apply') 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                Apply Solar
                            </button>
                        </nav>
                    </div>

                    {/* Right Side: Identity & Logout */}
                    <div className="flex items-center gap-6">
                    
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
                {/* The Outlet renders your ResidentDashboard, Profile, or Apply components */}
                <div className="animate-in fade-in duration-700">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;