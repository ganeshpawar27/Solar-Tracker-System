import axios from 'axios';

const api=axios.create({
    //backend working on this url currently
    baseURL:'http://localhost:8080/api',
    headers :{
        'Content-Type': 'application/json'
    }
})  
export default api;