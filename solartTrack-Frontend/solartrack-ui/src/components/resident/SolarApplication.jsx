import React, { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/project grid non grid.jpg'

function SolarApplication() { 
    const [formData, setFormData] = useState({
        capacitykw: '', 
        systemType: 'On-Grid'
    });

    const navigate = useNavigate();
    const residentId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                capacitykw: parseFloat(formData.capacitykw),
                systemType: formData.systemType,
                status: "Pending",
                request_date: new Date().toISOString().split('T')[0],
                resident: { contactId: parseInt(residentId) }
            };

            await api.post("/requests/apply", payload);
            alert("Bhai, Application Submit Ho Gayi! ☀️");
            navigate('/resident-dashboard');
            
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Application fail ho gayi! Backend check karo.");
        }
    };

    return (
        <div className="max-w-xl mx-auto animate-in fade-in zoom-in duration-500 py-10">
            {/* 🏷️ PAGE HEADER */}
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Apply for Solar Installation</h2>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-widest mt-2">
                    Government Subsidy Program Profile
                </p>
            </div>

            {/* 📋 APPLICATION FORM CARD */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="bg-emerald-600 p-6 text-center text-white">
                    <h3 className="text-lg font-bold">New Subsidy Request</h3>
                    <p className="text-emerald-100 text-xs mt-1">Fill in your technical requirements below</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
                    {/* Capacity Field */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span>⚡</span> Required Capacity (KW)
                        </label>
                        <input 
                            type="number" 
                            step="0.1"
                            required 
                            placeholder="e.g. 3.5"
                            value={formData.capacitykw}
                            onChange={(e) => setFormData({...formData, capacitykw: e.target.value})}
                            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50 font-bold text-gray-700"
                        />
                        <p className="text-[10px] text-gray-400 mt-2 ml-2 italic">Note: Residential systems typically range from 1kW to 10kW.</p>
                    </div>

                    {/* System Type Field */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span>🏠</span> System Configuration
                        </label>
                        <div className="relative">
                            <select
                                value={formData.systemType}
                                onChange={(e) => setFormData({...formData, systemType: e.target.value})}
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50 transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
                            >
                                <option value="On-Grid">On-Grid (Connected to Utility)</option>
                                <option value="Off-Grid">Off-Grid (Independent Battery)</option>
                                <option value="Hybrid">Hybrid (Grid + Battery)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                <span>▼</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex flex-col gap-4">
                        <button 
                            type="submit" 
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-100 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            SUBMIT APPLICATION ☀️
                        </button>
                        <button 
                            type="button"
                            onClick={() => navigate('/resident-dashboard')}
                            className="w-full py-3 text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-widest transition-all"
                        >
                            Cancel and Return
                        </button>
                    </div>
                </form>
            </div>

            {/* Visual Guide Placeholder */}
            {/* Visual Guide */}
<div className="mt-12 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <h4 className="text-center text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
        System Type Comparison Guide
    </h4>
    <img 
        src={image} 
        alt="Solar System Comparison" 
        // className="w-full h-auto rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
    />
</div>


           
        </div>
    );
}

export default SolarApplication;