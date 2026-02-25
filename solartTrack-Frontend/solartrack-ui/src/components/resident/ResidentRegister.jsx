import React, { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
// Ensure path correctly points to your assets folder
import solarVideo from '../../assets/solar.mp4'; 

function ResidentRegister() {
    const [formData, setFormData] = useState({
        contactId: '', // Database column: contact_id
        name: '',
        email: '',
        aadhaar: '',
        address: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Backend endpoint: /api/residents/register
            const response = await api.post('/residents/register', formData);
            if (response.status === 200 || response.status === 201) {
                alert("Bhai, resident Registration Ho Gaya! Ab login kar lo.");
                navigate('/'); // Redirect to Login
            }
        } catch (error) {
            console.error(error);
            alert("Kuch toh gadbad hai! Check fields.");
        }
    };

    return (
        <div className="relative min-h-screen w-screen overflow-x-hidden flex items-center justify-center py-12 px-4">
            
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

            {/* 2. Deep Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-950/75 z-10 backdrop-blur-[2px]"></div>

            {/* 3. Glassmorphic Registration Card */}
            <div className="relative z-20 w-full max-w-2xl">
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    
                    {/* Header with Resident-Themed Gradient */}
                    <div className="bg-gradient-to-r from-blue-900/80 to-amber-600/80 p-8 text-center border-b border-white/10">
                        <h2 className="text-white text-3xl font-black tracking-tight">Resident Registration</h2>
                        <p className="text-amber-200 text-xs mt-1 font-bold uppercase tracking-widest">
                            New Solar Subsidy Application Profile
                        </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleRegister} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Full Name */}
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Full Name</label>
                            <input 
                                name="name" 
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="As per Aadhaar"
                                onChange={handleChange} 
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Email Address</label>
                            <input 
                                name="email" 
                                type="email" 
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="name@example.com"
                                onChange={handleChange} 
                            />
                        </div>

                        {/* Contact ID */}
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Contact ID (Mobile)</label>
                            <input 
                                name="contactId" 
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="10-digit number"
                                onChange={handleChange} 
                            />
                        </div>

                        {/* Aadhaar */}
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Aadhaar Number</label>
                            <input 
                                name="aadhaar" 
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="12-digit UID"
                                onChange={handleChange} 
                            />
                        </div>

                        {/* Address - Full Width */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Residential Address</label>
                            <textarea 
                                name="address" 
                                rows="3"
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"
                                placeholder="House No, Street, City, Pincode"
                                onChange={handleChange} 
                            />
                        </div>

                        {/* Password - Full Width */}
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Create Password</label>
                            <input 
                                name="password" 
                                type="password" 
                                required
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:bg-white/10 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="Minimum 6 characters"
                                onChange={handleChange} 
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 pt-4">
                            <button 
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-900/20 transition-all transform active:scale-95"
                            >
                                REGISTER NOW
                            </button>
                        </div>
                    </form>

                    {/* Navigation Buttons */}
                    <div className="px-8 pb-8 text-center flex flex-col space-y-3">
                        <button 
                            onClick={() => navigate('/resident')}
                            className="text-amber-400 hover:text-amber-300 text-sm font-bold transition-all"
                        >
                            Already have an account? Login here
                        </button>
                        <button 
                            onClick={() => navigate('/')}
                            className="text-gray-400 hover:text-white text-xs font-medium transition-all"
                        >
                            ← Back to Portal Menu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResidentRegister;