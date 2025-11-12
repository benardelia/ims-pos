import axios from "axios";


                           
                 const axiosAuthInstance = axios.create({
                                 baseURL: "http://127.0.0.1:8000",
                                 timeout: 9000,
                                 headers: {
                                     "Content-Type": "application/json"
                                 }
                             })

  export default axiosAuthInstance;