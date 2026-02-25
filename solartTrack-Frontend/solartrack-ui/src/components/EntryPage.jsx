import React from 'react'
import {useNavigate } from 'react-router-dom';
function EntryPage() {
    const navigate=useNavigate();

  return (
    <div>
        <button onClick={()=>navigate('admin')}>Admin</button>
        <button onClick={()=>navigate('resident')}>Resident</button>
        <button onClick={()=>navigate('installer')}>Installer</button>

    </div>
  )
}

export default EntryPage
