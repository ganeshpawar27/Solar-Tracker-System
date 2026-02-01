import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ResidentLogin from './components/resident/ResidentLogin';
import ResidentRegister from './components/resident/ResidentRegister';
import InstallerLogin from './components/installer/InstallerLogin';
import InstallerRegister from './components/installer/InstallerRegister';

import './App.css';

function App() {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Solar Tracker System</h1>
      <div>
        <Routes>
          {/* Resident Routes */}
          <Route path="/" element={<ResidentLogin />} />
          <Route path="/register" element={<ResidentRegister />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          {/* Installer Routes */}
          <Route path="/installer" element={<InstallerLogin />} />
          {/* Ise /installer-register kar diya hai taaki clear rahe */}
          <Route path="/installer-register" element={<InstallerRegister />} />
        </Routes>
      </div>
    </>
  )
}

export default App;