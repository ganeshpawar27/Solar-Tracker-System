import {React,useState} from 'react'
import api from '../../api/axiosConfig'; // Hamara axios setup

function InstallerLogin() {
    const[loginData,setLoginData]=useState({
        contactId :'',
        password : ''
    })

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
            if (response.status===200) {
                alert("installer LoggIn Successful")
                
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
   </>
  )
}

export default InstallerLogin
