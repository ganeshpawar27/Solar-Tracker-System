import React from 'react';
import { useNavigate } from 'react-router-dom';
import solarVideo from '../assets/solar.mp4'; // Make sure this path is correct

function EntryPage() {
  const navigate = useNavigate();

  return (
    // Use min-h-screen and flex-col to stack content vertically
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. Video Background - Forced to cover */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={solarVideo} type="video/mp4" />
      </video>

      {/* 2. Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      {/* 3. Main Content Container */}
      <div className="relative z-20 w-full max-w-4xl px-6 text-center">
        <header className="mb-12">
          <h1 className="text-white text-6xl font-black mb-4 tracking-tighter">
            Solar<span className="text-amber-500">Track</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light">
            National Portal for Government Subsidized Solar Installations.
          </p>
        </header>

        {/* 4. Button Grid - This keeps them in a proper row/column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => navigate('/admin')}
            className="flex flex-col items-center justify-center p-8 bg-white/10 border border-white/20 rounded-2xl hover:bg-blue-300 transition-all hover:scale-105"
          >
            <span className="text-white font-bold">Admin Portal</span>
          </button>

          <button 
            onClick={() => navigate('/resident')}
            className="flex flex-col items-center justify-center p-8 bg-white/10 border border-white/20 rounded-2xl hover:bg-yellow-800 transition-all hover:scale-105"
          >
            <span className="text-white font-bold text-lg">Resident Login</span>
          </button>

          <button 
            onClick={() => navigate('/installer')}
            className="flex flex-col items-center justify-center p-8 bg-white/10 border border-white/20 rounded-2xl hover:bg-emerald-800 transition-all hover:scale-105"
          >
            <span className="text-white font-bold">Installer Agency</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryPage