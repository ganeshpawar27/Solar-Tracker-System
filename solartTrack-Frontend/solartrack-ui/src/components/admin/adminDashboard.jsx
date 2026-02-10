import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axiosConfig';



function adminDashboard1() {
    const [view , setView]=useState('residents')
    const[residents,setResidents]=useState([])
    const [installers,setInstallers]=useState([])
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
        setResidents(resData.data);
        setInstallers(instData.data)
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
            loadData(); // Table refresh
        }catch(e){
            console.error(e);
        }
    }
 
  return (
    <div>
    <div>
      <div>
         <button onClick={()=>setView('residents') }>show Residets  ({residents.length})</button>
        <button onClick={()=>setView('installers') }>show Installers  ({installers.length})</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    <div>
        

         {/* Residents Table */}
         {view==="residents" && (
             <table>
            <thead>
                <tr>
                    <th>Contact Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>aadhaar</th>
                </tr>
            </thead>
            <tbody>
            {residents.map((i)=>(
                <tr key={i.contactId}>
                    <td>{i.contactId}</td>
                    <td>{i.name}</td>
                    <td>{i.email}</td>
                    <td>{i.aadhaar}</td>
                </tr>
            ))}
            </tbody>
         </table>)
    }
    </div>
        
            {/* installers Table */}
            {view ==='installers' && (
                
                <div>
                    <button onClick={()=>navigate("/installer-register")} >Add Instaler</button>
                
                
                <table>
                    <thead>
                    <tr>
                        <th>Contact Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>License No</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {installers.map((i)=>(
                            <tr key={i.contactId}>
                                <td>{i.contactId}</td>
                                    <td>{i.name}</td>
                                    <td>{i.email}</td>
                                    <td>{i.licenseNo}</td>
                                    <td>
                                        <button onClick={()=>openEditModel(i)}>Edit</button>
                                        <button onClick={()=>handleDelete(i.contactId)}>Delete</button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
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
