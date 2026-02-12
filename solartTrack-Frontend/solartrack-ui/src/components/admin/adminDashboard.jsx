import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axiosConfig';
import ResidentsTable from './ResidentsTable';
import InstallersTable from './InstallersTable';
import PendingRequests from './PendingRequests';



function adminDashboard1() {
    const [view , setView]=useState('residents')
    const[residents,setResidents]=useState([])
    const [installers,setInstallers]=useState([])
     const [requests,setRequests]=useState([])
    const [selectedInstaller,setSelectedInstaller]=useState(null)
    const [showModel,setShowModel]=useState(false)
    const navigate=useNavigate();

    useEffect(()=>{
        loadData();
    },[])

    
    const handleLogout=()=>{
        navigate('/admin');
    }
    //to get the data of resident and installer from database
    const loadData=async()=>{
       try{ const resData=await api.get("/residents/all");
        const instData=await api.get("/installers/all");
        const reqData=await api.get("/requests/all");
        setResidents(resData.data);
        setInstallers(instData.data)
        setRequests(reqData)
    }catch(error){
        console.error(error);
        alert("data not found");
    }
    }

    //for Delete Installer
    const handleDelete=async(id)=>{
        if(window.confirm("really want to delete Installer"))
        try{
            await api.delete(`/installers/delete/${id}`)
            alert("Installer deleted");
            loadData();
            
        }catch(e){
            console.error(e);  
            alert("there is problem while deleting")
            }
    }

    //for updation purpose
    const openEditModel=(installer)=>{
        setSelectedInstaller({...installer})
        setShowModel(true)
    }
    const handleUpdate=async ()=>{
        try{
            await api.put(`/installers/update/${selectedInstaller.contactId}`,selectedInstaller)
             alert("Installer updated successfully! ✅");
            setShowModel(false);
            loadData(); 
        }catch(e){
            console.error(e);
        }
    }
 
  return (
    
    <div>
      <div>
         <button onClick={()=>setView('residents') }>show Residets  ({residents.length})</button>
        <button onClick={()=>setView('installers') }>show Installers  ({installers.length})</button>
        <button onClick={()=>setView('requests')}>Installation Requests {(requests.length)} </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
         
    <div>
        

         {/* Residents Table */}
         {view==="residents" && <ResidentsTable data={residents} />}
        
            {/* installers Table */}
            {view ==='installers' && (
            <InstallersTable 
                data={installers} 
                onDelete={handleDelete} 
                onEdit={openEditModel} 
                onAddClick={() => navigate("/installer-register")}
            />)}

 {/*  Solar Request Table */}
       {view === "requests" && (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Solar Installation Requests</h2>
            <button onClick={loadData} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                Refresh List 🔄
            </button>
        </div>
        <hr />
        
        {/* Humne jo component banaya hai usey yahan render karenge */}
        <PendingRequests />
    </div>
)}
    </div>
      {/* 🛠️ EDIT MODAL (POPUP) */}
            {showModel && selectedInstaller && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'black', padding: '20px', borderRadius: '8px', width: '350px' }}>
                        <h3>Edit Installer Profile</h3>
                        
                        <label>Name:</label><br/>
                        <input 
                            type="text" style={{ width: '100%', marginBottom: '10px' }}
                            value={selectedInstaller.name || ''} 
                            onChange={(e) => setSelectedInstaller({...selectedInstaller, name: e.target.value})} 
                        /><br/>

                        <label>Email:</label><br/>
                        <input 
                            type="email" style={{ width: '100%', marginBottom: '10px' }}
                            value={selectedInstaller.email || ''} 
                            onChange={(e) => setSelectedInstaller({...selectedInstaller, email: e.target.value})} 
                        /><br/>

                        <label>License No:</label><br/>
                        <input 
                            type="text" style={{ width: '100%', marginBottom: '10px' }}
                            value={selectedInstaller.licenseNo || ''} 
                            onChange={(e) => setSelectedInstaller({...selectedInstaller, licenseNo: e.target.value})} 
                        /><br/>

                        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                            <button onClick={handleUpdate} style={{ background: 'green', color: 'white', padding: '5px 15px' }}>Save</button>
                            <button onClick={() => setShowModel(false)} style={{ background: 'gray', color: 'white', padding: '5px 15px' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
    </div>

  )
}

export default adminDashboard1
