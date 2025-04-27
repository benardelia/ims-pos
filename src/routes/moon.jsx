import Product from "../components/product";
import { useState, useEffect } from "react";
import { BiCart, BiChevronDown, BiChevronUp, BiTrash } from "react-icons/bi";
import { BsTrash3Fill } from "react-icons/bs";
import { CgAdd } from "react-icons/cg";
import { PiArrowRightThin, PiMinusCircleFill } from "react-icons/pi";
import { RiAddCircleFill } from "react-icons/ri";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { Skeleton, Toaster } from "@chakra-ui/react";
import { FaSpinner } from "react-icons/fa6";
import { IconButton, Pagination } from "@chakra-ui/react"
import {Button,Dialog,HStack,Portal} from "@chakra-ui/react"
import { Link } from "react-router";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"


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
    const [customers, setCustomer] = useState({})
    const [user,setUser] = useState({})
    const [sold, setSold] = useState(0);
    const [url, setUrl] = useState("/store/products/?stock=1");
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null);
    const [reload, setReload] = useState(false);
    
    const session = localStorage.getItem("jwt_token");
  
     const axiosInstance = axios.create({
            baseURL: "http://10.219.31.111:8000",
            timeout: 9000,
            headers: {
                Authorization : `Bearer ${session}`,
            }
        }) 
        useEffect(()=> {
            axiosInstance.get(url)
            .then((response)=> {
                setProducts(response.data.results);
                console.log(response.data.results)
                setLoading(false);
                    setNext(response.data.next)
                    setPrevious(response.data.previous)
            }
            );
            axiosInstance.get("/store/customers/")
            .then(res=>{
                setCustomer(res.data.results);

            })
           
                  
        },[url, reload])
        const sale = {
            customer: "cbe2092a-1dbd-4f9d-8fd6-135a37155800",
            items: cart.map(item => ({
                product: item.uuid,
                quantity: item.quantity
              })),
            payment_method: "Credit Card"
        }
    const onSell = async (e) => {
        e.preventDefault();
        console.log(sale)
        try {
         const res = await axios.post('http://10.219.31.111:8000///store/sale',
                JSON.stringify(sale),
            {
                headers: {
                  Authorization: `Bearer ${session}`,
                  'Content-Type': 'application/json'
                },
              }        
             );
              setCart([])
              setReload(!reload)
              setSold(sale.items.length)
            }  catch (error) {
             console.error(error)
         }
    }
    const onMore = () => {
 (next && setUrl(next))
    }
    const onLess = () => {
 (previous && setUrl(previous))
    }

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.uuid === product.uuid);
        if (existingItem) {
            setCart(cart.map(item =>
                item.uuid === product.uuid
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.uuid !== productId));
    };
    const updateQuantity = (productId, delta) => {
        setCart(cart.map(item => {
            if (item.uuid === productId) {
                const newQuantity = item.quantity + 1;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    const reduceQuantity = (productId, delta) => {
        setCart(cart.map(item => {
            if (item.uuid === productId) {
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

    
    return (
        <div className="flex h-dvh font-open w-full">
            <div className="w-2/3 h-dvh">
                <div className="flex justify-center my-6">
                    <input type="text" placeholder="Search Product" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="font-light mx-auto text-sm px-4 py-3 dark:bg-gray-800 rounded-lg w-2/3"/>
                </div>
               { loading ? <div className="w-full my-4 grid p-2 md:grid-cols-4 sm:grid-cols-3 gap-2">
                <Skeleton w="100%" h="12rem" rounded="xl"/>
                <Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/>
                <Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/>
                <Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/>
                     
                 </div>
                     : error ? 
                     <p className="font-open text-center text-red-600">
                    Failed to fetch, Check the internet connection.
                    </p> : <p></p> }
                    {previous && <button onClick={onLess} className="flex justify-self-center"><BiChevronUp className="font-bold"/></button>}
           <div className="w-full my-4 grid p-2 md:grid-cols-4 sm:grid-cols-3 gap-2">
                    {    
                    filteredProducts?.map(product =>
                        <Product key={product.uuid}
                            product={product}
                            onAdd={() => addToCart(product)}
                        />)}
                </div>
               {next && <button onClick={onMore} className="mb-12 font-bold text-sm pb-6 flex-col place-items-center flex justify-self-center">see more<BiChevronDown className="font-bold"/></button>}
            </div>
            <div className="w-1/3 relative h-dvh place-items-center">
            
                <div className="w-full bg-white z-50 mb-2 py-3 rounded-t-lg px-6">
                    <h1 className="font-semibold  flex text-gray-800 items-center">Customers cart
                        <BiCart className="text-black mx-3" /> </h1>
                </div>

                <div className="w-full flex flex-col shadow-sm rounded-md">
                    {cart.map(item => <div key={item.id} className="bg-white dark:bg-slate-800 items-center m-2 rounded-xl flex p-2">
                        <div className=" ml-2 w-full">
                            <div className="flex justify-between">
                                <h className="font-open dark:text-gray-50 text-gray-700 font-bold">{item.name}</h>
                                <button className="text-red-400 dark:text-red-200" onClick={() => removeFromCart(item.uuid)}><FaRegTrashAlt /></button>
                            </div>
                            <p className="font-open text-xs text-gray-500 dark:text-gray-400">Stock: {item.stock}</p>
                            <div className="flex justify-between">
                                <h className="font-open font-semibold text-sm">{item.price.toLocaleString()} Tshs</h>
                                <div className="flex items-center">
                                    <button onClick={() => reduceQuantity(item.uuid)} className="size-5 rounded-full bg-gray-200 flex
    place-items-center text-gray-700 font-black
    justify-center">-</button>
                                    <span className="px-2 text-sm font-semibold  font-open">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.uuid, item.quantity)} className="size-5 rounded-full bg-lime-300 text-gray-700 flex
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
                        <div className="bg-white dark:bg-slate-800 w-full p-4 rounded-lg">
                            <div className="flex justify-between">
                                <h className="font-bold">Total</h>
                                <h className="font-bold">{(total).toLocaleString()} Tshs</h>
                            </div>
                        </div>
                        <Dialog.Root
            placement="center"
            motionPreset="slide-in-bottom"
           
          >
            <Dialog.Trigger asChild>
              <Button  className="p-2 my-4 dark:text-gray-950 font-bold font-open shadow rounded-lg bg-lime-300 w-full"
              >SELL</Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content  className="dark:bg-slate-700">
                  <Dialog.Header>
                    
                  </Dialog.Header>
                  <Dialog.Body >
                    <p className="font-open flex">
                      You're about to sell  total price <p className=" ml-1 font-bold">{total} Tshs</p>
                    </p>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={onSell} className="bg-custom text-gray-900 px-6 font-bold">SELL</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
                        <button onClick={() => setCart([])} className="p-2 font-open dark:bg-gray-200 text-gray-700 mb-4 shadow text-sm rounded-lg
    bg-white w-full">CANCEL CART</button>
                    </div>
                    : <p className="text-center font-open font-bold my-36">The Cart Is Empty.</p>
                }
            
            </div>
           
        </div>
    );
}

export default Moon