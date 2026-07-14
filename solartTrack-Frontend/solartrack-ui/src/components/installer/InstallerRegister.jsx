import React, { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

function InstallerRegister() {
    const [formData, setFormData] = useState({
        contactId: '', // Database column: contact_id
        name: '',
        email: '',
        licenseNo: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Backend endpoint: /api/installers/add
            const response = await api.post('/installers/add', formData);
            if (response.status === 200 || response.status === 201) {
                alert("Installer Registration Successful!");
                // Redirect back to the installers list in the dashboard
                navigate('/admin-dashboard', { state: { activeView: 'installers' } });
            }
        } catch (error) {
            console.error(error);
            alert("Registration failed. Please check the fields.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            {/* Branding Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter">
                    Solar<span className="text-blue-600">Track</span>
                </h1>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-widest mt-1">
                    Agency Onboarding Portal
                </p>
            </div>

            {/* Registration Card */}
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="bg-blue-600 p-6 text-center text-white">
                    <h2 className="text-xl font-bold">Register New Installer</h2>
                    <p className="text-blue-100 text-xs mt-1">Create an official account for an authorized solar agency</p>
                </div>

                <form onSubmit={handleRegister} className="p-8 space-y-5">
                    {/* Contact ID */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Agency Contact ID (Mobile)</label>
                        <input 
                            name="contactId" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                            placeholder="Enter 10-digit mobile"
                            onChange={handleChange} 
                        />
                    </div>

                    {/* Agency Name */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Agency/Installer Name</label>
                        <input 
                            name="name" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                            placeholder="Full legal name"
                            onChange={handleChange} 
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Official Email</label>
                        <input 
                            name="email" 
                            type="email" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                            placeholder="agency@example.com"
                            onChange={handleChange} 
                        />
                    </div>

                    {/* License Number */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Technical License No.</label>
                        <input 
                            name="licenseNo" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white font-mono"
                            placeholder="EX: GOV-SLR-XXXX"
                            onChange={handleChange} 
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Set Access Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                            placeholder="Minimum 6 characters"
                            onChange={handleChange} 
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-col gap-3">
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95"
                        >
                            CREATE AGENCY ACCOUNT
                        </button>
                        <button 
                            type="button"
                            onClick={() => navigate('/admin-dashboard')}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-xl transition-all"
                        >
                            CANCEL & RETURN
                        </button>
                    </div>
                </form>
            </div>
            
            <p className="mt-8 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                Security Protocol: Admin Authorization Required
            </p>
        </div>
    );
}

export default InstallerRegister;