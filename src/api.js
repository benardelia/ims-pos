import axios from "axios";

const API = axios.create({
    baseURL: "http://154.118.227.229:1967",
});

export const fetchProducts = async () => {
    try {
        const response = await API.get("/store/products/");
        return response.data;
    } catch (error){
        console.error("error fetching data:", error);
        throw error;
    };
}

export default API;