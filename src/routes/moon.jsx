import Product from "./product";
import { useState, useEffect } from "react";
import { BiCart, BiChevronDown, BiChevronUp, BiTrash } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Skeleton } from "@chakra-ui/react";
import {Button,Dialog,HStack,Portal} from "@chakra-ui/react"
import { toaster, Toaster } from "../components/ui/toaster";
import axiosInstance from "./axiosInstance";
import { PiSpinner } from "react-icons/pi";
import logo from "./asset/logo.png"
import { Tabs, Menu } from "@chakra-ui/react";

  const Moon = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [selling, setSelling] = useState(null);
    const [errorSelling, setErrorSelling] = useState(false);
    const [customer, setCustomer] = useState(null)
    const [customers, setCustomers] = useState()
    const [user,setUser] = useState({})
    const [sold, setSold] = useState(0);
    const [filters, setFilters] = useState("")
    const [url, setUrl] = useState(`/store/products/?stock=1&name=${filters}`);
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null);
    const [reload, setReload] = useState(false)
    const [current, setCurrent] = useState(0)
    const [saleAPI, setSaleAPI ] = useState("/store/sale")


      const token = localStorage.getItem("jwt_token");
        useEffect(()=> {
            axiosInstance.get(url)
            .then((response)=> {
                setProducts(response.data.results);
                console.log(response.data.results)
                setLoading(false);
                    setNext(response.data.next)
                    setPrevious(response.data.previous)
            }
            ).catch(error => {
                setLoading(false)
                const err = error.response.data
                toaster.create({
                    title: err.detail,
                    type: "error",
                    duration: 5000
                  })
            })
            axiosInstance.get("/store/customers/")
            .then(res=>{
                setCustomers(res.data.results);

            }).catch(error => {
                const err = error.response.data
                toaster.create({
                    title: err.detail,
                    type: "error",
                    duration: 5000
                  })
            })
    const interval = setInterval(()=> {
        setCurrent(prev => prev + 1);
      }, 3000);

      return ()=> clearInterval(interval);
    },[url,reload, filters])
        const sale = {
            customer: customer,
            items: cart.map(item => ({
                product: item.uuid,
                quantity: item.quantity
              })),
            payment_method: "Credit Card"
        }
    const onSell = async (e) => {
        e.preventDefault();
        setSelling(true);
        console.log(sale)
        try {
         const res = await axiosInstance.post(saleAPI,
                JSON.stringify(sale));
              setCart([])
              setSelling(false);
              setReload(!reload)
              toaster.create({
                title: "cart sold successfully",
                type: "success",
                duration: 5000
              })
              
            }  catch (error) {
                const err = error.response.data
             console.error(error)
             setSelling(false)
             toaster.create({
                       title: err.status,
                       description: JSON.stringify(err),
                       type: "error",
                       duration: 5000
                     })

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
        p.name.toLowerCase().includes(filters.toLowerCase()));
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * 0.25;
    const grandTotal = total + tax;

    
    return (
        <div className="flex h-dvh relative font-roboto w-full">
            <Toaster/>
            {selling &&
            <div className="flex items-center py-2 px-8 rounded-lg shadow-lg absolute bottom-6 left-4 dark:bg-opacity-20 bg-white">
                <PiSpinner className="animate-spin"/><p className="font-roboto text-sm font-bold px-2">selling...</p></div>
  }
            <div className="sm:w-2/3 z-50 w-full h-dvh">
            <Tabs.Root defaultValue="Sales" size="sm" w="-moz-fit-content" mb="3rem">
                        <Tabs.List>
                            <Tabs.Trigger value="Sales" asChild>
                            <Button onClick={()=>setSaleAPI("store/sale")} className="py-6 w-1/2">make sales</Button>
                          </Tabs.Trigger>
                          <Tabs.Trigger value="orders" asChild>
                           <Button onClick={()=>setSaleAPI("/store/new_order")} className="py-6  w-1/2">create order</Button>
                        </Tabs.Trigger>
                        </Tabs.List>
                        </Tabs.Root>
                <div className="flex justify-center my-6">
                    <input type="text" placeholder="Search Product" value={filters} onChange={(e) => setFilters(e.target.value)}
                        className="font-light mx-auto text-sm px-4 py-3 dark:bg-opacity-10 rounded-lg w-2/3"/>
                </div>
               { loading ? <div className="w-full my-4 grid p-2 md:grid-cols-4 sm:grid-cols-3 gap-2">
                <Skeleton w="100%" h="12rem" rounded="xl"/>
                <Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/>
                <Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/>
                <Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/><Skeleton w="100%" h="12rem" rounded="xl"/>
                     
                 </div>
                     : error ? 
                     <p className="font-roboto text-center text-red-600">
                    Failed to fetch, Check the internet connection.
                    </p> : <p></p> }
                    {previous && <button onClick={onLess} className="flex justify-self-center"><BiChevronUp className="font-bold"/></button>}
           <div className="w-full my-4 grid p-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {    
                    filteredProducts?.map(product =>
                        <Product key={product.uuid}
                        image={product?.images?.[current]?.image}
                            product={product}
                            onAdd={()=> addToCart(product)}
                        />)
                    }
                </div>
               {next && <button onClick={onMore} className="mb-12 font-bold text-sm pb-6 flex-col place-items-center flex justify-self-center">see more<BiChevronDown className="font-bold"/></button>}
            </div>
            <div className="sm:w-1/3 invisible sm:visible w-0 relative h-dvh place-items-center">
            
                <div className="w-full bg-white fex justify-between dark:bg-opacity-10 z-50 my-2 py-3 rounded-lg px-6">
                   <> <h1 className="font-semibold flex items-center">Customers cart
                        <BiCart className=" mx-3" /> </h1>
                    </>
                             <Menu.Root>
            <Menu.Trigger>
                <button className="p-2"> 
                   Select customer
                </button>  
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner alignItems="left">
                    <Menu.Content>
                        {customers?.map(
                            cus=>
                        <Menu.Item onClick={()=>setCustomer(cus.uuid)}>
                            {cus.first_name} {cus.last_name}
                        </Menu.Item>
                        )
                        
                        }
                        
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
           </Menu.Root>
                </div>

                <div className="w-full flex flex-col shadow-sm rounded-md">
                    {cart.map(item => <div key={item.id} className="bg-white dark:bg-opacity-10 shadow-sm items-center m-2 rounded-xl flex p-2">
                        <img src={`grandypos.duckkdns.org${item?.images?.[0]?.image}`} className="rounded-sm size-16"/>
                        <div className=" ml-2 w-full">
                            <div className="flex justify-between">
                                <h className="  font-roboto dark:text-gray-50 text-gray-700 font-bold">{item.name}</h>
                                <button className="text-red-400 dark:text-red-200" onClick={() => removeFromCart(item.uuid)}><FaRegTrashAlt /></button>
                            </div>
                            <p className="  font-roboto text-xs text-gray-500 dark:text-gray-400">Stock: {item.stock}</p>
                            <div className="flex justify-between">
                                <h className="  font-roboto font-semibold text-sm">{item.price.toLocaleString()} Tshs</h>
                                <div className="flex items-center">
                                    <button onClick={() => reduceQuantity(item.uuid)} className="size-5 rounded-full bg-gray-200 flex
    place-items-center text-gray-700 font-black
    justify-center">-</button>
                                    <span className="px-2 text-sm font-semibold    font-roboto">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.uuid, item.quantity)} className="size-5 rounded-full bg-[#f7d518] text-gray-700 flex place-items-center font-black justify-center">+</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                    }
                </div>
                {cart.length > 0 ?
                    <div className="w-full px-2">
                        <div className="bg-white dark:bg-opacity-10 w-full p-4 rounded-lg">
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
              <Button  className="p-2 my-4 dark:text-gray-950 font-bold   font-roboto shadow rounded-lg bg-[#f7d518] w-full"
              >SELL</Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content  className="dark:bg-opacity-30">
                  <Dialog.Header>
                    
                  </Dialog.Header>
                  <Dialog.Body >
                    <p className="  font-roboto flex">
                      You're about to sell  total price <p className=" ml-1 font-bold">{total.toLocaleString()} Tshs</p>
                    </p>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={onSell} className="bg-[#f7d518] text-gray-900 px-6 font-bold">SELL</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
                        <button onClick={() => setCart([])} className="p-2   font-roboto dark:bg-opacity-5 text-gray-700 dark:text-gray-50 mb-4 shadow text-sm rounded-lg
    bg-white w-full">CANCEL CART</button>
                    </div>
                    : <p className="text-center   font-roboto font-bold my-36">The Cart Is Empty.</p>
                }
            
            </div>
           
        </div>
    );
}

export default Moon