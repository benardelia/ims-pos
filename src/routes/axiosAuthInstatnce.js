import axios from "axios";

const session = localStorage.getItem("jwt_token");
                 const axiosAuthInstance = axios.create({
                             baseURL: "/api",
                                 timeout: 9000,
                                 headers: {
                                     "Content-Type": "application/json"
                                 }
                             })

  export default axiosAuthInstance;