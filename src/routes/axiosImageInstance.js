import axios from "axios";
     
                 const axiosImageInstance = axios.create({
                        baseURL: "https://advancedstore.duckdns.org", 
                                 timeout: 9000,
                             })
                             
                             axiosImageInstance.interceptors.request.use(
                                (config)=> {
                                    const token = localStorage.getItem("jwt_token");
                                    config.headers["Content-Type"] = "multipart/form-data";
                                    if (token) {
                                        config.headers["Authorization"] = `Bearer ${token}` ;
                                    }
                                    return config;
                                },
                                (error) => Promise.reject(error)
                             );
export default axiosImageInstance;