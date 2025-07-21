import { Button, Skeleton } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { MdFilterAlt, MdFilterList, MdOutlineInventory } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { IoFilter, IoWarning } from "react-icons/io5";
import axiosInstance from "./axiosInstance";
import Chort from "./Chort";
import { Avatar } from "../components/ui/avatar";
import logo from "./asset/pas.jpg"
import back from "./asset/logo.png"
import { Menu } from "@chakra-ui/react";
import { BsFilterSquareFill, BsThreeDotsVertical } from "react-icons/bs";
import { Portal } from "@chakra-ui/react";
import { BiFilterAlt } from "react-icons/bi";
import { HiFilter } from "react-icons/hi";
import { useNavigate } from "react-router";


const Boxy2 = ({ box, isLoading, icon }) => {
    return (
        <div  className="font-roboto hover:slashed-zero bg-white relative h-full rounded-xl p-4 shadow flex flex-col justify-center place-items-center w-full  dark:bg-opacity-10">
            { isLoading? <Skeleton h="2.5rem" w="3rem" my="1rem"/>:
            <p className="font-semibold text-2xl   font-font-roboto my-4">{box.main}</p>
}
<div className="size-10 hover:size-12 rounded-full absolute -top-6 flex place-items-center justify-center dark:bg-opacity-10 bg-white hover:drop-shadow-sm dark:shadow-gray-100 shadow-md">
  {icon}
</div>
    <p className="text-xs font-roboto">{box.detail}</p>
        </div>
    );
}


const Dash = () => {
    const [products,setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [shortage, setShortage] = useState([])
    const [user, setUser] = useState(null)
    const [dash, setDash] = useState(null);
    const [category, setCategory] = useState(null)
    const [customers, setCustomers] = useState(null)
    const [filter, setFilter] = useState(365)
       useEffect(()=> {
           axiosInstance.get("/store/products/?stock=1")
           .then((response)=> {
               setProducts(response.data.results);
               setLoading(false);
           }
           ).catch(
            error=> {
                console.error(error.message)
            }
           )
           axiosInstance.get("/store/products/?shortage=0")
           .then((response)=> {
               setShortage(response.data.results);
           }
           );
           axiosInstance.get("/core/user/me")
           .then((response)=> {
               setUser(response.data);
               setLoading(false);
           }
           ).catch(
            error=> {
                console.error(error.message)
            }
           )
           axiosInstance.get(`/store/dashboard/?group_by=${filter}`)
           .then(res=> {
            setDash(res.data);
           });
           axiosInstance.get("/store/customers/")
           .then(
            res=> {
                setCustomers(res.data.results)
            }
           )
       },[filter])
    const navigate = useNavigate()
    return (
        <div className="flex w-full relative  font-font-roboto h-svh">
           
        <div className=" w-3/4 px-3">
         
        <div className="h-1/3 mb-16">
        <div className="dark:bg-gray-800 relative w-full h-2/3 mb-8 rounded-xl">
            <img src={back} className="w-full h-full rounded-xl"/>
            <div className="absolute bg-gradient-to-r from-black to-transparent z-50 left-0 top-0 w-full h-full">
                <h1 className="text-gray-50 pt-6 px-6 font-roboto font-semibold">Hi {user?.username}, thank you for choosing GrandyPOS Premium. You can freely give us suggestion or recommendations about our service.</h1>
                <button className="text-gray-950 text-sm rounded-md m-4 py-2 px-4 bg-[#f7d518] dark:bg-opacity-30 font-semibold">Send Now</button>
                </div>
        </div>
            <div className=" relative grid h-24 grid-flow-col gap-8 w-full">
                <Boxy2 isLoading={loading} box={{
                    main: dash?.total_sales?.toLocaleString(),
                    color: "green-600",
                    detail: "total sales",
                    link: "sale report",
                    path: "/admin/reports"
                }}
                icon={<FcSalesPerformance className="text-xl"/>}
                />
                <Boxy2 isLoading={loading} box={{
                    main: dash?.total_products ,
                    detail: "total products",
                }}
                icon={<MdOutlineInventory className="text-xl"/>}
                />
                <Boxy2 isLoading={loading} box={{
                    main: dash?.shortage_products,
                    detail: "products shortage",
                    link: "shortage",
                    path: "/admin/inventory"
                }}
                icon={<IoWarning className="text-red-600 text-xl"/>}
                />
            </div>
            </div>
            <div className="h-1/2">
            <Menu.Root className="absolute top-0 left-2/3">
                        <Menu.Trigger>
                            <Button className="dark:text-gray-100 text-sm" > 
                               <MdFilterAlt/>
                            </Button>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner alignContent="end">
                                <Menu.Content>
                                    <Menu.Item onClick={()=>setFilter("month")}>
                                     month
                                    </Menu.Item>
                                    <Menu.Item onClick={()=>setFilter("week")}> 
                                        weekly
                                    </Menu.Item>
                                    <Menu.Item onClick={()=>setFilter("day")}>
                                        day
                                    </Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                       </Menu.Root>
               <Chort details={dash?.sales_summary?.map(item => ({
                sales: item.total_sales,
                time: item?.period.slice(0,10)
              }))} />
              </div>
            </div>
            <div className="w-1/4 px-2">
            <div className="flex flex-col space-y-6 mx-4 bg-white dark:bg-opacity-10 place-items-center justify-center rounded-xl shadow p-12">
                <Avatar src={user?.image} className=" sm:size-20 size-16 outline-2 outline outline-green-700 outline-offset-4 shadow-sm"/>
                <div className="flex flex-col place-items-center justify-center">
                <h1 className="font-roboto  font-semibold">{user?.username}</h1>
                <p className="text-xs font-roboto dark:text-gray-400 text-gray-600">{user?.email}</p>
                </div>
            </div>
            <div className="w-full my-8">
                <h1 className="  font-font-roboto font-semibold">Customers {customers?.count}</h1>
                {customers?.map(cus=>
                <div onClick={()=>navigate(`/admin/view/${cus.uuid}`)} className="p-2 my-2 bg-white dark:bg-opacity-10 flex rounded-xl">
                    <Avatar size="sm" src={`grandypos.duckkdns.org${cus.image}`}  name={cus.first_name}/>
                    <div className="flex mx-4 flex-col">
                    <p className="  font-font-roboto font-semibold text-sm">{cus.first_name} {cus.last_name}</p>
                    <p className="text-xs   font-font-roboto dark:text-gray-400 text-gray-700">{cus.phone}</p>
                    </div> 
                </div>)
}
            </div>
            </div>
        </div>
    );
}


export default Dash;