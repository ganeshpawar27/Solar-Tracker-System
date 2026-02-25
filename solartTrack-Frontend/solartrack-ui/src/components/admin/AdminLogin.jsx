import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// The "../../" ensures we go up from components/admin/ to find the assets folder
import solarVideo from '../../assets/solar.mp4'; 

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic based on your initial project requirements
    if (email === "admin@gmail.com" && password === "admin") {
      alert("Admin logged in successfully!");
      navigate('/admin-dashboard');
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center m-0 p-0">
      
      {/* 1. Background Video Layer */}
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

      {/* 2. Deep Blue/Slate Overlay for high contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-950/70 z-10 backdrop-blur-[2px]"></div>

      {/* 3. Glassmorphic Login Card */}
      <div className="relative z-20 w-full max-w-md mx-4">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          
          {/* Header with Sunset Gradient to match Solar Panels */}
          <div className="bg-gradient-to-r from-blue-900/80 to-amber-600/80 p-8 text-center border-b border-white/10">
            <h2 className="text-white text-3xl font-black tracking-tight">Admin Portal</h2>
            <p className="text-amber-200 text-xs mt-1 font-bold uppercase tracking-widest">
              Secure Government Access
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            <div>
              <label className="block text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
                Government Email
              </label>
              <input 
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="admin@gov.in"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
                Security Password
              </label>
              <input 
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button using Solar Gold Gradient */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-900/20 transition-all transform active:scale-95 mt-4"
            >
              LOG IN TO DASHBOARD
            </button>
          </form>

          {/* Navigation Link */}
          <div className="px-8 pb-8 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span>←</span> Return to Main Menu
            </button>
          </div>
        </div>
        
        {/* Verification Tag */}
        <p className="text-center mt-6 text-gray-500 text-[10px] uppercase tracking-[0.2em]">
          End-to-End Encrypted Portal
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;