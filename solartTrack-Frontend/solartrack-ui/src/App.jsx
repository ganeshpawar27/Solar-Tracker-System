import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/adminDashboard';
import ResidentLogin from './components/resident/ResidentLogin';
import ResidentDashboard from './components/resident/ResidentDashboard';
import DashboardLayout from './components/resident/DashboardLayout';
import Profile from './components/resident/Profile';
import SolarApplication from './components/resident/SolarApplication';


import ResidentRegister from './components/resident/ResidentRegister';
import InstallerLogin from './components/installer/InstallerLogin';
import InstallerRegister from './components/installer/InstallerRegister';
import InstallerDashboard from './components/installer/InstallerDashboard';
import './App.css';
import EntryPage from './components/EntryPage';

function App() {
  return (
    <>
          <div>
        <Routes>
          {/* Resident Routes */}
          <Route path="/" element={<EntryPage />} />
          <Route path="/resident" element={<ResidentLogin />} />
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
              <Route path="apply" element={<SolarApplication />} />

          </Route>
            <Route path="/installer-dashboard" element={<InstallerDashboard/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;