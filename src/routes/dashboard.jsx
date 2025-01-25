import { IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { BiCart, BiCartAdd, BiLogOut } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";
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
        <div className="w-full py-2 px-4 bg-gray-700 mb-3 flex">
            <h1 className="font-bold text-gray-200 text-lg">Nassy's POS</h1>
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
       if (token === null) {
           return redirect("/");
       }
     
    return (
        <div className="h-svh bg-gray-50 dark:bg-gray-400 text-gray-950 dark:text-gray-100 overflow-y-auto w-full">
            <Header/>
            <div className="flex">
            <div className="w-1/6 rounded-md mr-1 bg-white dark:bg-gray-200 flex flex-col h-dvh">
            {links.map(link =>
            <NavLink key={link.name} to={link.path} className={({ isActive }) =>
                isActive ? "px-2 py-2 shadow-md shadow-gray-300 my-1 rounded-md text-gray-100 font-semibold bg-gray-700 "
                : "text-gray-800 font-normal dark:text-gray-700 px-2 py-2"}>
            {link.name}
            </NavLink>)
             }
             <button onClick={handleLogout} className="bg-slate-50 flex items-center mt-72 mx-6 rounded-lg px-3 text-red-600 hover:font-semibold py-2"><BiLogOut className="mr-1"/>Log out</button>
            </div>
            <div className="w-5/6 rounded-lg">
            <Outlet/>
            </div>
           
            </div>
        </div>
    );
 }

 export default Dashboard;