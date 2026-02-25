import React, { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
// Ensure the path correctly points to your assets folder
import solarVideo from '../../assets/solar.mp4'; 

function ResidentLogin() {
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
            const response = await api.post('/residents/login', loginData);
            if (response.status === 200) {
                // Saving data for session management
                localStorage.setItem('userId', response.data.contactId);
                localStorage.setItem('userName', response.data.name);
                localStorage.setItem('userEmail', response.data.email);
                localStorage.setItem('userRole', 'RESIDENT');

                alert("Bhai, Login Successful! Welcome " + response.data.name);
                navigate('/resident-dashboard'); 
            }
        } catch (error) {
            alert("Login Fail! Contact ID ya Password galat hai.");
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

            {/* 2. Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-950/70 z-10 backdrop-blur-[2px]"></div>

            {/* 3. Login Card */}
            <div className="relative z-20 w-full max-w-md mx-4">
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-900/80 to-amber-600/80 p-8 text-center border-b border-white/10">
                        <h2 className="text-white text-3xl font-black tracking-tight">Resident Portal</h2>
                        <p className="text-amber-200 text-xs mt-1 font-bold uppercase tracking-widest">
                            Citizen Secure Access
                        </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleLogin} className="p-8 space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
                                Contact ID
                            </label>
                            <input 
                                name="contactId" 
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="Enter your ID"
                                onChange={handleChange} 
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <input 
                                name="password" 
                                type="password" 
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="••••••••"
                                onChange={handleChange} 
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-900/20 transition-all transform active:scale-95 mt-4"
                        >
                            CITIZEN LOGIN
                        </button>
                    </form>

                    {/* Navigation Buttons */}
                    <div className="px-8 pb-8 flex flex-col space-y-4 text-center">
                        <button 
                            onClick={() => navigate('/register')}
                            className="text-amber-400 hover:text-amber-300 text-sm font-bold transition-all"
                        >
                            Don't have an account? Register Here
                        </button>
                        
                        <button 
                            onClick={() => navigate('/')}
                            className="text-gray-400 hover:text-white text-xs font-medium transition-all"
                        >
                            ← Back to Menu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResidentLogin;