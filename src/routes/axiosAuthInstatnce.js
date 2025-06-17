import axios from "axios";


                           
                 const axiosAuthInstance = axios.create({
                             baseURL: "http://192.168.132.111:8000",
                                 timeout: 9000,
                                 headers: {
                                     "Content-Type": "application/json"
                                 }
                             })

  export default axiosAuthInstance;