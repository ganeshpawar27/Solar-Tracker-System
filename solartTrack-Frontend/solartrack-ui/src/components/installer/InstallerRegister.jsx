import {React,useState} from 'react'
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

function InstallerRegister() {
      const[formData,setFormData]=useState({
        contactId: '', // Database column: contact_id
        name: '',
        email: '',
        licenseNo: '',
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
            const response = await api.post('/installers/add', formData);
            if (response.status === 200 || response.status === 201) {
                alert("Bhai, Insaller Registration Ho Gaya!");
navigate('/admin-dashboard', { state: { activeView: 'installers' } });            }
        } catch (error) {
            console.error(error);
            alert("Kuch toh gadbad hai! Check fields.");
        }
    };
    
  return (
    <>
   <div style={{ padding: '20px', border: '2px solid green' }}>
            <h2>Installer Registration (Raw Form)</h2>
            <form onSubmit={handleRegister}>
                <label>Contact ID (Mobile): </label>
                <input name="contactId" onChange={handleChange} /><br/><br/>
               
                <label>Name: </label>
                <input name="name" onChange={handleChange} /><br/><br/>

                <label>Email: </label>
                <input name="email" type="email" onChange={handleChange} /><br/><br/>


                <label>LicenseNo: </label>
                <input name="licenseNo" onChange={handleChange} /><br/><br/>

                <label>Password: </label>
                <input name="password" type="password" onChange={handleChange} /><br/><br/>

                <button type="submit">Register Now</button>
            </form>
        </div></>
  )
}

export default InstallerRegister
