import React, { useState,useEffect } from 'react'
import api from '../../api/axiosConfig';
import InstallerProfile from './InstallerProfile'

function InstallerDashboard() {
    const [view ,setView]=useState([]);
    const[installer,setInstaller]=useState([]);
    const installerId=localStorage.getItem('userId');

    useEffect(()=>{
        const fetchMyData=async()=>{
            try{
                const res = await api.get(`installers/${installerId}`);
                setInstaller(res.data)

            }catch (err) {
            console.error("Data load error!", err);
            setInstaller([]);
        }
        };
        if(installerId) fetchMyData();
    },[installerId])

  return (
   <>
    <div>
      <button onClick={()=>setView("InstallerProfile")}>Profile</button>
    </div>

    <div>
        {view === "InstallerProfile" && (<InstallerProfile/>)}
            
       
    </div>
   </>
  )
}

export default InstallerDashboard
