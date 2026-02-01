import {React,useState} from 'react'
import api from '../../api/axiosConfig'; // Hamara axios setup

function ResidentLogin() {
const [loginData,setLoginData] =useState({
    contactId:'',
    password:''
});

const handleChange=(e)=>{
    e.preventDefault();
    setLoginData(
        {
            ...loginData,
            [e.target.name]:e.target.value,
        }
    )
}

const handleLogin=async(e)=>{
    e.preventDefault();
    try{
        const response =await api.post('/residents/login',loginData);
        if(response.status === 200){
            alert("Bhai, Login Successful! Welcome " + response.data.name);
        }
    }catch (error) {
            alert("Login Fail! Contact ID ya Password galat hai.");
            console.error(error);
        }
}
  return (
    <div style={{ padding: '20px', border: '1px solid blue' }}>
            <h3>Resident Login (Real Backend API)</h3>
            <form onSubmit={handleLogin}>
                <input 
                    name="contactId" 
                    placeholder="Contact ID" 
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
                <button type="submit">Resident Login</button>
            </form>
        </div>
  )
}

export default ResidentLogin
