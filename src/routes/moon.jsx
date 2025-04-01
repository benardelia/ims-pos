import Product from "../components/product";
import { useState, useEffect } from "react";
import { BiCart, BiTrash } from "react-icons/bi";
import { BsTrash3Fill } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { PiMinusCircleFill } from "react-icons/pi";
import { RiAddCircleFill } from "react-icons/ri";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { Toaster } from "@chakra-ui/react";
import { FaSpinner } from "react-icons/fa6";
import {
    Button,
    Dialog,
    HStack,
    Portal,

  } from "@chakra-ui/react"


const supabase = createClient("https://hdvpgcnhocljtpmtlrae.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnBnY25ob2NsanRwbXRscmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNTc0ODMsImV4cCI6MjA1NzgzMzQ4M30.4YvNxHdJ1VKo2oB9qa7AsMGFeAydZf0lx_DR831FF-s");



  const Moon = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [selling, setSelling] = useState(null);
    const [errorSelling, setErrorSelling] = useState(false);

    const session = localStorage.getItem("jwt_token");

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };
    const updateQuantity = (productId, delta) => {
        setCart(cart.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity + 1;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    const reduceQuantity = (productId, delta) => {
        setCart(cart.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity - 1;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    const filteredProducts = products?.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * 0.25;
    const grandTotal = total + tax;


    async function getProducts() {
        const { data, error } = await supabase.from("products").select();
        setProducts(data);
        setLoading(false)
        if (error) {
            setError(true);
           
        }
    }

    const onSubmitSale = async (cartItems) => {
        try {
            setSelling(true);
            const { data: sale, error: saleError } = await supabase
                .from("sales")
                .insert([{ created_at: new Date() }])
                .select("id")
                .single();
    
            if (saleError) {
                throw saleError;
            } else {
                setSelling(false);
                setCart([])
            };
            const saleId = sale.id;
            const salesItems = cart.map((item) => ({
                sale_id: saleId,
                product_id: item.product_id,
                product_name: item.name,
                quantity: item.quantity,
                price: item.price
              }));
    
            const { error: itemsError } = await supabase
                .from("sales_items")
                .insert(salesItems);
    
            if (itemsError) throw itemsError;
    
            console.log("Sale submitted and stock updated successfully!");
            return true;
        } catch (error) {
            console.error("Error submitting sale:", error.message);
            return false;
        }
    };
    
    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className="flex h-dvh font-open w-full">
            <div className="w-2/3 h-dvh">
                <div className="flex justify-center my-6">
                    <input type="text" placeholder="Search Product" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="font-light mx-auto px-2 py-2 rounded-full w-1/2" />
                </div>
               { loading ? <div className="size-12 shadow-xl flex justify-center place-items-center justify-self-center bg-white rounded-md">
                <FaSpinner className="animate-spin"/>
                 </div>
                     : error ? 
                     <p className="font-open text-center text-red-600">
                    Failed to fetch, Check the internet connection.
                    </p> : <p></p> }
           <div className="w-full my-4 grid md:grid-cols-4 sm:grid-cols-3 gap-2">
                    {    
                    filteredProducts?.map(product =>
                        <Product key={product.id}
                            product={product}
                            onAdd={() => addToCart(product)}
                        />)}
                </div>
            </div>
            <div className="w-1/3 relative h-dvh place-items-center">
                <div className="w-full bg-white z-50 mb-2 py-3 rounded-t-lg px-6">
                    <h1 className="font-semibold  flex text-gray-800 items-center">Customers cart
                        <BiCart className="text-black mx-3" /> </h1>
                </div>

                <div className="w-full flex flex-col shadow-sm rounded-md">
                    {cart.map(item => <div key={item.id} className="bg-white items-center m-2 rounded-xl flex p-2">
                        <div className=" ml-2 w-full">
                            <div className="flex justify-between">
                                <h className="font-open text-gray-700 font-bold">{item.name}</h>
                                <button className="text-red-400" onClick={() => removeFromCart(item.id)}><FaRegTrashAlt /></button>
                            </div>
                            <p className="font-open text-xs text-gray-500">Stock: {item.stock}</p>
                            <div className="flex justify-between">
                                <h className="font-open font-semibold text-sm">{item.price} Tshs</h>
                                <div className="flex items-center">
                                    <button onClick={() => reduceQuantity(item.id)} className="size-5 rounded-full bg-gray-200 flex
    place-items-center text-gray-700 font-black
    justify-center">-</button>
                                    <span className="px-2 text-sm font-semibold  font-open">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity)} className="size-5 rounded-full bg-lime-300 text-gray-700 flex
    place-items-center font-black
    justify-center">+</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                    }
                </div>
                {cart.length > 0 ?
                    <div className="w-full px-2">
                        <div className="bg-white w-full p-4 rounded-lg">
                            <div className="flex justify-between">
                                <h className="font-bold">Total</h>
                                <h className="font-bold">{(total).toFixed(2)} Tshs</h>
                            </div>
                        </div>
                        <Dialog.Root
            placement="center"
            motionPreset="slide-in-bottom"
          >
            <Dialog.Trigger asChild>
              <Button  className="p-2 my-4 font-bold font-open shadow rounded-lg bg-lime-300 w-full"
              >SELL</Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    
                  </Dialog.Header>
                  <Dialog.Body>
                    <p className="font-open flex">
                      Do you want to sell cart having total price <p className=" ml-1 font-bold">{total} Tshs</p>
                    </p>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={onSubmitSale} className="bg-custom px-6 font-bold">SELL</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
                        <button onClick={() => setCart([])} className="p-2 font-open text-gray-700 mb-4 shadow text-sm rounded-lg
    bg-white w-full">CANCEL CART</button>
                    </div>
                    : <p className="text-center font-open font-bold my-36">The Cart Is Empty.</p>
                }
            </div>
        </div>
    );
}

export default Moon