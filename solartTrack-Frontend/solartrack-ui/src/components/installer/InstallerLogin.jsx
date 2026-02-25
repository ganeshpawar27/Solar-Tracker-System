import React, { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
// Ensure the path correctly points to your assets folder
import solarVideo from '../../assets/solar.mp4'; 

function InstallerLogin() {
    const [loginData, setLoginData] = useState({
        contactId: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/installers/login', loginData);
            if (response.status === 200) {
                // Technical data storage for Agency session
                localStorage.setItem('installerId', response.data.contactId);
                localStorage.setItem('installerName', response.data.name);
                localStorage.setItem('installerEmail', response.data.email);
                localStorage.setItem('licenseNo', response.data.licenseNo);
                localStorage.setItem('installerRole', 'INSTALLER');

                alert("Installer Login Successful! Welcome " + response.data.name);
                navigate("/installer-dashboard");
            }
        } catch (error) {
            alert("Installer failed to Login. Please check Contact ID or Password.");
            console.error(error);
        }
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center m-0 p-0">
            
            {/* 1. Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={solarVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* 2. Professional Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-950/75 z-10 backdrop-blur-[2px]"></div>

            {/* 3. Glassmorphic Login Card */}
            <div className="relative z-20 w-full max-w-md mx-4">
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    
                    {/* Header with Agency-Themed Gradient */}
                    <div className="bg-gradient-to-r from-slate-900/80 to-emerald-800/80 p-8 text-center border-b border-white/10">
                        <h2 className="text-white text-3xl font-black tracking-tight">Agency Portal</h2>
                        <p className="text-emerald-400 text-xs mt-1 font-bold uppercase tracking-widest">
                            Authorized Installer Access
                        </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleLogin} className="p-8 space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">
                                Agency Contact ID
                            </label>
                            <input 
                                name="contactId" 
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                placeholder="Enter Agency ID"
                                onChange={handleChange} 
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <input 
                                name="password" 
                                type="password" 
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                placeholder="••••••••"
                                onChange={handleChange} 
                            />
                        </div>

                        {/* Button using technical Emerald/Slate colors */}
                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all transform active:scale-95 mt-4"
                        >
                            INSTALLER LOGIN
                        </button>
                    </form>

                    {/* Navigation Buttons */}
                    <div className="px-8 pb-8 text-center">
                        <button 
                            onClick={() => navigate('/')}
                            className="text-gray-400 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2 mx-auto"
                        >
                            <span>←</span> Back to Main Menu
                        </button>
                    </div>
                </div>
                
                <p className="text-center mt-6 text-gray-500 text-[10px] uppercase tracking-[0.2em]">
                    Department of Renewable Energy | Verification Required
                </p>
            </div>
        </div>
    );
}

export default InstallerLogin;