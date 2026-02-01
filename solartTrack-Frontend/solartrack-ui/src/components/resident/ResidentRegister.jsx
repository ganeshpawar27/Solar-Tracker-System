import {React,useState} from 'react'
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

//navigation after registration register login pe redirect karega

function ResidentRegister() {
    const[formData,setFormData]=useState({
        contactId: '', // Database column: contact_id
        name: '',
        email: '',
        aadhaar: '',
        address: '',
        password: ''
    });
const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Backend endpoint: /api/residents/register
            const response = await api.post('/residents/register', formData);
            if (response.status === 200 || response.status === 201) {
                alert("Bhai, resident Registration Ho Gaya! Ab login kar lo.");
                navigate('/'); // Redirect to Login
            }
        } catch (error) {
            console.error(error);
            alert("Kuch toh gadbad hai! Check fields.");
        }
    };
    
  return (
   <>
   <div style={{ padding: '20px', border: '2px solid green' }}>
            <h2>Resident Registration (Raw Form)</h2>
            <form onSubmit={handleRegister}>
                <label>Name: </label>
                <input name="name" onChange={handleChange} /><br/><br/>

                <label>Email: </label>
                <input name="email" type="email" onChange={handleChange} /><br/><br/>

                <label>Contact ID (Mobile): </label>
                <input name="contactId" onChange={handleChange} /><br/><br/>

                <label>Aadhaar: </label>
                <input name="aadhaar" onChange={handleChange} /><br/><br/>

                <label>Address: </label>
                <textarea name="address" onChange={handleChange} /><br/><br/>

                <label>Password: </label>
                <input name="password" type="password" onChange={handleChange} /><br/><br/>

                <button type="submit">Register Now</button>
            </form>
        </div></>
  )
}

export default ResidentRegister
