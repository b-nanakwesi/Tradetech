import axios from 'axios'

const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    // timeout: 1000,
    withCredentials: true,
  });
  
  export default Axios; 