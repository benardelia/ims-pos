import { IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { BiCart, BiCartAdd, BiLogOut } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { GiHamburger, GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Outlet, Link, useNavigate, redirect } from "react-router";


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
            <h1 className="font-bold font-open text-gray-900 text-xl">GrandyPOS</h1>
            <FaRegBell/>
        </div>
    )
}

 const Dashboard = () => {
    const navigate = useNavigate();
       const token = localStorage.getItem('jwt_token');

       const handleLogout = ()=> {
        localStorage.removeItem("jwt_token");
        navigate("/");
       }
  return (
        <div className="h-svh bg-gray-50 dark:bg-gray-400 text-gray-950 dark:text-gray-100 w-full">
            <Header/>
            <div className="flex">
            <div className="w-1/6 rounded-md mr-1 bg-gray-50 dark:bg-gray-200 flex flex-col">
            {links.map(link =>
            <NavLink key={link.name} to={link.path} className={({ isActive }) =>
                isActive ? "px-3 py-1 mt-2 font-open rounded-full text-gray-900 font-semibold bg-lime-300"
                : "text-gray-800 font-open font-normal dark:text-gray-700 px-2 py-2"}>
            {link.name}
            </NavLink>)
             }
             <button onClick={handleLogout} className="bg-white font-open flex items-center rounded-lg absolute bottom-2 p-3 md:text-lg sm:text-sm text-red-600 hover:font-semibold"><BiLogOut className="mr-1"/>Log out</button>
            </div>
            <div className="w-5/6 rounded-lg bg-gray-100 h-dvh overflow-y-auto">
            <Outlet/>
            </div>
           
            </div>
        </div>
    );
 }

 export default Dashboard;