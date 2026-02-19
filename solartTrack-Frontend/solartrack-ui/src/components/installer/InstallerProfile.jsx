import React, { useState } from 'react';
import api from '../../api/axiosConfig';

function InstallerProfile() {
  const [model, setModel] = useState(false);
  
  // Initialize state from localStorage so the UI updates without a reload
  const [installer, setInstaller] = useState({
    name: localStorage.getItem('installerName') || 'Not available',
    email: localStorage.getItem('installerEmail') || 'Not Available',
    contactId: localStorage.getItem('installerId') || 'Not Available',
    license: localStorage.getItem('licenseNo') || 'Not Available',
    role: localStorage.getItem('installerRole') || 'Not Available',
  });

  const [selectedInstaller, setSelectedInstaller] = useState(null);

  const handleEdit = (currentInstaller) => {
    setSelectedInstaller({ ...currentInstaller });
    setModel(true);
  };

  const handleEditSave = async () => {
    try {
      await api.put(`/installers/update/${selectedInstaller.contactId}`, selectedInstaller);
      
      // Update LocalStorage
      localStorage.setItem('installerName', selectedInstaller.name);
      localStorage.setItem('installerEmail', selectedInstaller.email);
      localStorage.setItem('licenseNo', selectedInstaller.license);
      
      // Update local state so UI refreshes automatically
      setInstaller(selectedInstaller);
      
      alert("Profile updated successfully! ✅");
      setModel(false);
    } catch (e) {
      console.error(e);
      alert("A problem occurred while updating the Installer Profile");
    }
  };

  return (
    <>
      <div>
        <button onClick={() => handleEdit(installer)}>Edit</button>
        <div style={{ lineHeight: '2.5', fontSize: '18px' }}>
          <div><strong>Full Name:</strong> <span>{installer.name}</span></div>
          <div><strong>Email Address:</strong> <span>{installer.email}</span></div>
          <div><strong>Contact ID:</strong> <span>{installer.contactId}</span></div>
          <div><strong>License No.</strong> <span>{installer.license}</span></div>
          <div><strong>Account Type:</strong> <span>{installer.role}</span></div>
        </div>
      </div>

      {/* Edit Modal */}
      {model && selectedInstaller && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '300px', color: 'black' }}>
            <h3>Edit Profile</h3>
            
            <label>Name</label>
            <input
              type='text'
              style={{ width: '100%', marginBottom: '10px', display: 'block' }}
              value={selectedInstaller.name}
              onChange={(e) => setSelectedInstaller({ ...selectedInstaller, name: e.target.value })}
            />

            <label>Email</label>
            <input
              type='email'
              style={{ width: '100%', marginBottom: '10px', display: 'block' }}
              value={selectedInstaller.email}
              onChange={(e) => setSelectedInstaller({ ...selectedInstaller, email: e.target.value })}
            />

            <label>License NO.</label>
            <input
              type='text'
              style={{ width: '100%', marginBottom: '10px', display: 'block' }}
              value={selectedInstaller.license}
              onChange={(e) => setSelectedInstaller({ ...selectedInstaller, license: e.target.value })}
            />

            <div style={{ marginTop: '15px' }}>
                <button onClick={handleEditSave} style={{ background: 'green', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                <button onClick={() => setModel(false)} style={{ marginLeft: '10px', padding: '5px 15px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InstallerProfile;