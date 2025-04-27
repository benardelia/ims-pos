import { IconButton, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BiCart, BiCartAdd, BiLogOut } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { GiHamburger, GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Outlet, Link, useNavigate, redirect, Navigate } from "react-router";
import axios from "axios";
import { Avatar } from "../components/ui/avatar";
import { MdDashboard } from "react-icons/md";
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
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({})
    const navigate = useNavigate();

 const session = localStorage.getItem("jwt_token");
                    const axiosInstance = axios.create({
                           baseURL: "http://10.219.31.111:8000",
                           timeout: 9000,
                           headers: {
                               Authorization : `Bearer ${session}`,
                           }
                       })
                       useEffect(()=>{
                       axiosInstance.get("/core/user/me")
                       .then((response)=> {
                           setUser(response.data);
                       }
                       );
  },[])
       const handleLogout = ()=> {
        localStorage.removeItem("jwt_token");
        navigate("/login");
       }
  return (
        <div className="h-svh bg-gray-50 dark:bg-slate-400 text-gray-950 dark:text-gray-100 w-full">
            <div className="flex">
            <div className="w-1/6 rounded-md mr-1 bg-gray-50 dark:bg-slate-600 flex flex-col">
            <div className="bg-inherit px-3 py-3 flex border-b border-gray-100 mb-3">
                        <Avatar name="Nassir Masuke"/>
                        <div className="flex flex-col ml-4">
                            <h1 className=" text-gray-700 dark:text-gray-50 font-open font-bold">Nassir Masuke</h1>
                            <p className="text-gray-700 dark:text-gray-50 font-light font-open text-sm">shop admin</p>
                        </div>
                    </div>
            {links.map(link =>
            <NavLink key={link.name} to={link.path} className={({ isActive }) =>
                isActive ? "px-3 py-2 font-open rounded-md mr-2 ml-1 text-gray-900 font-semibold bg-custom"
                : "text-gray-800 font-open my-1 font-normal dark:text-gray-50 px-2 py-2"}>
            {link.name}
            </NavLink>)
             }
             {user?.username==="admin" &&
             <button onClick={()=>navigate("/admin/dashboard/")} className="bg-gray-100 dark:bg-gray-800 font-open flex items-center rounded-lg mt-6 p-3 sm:text-sm hover:font-semibold mx-2"><MdDashboard className="mr-1"/>Admin panel</button>
             }
             <button onClick={handleLogout} className="bg-gray-100 font-open flex items-center rounded-lg mt-2 p-3  sm:text-sm text-red-700 mx-2 hover:font-semibold"><BiLogOut className="mr-1"/>Log out</button>
            </div>
            <div className="w-5/6 rounded-lg bg-gray-100 dark:bg-slate-700 h-dvh overflow-y-auto">
            {session ?
                <Outlet/> : <Navigate to="/login"/>
            }
            
            </div>
           
            </div>
        </div>
    );
 }

 export default Dashboard;