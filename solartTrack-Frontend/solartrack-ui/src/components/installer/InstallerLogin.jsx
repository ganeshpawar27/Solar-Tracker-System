import {React,useState} from 'react'
import api from '../../api/axiosConfig'; // Hamara axios setup
import { useNavigate } from 'react-router-dom';
function InstallerLogin() {
    const[loginData,setLoginData]=useState({
        contactId :'',
        password : ''
    })

    const navigate=useNavigate()

    const handleChange=(e)=>{
        e.preventDefault();
        setLoginData({
            ...loginData,
            [e.target.name]:e.target.value
        })
    }
    const handleLogin=async (e)=>{
        e.preventDefault();
        try{
            const response=await api.post('/installers/login',loginData);
            localStorage.setItem('installerId',response.data.contactId);
            localStorage.setItem('installerName',response.data.name)
            localStorage.setItem('installerEmail',response.data.email);
            localStorage.setItem('licenseNo',response.data.licenseNo);
            localStorage.setItem('installerRole', 'INSTALLER');           // Role set kiya
            if (response.status===200) {
                alert("installer LoggIn Successful")
                navigate("/installer-dashboard")
                
            }
        }
        catch(error){
            alert("Installer failed to Login");
            console.error(error);
        }
    }

  return (
   <>
    <form onSubmit={handleLogin}>
            <input
            name='contactId'
            placeholder='ContactId'
            onChange={handleChange}      
         />

    <br /><br />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                />
                <br /><br />
                <button type="submit">Insaller Login</button>
                

            </form>
                <button onClick={()=>navigate('/')}>Back To menu</button>
   </>
  )
}

export default InstallerLogin
