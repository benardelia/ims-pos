import axios from "axios";

const apiClient = axios.create({
    baseURL: "154.118.227.229:1967",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
}); 
 export default apiClient;