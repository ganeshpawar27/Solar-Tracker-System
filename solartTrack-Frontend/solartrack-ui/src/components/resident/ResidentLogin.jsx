import { React, useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom'; // Ye add kiya redirection ke liye

function ResidentLogin() {
    const [loginData, setLoginData] = useState({
        contactId: '',
        password: ''
    });

    const navigate = useNavigate(); // Navigation hook

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/residents/login', loginData);
            if (response.status === 200) {
                // Profile page aur dashboard ke liye data save kar rahe hain
                localStorage.setItem('userId', response.data.contactId); // ID save ki
                localStorage.setItem('userName', response.data.name);    // Name save kiya
                localStorage.setItem('userEmail', response.data.email);  // Email save kiya
                localStorage.setItem('userRole', 'RESIDENT');           // Role set kiya

                alert("Bhai, Login Successful! Welcome " + response.data.name);
                
                // Login ke baad Dashboard par bhejo
                navigate('/resident-dashboard'); 
            }
        } catch (error) {
            alert("Login Fail! Contact ID ya Password galat hai.");
            console.error(error);
        }
    };

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

                <button onClick={()=>navigate('/')}>Back To menu</button>
                <button onClick={()=>navigate('/register')}>dont have account?</button>
        </div>
    );
}

export default ResidentLogin;