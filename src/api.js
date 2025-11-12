import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});
 const fetchProducts = async () => {
    try {
        const response = await API.get("/store/products/");
        return response.data;
    } catch (error){
        console.error("error fetching data:", error);
        throw error;
    };
}

export default API;