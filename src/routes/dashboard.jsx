import { IconButton, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BiCart, BiCartAdd, BiLogOut } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";
import { FaBell, FaStore } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { GiHamburger, GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Outlet, Link, useNavigate, redirect, Navigate } from "react-router";
import axios from "axios";
import { Avatar } from "../components/ui/avatar";
import { MdDashboard, MdHomeFilled, MdProductionQuantityLimits } from "react-icons/md";
import axiosInstance from "./axiosInstance";
import { FcSalesPerformance } from "react-icons/fc";
import { RiStockFill, RiStockLine } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { IoWarningOutline } from "react-icons/io5";
import { ColorModeButton } from "../components/ui/color-mode";
import { useAuth } from "./AuthContext";


const links = 
    [
    {path: "/dashboard/home", name: "Home"},
    {path: "/dashboard/products", name: "Products"},
    {path: "/dashboard/sales", name: "Sales"},
    {path: "/dashboard/shortage", name: "Shortage"}
   ];

const Header = () => {
    return (
        <div className="w-full shadow-lg p-4 bg-gray-200 flex justify-between items-center">
            <GiHamburgerMenu/>
            <h1 className="font-bold   font-open text-gray-900 text-xl">GrandyPOS</h1>
            <FaRegBell/>
        </div>
    )
}

 const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const session = localStorage.getItem("jwt_token")
    const { token } = useAuth();
                       useEffect(()=>{
                        if (!token) return;
                       axiosInstance.get("/core/user/me/")
                       .then((response)=> {
                           setUser(response.data);
                       }
                       );
  },[])
  const handleLogout = (token) => {
    localStorage.removeItem("jwt_token"); // Clear storage
    setToken(null);                       // Update context
    navigate("/login", { replace: true }); // Redirect
  };

       const owner = user?.user_type === "Owner"
  return (
        <div className="h-dvh bg-gray-50 dark:bg-opacity-10 text-gray-950 dark:text-gray-100 w-full">
            <div className="flex">
            <div className="sm:hidden py-4 w-12 rounded-md mr-1  flex flex-col space-y-4">
                
            <NavLink to="home" className={({ isActive }) =>
                isActive ? "p-3 font-open flex items-center rounded-md text-gray-900 font-semibold bg-custom"
                : "text-gray-800 font-open flex items-center font-normal dark:text-gray-50 px-2 py-2"}>
               <MdHomeFilled className="text-xl"/>
            </NavLink>
            <NavLink to="products" className={({ isActive }) =>
                isActive ? "p-3 font-open flex items-center rounded-md text-gray-900 font-semibold bg-custom"
                : "text-gray-800 font-open flex items-center font-normal dark:text-gray-50 p-2"}>
                  <FaStore className="text-xl"/>
            </NavLink>
            <NavLink to="sales" className={({ isActive }) =>
                isActive ? "p-3 font-open flex items-center rounded-md text-gray-900 font-semibold bg-custom"
                : "text-gray-800 my-1 font-open flex items-center font-normal dark:text-gray-50 px-2 py-2"}>
              <AiOutlineStock className="text-xl"/>
            </NavLink>
            <NavLink to="shortage" className={({ isActive }) =>
                isActive ? "p-3 font-open flex items-center rounded-md text-gray-900 font-semibold bg-custom"
                : "text-gray-800 font-open flex items-center font-normal dark:text-gray-50 p-2"}>
            <IoWarningOutline className="text-xl"/>
            </NavLink>
             
             { owner &&
             <button onClick={()=>navigate("/admin/dashboard/")} className="bg-gray-100 dark:bg-opacity-20   font-open flex items-center rounded-lg mt-6 p-3 sm:text-sm hover:font-semibold mx-2"><MdDashboard className="mr-1"/></button>
 }
             <button onClick={handleLogout} className="bg-gray-100 font-open flex items-center rounded-lg mt-2 p-3 text-red-700 mx-2 hover:font-semibold"><BiLogOut className="mr-1 text-xl"/></button>
            </div>
            <div className="invisible sm:visible sm:w-1/6 w-0 rounded-md mr-1  flex flex-col">
            <div className="bg-inherit px-3 py-3 flex border-b border-gray-100 mb-3">
                        <Avatar />
                        <div className="flex flex-col ml-4">
                            <h1 className=" text-gray-700 dark:text-gray-50   font-open font-bold">{user?.username}</h1>
                            <p className="text-gray-700 dark:text-gray-50 font-light font-open text-sm">{user?.user_type}</p>
                        </div>
                    </div>
            <NavLink to="home" className={({ isActive }) =>
                isActive ? "px-3 py-2 font-open text-sm flex items-center rounded-md mr-2 ml-1 text-gray-900 font-semibold bg-custom"
                : "text-gray-800 font-open text-sm flex items-center my-1 font-normal dark:text-gray-50 px-2 py-2"}>
               <MdHomeFilled className="mr-2"/>  Home
            </NavLink>
            <NavLink to="products" className={({ isActive }) =>
                isActive ? "px-3 py-2 font-open text-sm flex items-center rounded-md mr-2 ml-1 text-gray-900 font-semibold bg-custom"
                : "text-gray-800 font-open text-sm flex items-center my-1 font-normal dark:text-gray-50 px-2 py-2"}>
                  <FaStore className="mr-2"/>  Products
            </NavLink>
            <NavLink to="sales" className={({ isActive }) =>
                isActive ? "px-3 py-2 font-open text-sm flex items-center rounded-md mr-2 ml-1 text-gray-900 font-semibold bg-custom"
                : "text-gray-800 my-1 font-open text-sm flex items-center font-normal dark:text-gray-50 px-2 py-2"}>
              <AiOutlineStock className="mr-2"/> Sales
            </NavLink>
            <NavLink to="shortage" className={({ isActive }) =>
                isActive ? "px-3 py-2 font-open text-sm flex items-center rounded-md mr-2 ml-1 text-gray-900 font-semibold bg-custom"
                : "text-gray-800 font-open text-sm flex items-center my-1 font-normal dark:text-gray-50 px-2 py-2"}>
            <IoWarningOutline className="mr-2"/>  Shortage
            </NavLink>
             
             {owner &&
             <button onClick={()=>navigate("/admin/dashboard/")} className="bg-gray-100 dark:bg-opacity-20   font-open flex items-center rounded-lg mt-6 p-3 sm:text-sm hover:font-semibold mx-2"><MdDashboard className="mr-1"/>Admin panel</button>
 }
             <button onClick={handleLogout} className="bg-gray-100   font-open flex items-center rounded-lg mt-2 p-3  sm:text-sm text-red-700 mx-2 hover:font-semibold"><BiLogOut className="mr-1"/>Log out</button>
            </div>
            <div className="w-5/6 bg-gray-100 dark:bg-black h-dvh overflow-y-auto">
            <Outlet/>
            </div>
           
            </div>
        </div>
    );
 }

 export default Dashboard;