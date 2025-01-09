import Product from "../components/product";
import { useState } from "react"; 
import { BiCart, BiTrash } from "react-icons/bi";
import { BsTrash3Fill } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { PiMinusCircleFill } from "react-icons/pi";
import { RiAddCircleFill } from "react-icons/ri";


const products = [
    {
    id: 1,
    name: "Milk",
    description: "1-liter carton of fresh whole milk.",
    price: 1200,
    qStock: 100,
    },
    {
    id: 2,
    name: "Eggs",
    description: "12-pack of organic eggs.",
    price: 12000,
    qStock: 50,
    },
    {
    id: 3,
    name: "Bread",
    description: "Freshly baked whole grain bread.",
    price: 1000,
    qStock: 75,
    },
    {
    id: 4,
    name: "Butter",
    description: "250g block of unsalted butter.",
    price: 2500,
    qStock: 60,
    },
    {
    id: 5,
    name: "Cheese",
    description: "500g pack of shredded cheddar cheese.",
    price: 4500,
    qStock: 40,
    },
    {
    id: 6,
    name: "Apples",
    description: "1kg of fresh red apples.",
    price: 1000,
    qStock: 80,
    },
    {
    id: 7,
    name: "Bananas",
    description: "1kg of ripe bananas.",
    price: 1200,
    qStock: 90,
    },
    {
    id: 8,
    name: "Potatoes",
    description: "2kg bag of white potatoes.",
    price: 3000,
    qStock: 70,
    },
    {
    id: 9,
    name: "Rice",
    description: "1kg pack of basmati rice.",
    price: 2800,
    qStock: 65,
    },
    {
    id: 10,
    name: "Pasta",
    description: "500g pack of penne pasta.",
    price: 1500,
    qStock: 85,
    },
    {
    id: 11,
    name: "Tomatoes",
    description: "1kg of fresh tomatoes.",
    price: 2400,
    qStock: 50,
    },
    {
    id: 12,
    name: "Onions",
    description: "1kg of yellow onions.",
    price: 1800,
    qStock: 60,
    },
    {
    id: 13,
    name: "Cooking Oil",
    description: "1-liter bottle of vegetable oil.",
    price: 5000,
    qStock: 45,
    },
    {
    id: 14,
    name: "Sugar",
    description: "1kg pack of white sugar.",
    price: 2300,
    qStock: 100,
    },
    {
    id: 15,
    name: "Salt",
    description: "1kg pack of iodized table salt.",
    price: 500,
    qStock: 110,
    },
   ];

const Moon = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
         setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
               return prevCart.map((item) =>
               item.id === product.id ? { ...item, quantity: item.quantity + 1 } :item
               )
            }
            
            return [...prevCart,{ ...product, quantity: 1}];
    });
    };
    const removeProduct = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };
      const [search, setSearch] = useState("");
    return (
        <div className="flex w-full">
        <div className="w-2/3">
        <div className="w-full mb-8">
            <input type="text" placeholder="Search Product" value={search} onChange={(e) => setSearch(e.target.value)} 
                className="font-light mx-3 px-2 border border-slate-700 py-1 rounded-2xl w-1/2"/>
        </div>
        <div className="w-full h-svh grid md:grid-cols-4 sm:grid-cols-3 gap-2 ">
        {products.map(product =>
         <Product  key={product.id}
                   product={product}
                   onAdd={() => addToCart(product)}
              /> )}
              </div>
        </div>
        <div className="w-1/3 relative h-svh place-items-center">
        <div className="w-full bg-gray-300 z-50 mb-2 py-3 sticky top-0 rounded-t-lg px-6">
        <h1 className="font-semibold  flex text-gray-800 items-center">Customers cart 
        <BiCart className="text-black mx-3"/> </h1>
        </div>
       
        <div className="w-full flex flex-col shadow-sm p-2 rounded-md">
                 {cart.length === 0 && <p className="text-gray-100"> cart is empty</p>}
                 {cart.map((item, index) =>
                 <div className="bg-gray-200 pt-2 m-1 h-20 px-2 rounded-lg justify-center">
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
                 <div className="w-full sticky bottom-0 bg-gray-50 text-gray-900 flex flex-col">
                    <div className="flex justify-between w-full bg-inherit mb-8 px-4">
                        <h className="font-semibold text-lg">Total:</h>
                        <h1 className="">345$</h1>
                    </div>
                    <button className="py-2 mx-4 bg-gray-300 mb-2 font-bold text-gray-900 text-lg rounded-xl">SELL</button>
                 </div>
              </div>
         </div>
    );
}

export default Moon