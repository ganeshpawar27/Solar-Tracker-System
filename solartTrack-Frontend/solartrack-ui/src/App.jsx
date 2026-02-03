import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ResidentLogin from './components/resident/ResidentLogin';
import ResidentDashboard from './components/resident/ResidentDashboard';
import DashboardLayout from './components/resident/DashboardLayout';
import Profile from './components/resident/Profile';

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

          <Route path="/resident-dashboard" element={<DashboardLayout />}>
              {/* Default page jo /resident-dashboard par dikhegi */}
              <Route index element={<ResidentDashboard />} /> 
              
              {/* Ye path /resident-dashboard/profile ban jayega */}
              <Route path="profile" element={<Profile />} />
              
              {/* Ye path /resident-dashboard/apply ban jayega */}
              {/* <Route path="apply" element={<SolarApplication />} /> */}
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App;