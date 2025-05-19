import axios from "axios";

const session = localStorage.getItem("jwt_token");
                 const axiosInstance = axios.create({
                             baseURL: "https://grandypos.duckdns.org",
                                 timeout: 9000,
                                 headers: {
                                     Authorization : `Bearer ${session}`,
                                     "Content-Type": "application/json"
                                 }
                             })

  export default axiosInstance