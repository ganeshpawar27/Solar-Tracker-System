import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function DashboardLayout() {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Resident';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div>
            {/* --- HEADER (Hamesha dikhega) --- */}
            <header style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '15px 30px', 
                backgroundColor: '#333', 
                color: 'white' 
            }}>
                <h3>Solar Tracker ☀️</h3>
                <nav>
                    <button onClick={() => navigate('/resident-dashboard')} style={navBtn}>Dashboard</button>
                    <button onClick={() => navigate('/resident-dashboard/profile')} style={navBtn}>My Profile</button>
                    <button onClick={() => navigate('/resident-dashboard/apply')} style={navBtn}>Apply Solar</button>
                    <button onClick={handleLogout} style={{ ...navBtn, backgroundColor: 'red' }}>Logout</button>
                </nav>
            </header>

            {/* --- BODY (Yahan content change hoga) --- */}
            <main style={{ padding: '20px' }}>
                <Outlet /> {/* Saare child routes yahan render honge */}
            </main>
        </div>
    );
}

const navBtn = { margin: '0 10px', padding: '5px 15px', cursor: 'pointer' };

export default DashboardLayout;