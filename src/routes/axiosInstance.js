import axios from "axios";
     
                 const axiosInstance = axios.create({
                             baseURL: "http://192.168.132.111:8000",
                                 timeout: 9000,
                             })
                             

                            
                             axiosInstance.interceptors.request.use(
                                (config)=> {
                                    const token = localStorage.getItem("jwt_token");

                                    config.headers["Content-Type"] = "application/json";
                                    if (token) {
                                        config.headers["Authorization"] = `Bearer ${token}` ;
                                    }
                                    return config;
                                },
                                (error) => Promise.reject(error)
                             );

  export default axiosInstance;