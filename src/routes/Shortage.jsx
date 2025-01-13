import { useState, useEffect } from "react";
import axios from "axios";

const Shortage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const session = localStorage.getItem("jwt_token");

    const axiosInstance = axios.create({
        baseURL: "http://154.118.227.229:1967",
        timeout: 9000,
        headers: {
            Authorization : `Bearer ${session}`,
        }
    }) 
    useEffect(()=> {
        axiosInstance.get("/store/products/")
        .then((response)=> {
            setProducts(response.data);
            setLoading(false);
        }
        );
            

    })


    return (
        <div className="">
        <h className="text-xl font-bold">Stock shortage.</h>
        <ul>
            {
                products.map((product)=> <li>{product.name}</li>)
            }
        </ul>
        </div>
    );
}

export default Shortage