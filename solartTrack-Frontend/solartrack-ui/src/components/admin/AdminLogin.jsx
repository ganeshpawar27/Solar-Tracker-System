import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const[email,setEmail] =useState("")
    const[password,setPassword] =useState("")
    const navigate=useNavigate();

    const handleLogin=(e)=>{
        e.preventDefault();
        if (email==="admin@gmail.com" && password === "admin") {
            alert("admin logged successfully!")
            navigate('/admin-dashboard')
        }
        else{
            alert("Wrong Credentials")
        }
    };

  return (
   <>
    <div style={{ border: '1px solid black', padding: '20px', margin: '20px' }}>
        <h2>Admin Login </h2>
        <form onSubmit={handleLogin}>
            <input type="email"
                    placeholder='email'
                    onChange={(e)=>setEmail(e.target.value)}/>
            
            <br /><br />
            <input type='password'
                    placeholder='password'
                    onChange={(e)=>setPassword(e.target.value)}/>
            <br /><br />
            <button type='submit'>LogIn</button>
        </form>
    </div>
   </>
  )
}

export default AdminLogin
