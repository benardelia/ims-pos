import Product from "../components/product";
import { useState, useEffect } from "react"; 
import { BiCart, BiTrash } from "react-icons/bi";
import { BsTrash3Fill } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { PiMinusCircleFill } from "react-icons/pi";
import { RiAddCircleFill } from "react-icons/ri";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

const Moon = () => {
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const session = localStorage.getItem("jwt_token");

    const addToCart = (product) => {
         setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct){
                return prevCart.map((item) => item.id=== product.id ?
            {...item, quantity:item.quantity + 1} : item
            ) ;
            }
       return [...prevCart, product];
       console.log(product);
    });
    };
    const removeProduct = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };
     
  
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
      },[])  
            
          const searchable = products.filter((text)=> text.name === search);

    return (
        <div className="flex w-full">
        <div className="w-2/3 h-dvh">
        <div className="w-full mb-8">
            <input type="text" placeholder="Search Product" value={search} onChange={(e) => setSearch(e.target.value)} 
                className="font-light mx-auto px-2 border border-slate-700 py-1 rounded-2xl w-1/2"/>
        </div>
        <div className="w-full  grid md:grid-cols-4 sm:grid-cols-3 gap-2">
        {loading ? <Spinner size="lg"/> : products.map(product =>
         <Product  key={product.id}
                   product={product}
                   onAdd={()=> addToCart(product)}
              /> )}
              </div>
        </div>
        <div className="w-1/3 relative h-svh place-items-center">
        <div className="w-full bg-gray-300 z-50 mb-2 py-3 sticky top-0 rounded-t-lg px-6">
        <h1 className="font-semibold  flex text-gray-800 items-center">Customers cart 
        <BiCart className="text-black mx-3"/> </h1>
        </div>
       
        <div className="w-full flex flex-col shadow-sm p-2 rounded-md">
                 {cart.length === 0 && <p className="text-gray-*00"> cart is empty</p>}
                 {cart.map((item, index) =>
                 <div className="bg-gray-200 dark:bg-gray-900 dark:text-gray-300 pt-2 m-1 h-20 px-2 rounded-lg justify-center">
                    <div className="flex justify-between">
                    <h className="font-semibold">{item.name}</h>
                    <h className="font-semibold mx-3">{item.price}/-</h>
                    </div>
                    <p className="font-semilight text-xs">{item.description}</p>
                    <div className="flex justify-between items-center">
                    <div className="flex">
                        <button className="rounded-full size-6 place-items-center text-xl"><PiMinusCircleFill/></button>
                        <p className="font-semibold">1</p>
                        <button className="rounded-full size-6 place-items-center text-xl"><RiAddCircleFill/></button> 
                    </div>
                       <button onClick={()=> removeProduct(item.id)} className="text-red-500"><BiTrash/></button>
                    </div>
                    </div>)}
                    
                 </div>
                 <div className="w-full sticky bottom-0 dark:text-gray-100 bg-gray-50 dark:bg-slate-900 text-gray-900 flex flex-col">
                    <div className="flex justify-between w-full bg-inherit mb-8 px-4">
                        <h1 className="font-semibold text-lg">Total:</h1>
                        <h1 className="">345$</h1>
                    </div>
                    <button className="py-2 mx-4 bg-gray-300 mb-2 font-bold text-gray-900 text-lg rounded-xl">SELL</button>
                 </div>
              </div>
         </div>
    );
}

export default Moon