import axios from "axios";


                           
                 const axiosAuthInstance = axios.create({
                             baseURL: "https://grandypos.duckdns.org",
                                 timeout: 9000,
                                 headers: {
                                     "Content-Type": "application/json"
                                 }
                             })

  export default axiosAuthInstance;