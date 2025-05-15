import axios from "axios";

const session = localStorage.getItem("jwt_token");
                 const axiosAuthInstance = axios.create({
                             baseURL: "http://82.25.119.147:1966",
                                 timeout: 9000,
                                 headers: {
                                     "Content-Type": "application/json"
                                 }
                             })

  export default axiosAuthInstance;