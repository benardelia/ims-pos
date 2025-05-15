import axios from "axios";

const session = localStorage.getItem("jwt_token");
                 const axiosInstance = axios.create({
                             baseURL: "http://127.0.0.1:8000",
                                 timeout: 9000,
                                 headers: {
                                     Authorization : `Bearer ${session}`,
                                     "Content-Type": "application/json"
                                 }
                             })

  export default axiosInstance