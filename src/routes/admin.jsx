import { Link, Navigate, NavLink, Outlet } from "react-router"
import { Avatar } from "../components/ui/avatar";
import { BiLogOutCircle, BiStoreAlt } from "react-icons/bi";
import { AiFillShop, AiOutlineStock } from "react-icons/ai";
import { RiDashboard2Fill, RiDashboard2Line, RiStockFill } from "react-icons/ri";
import { HiDocumentReport } from "react-icons/hi";
import { MdInventory, MdInventory2, MdManageAccounts, MdProductionQuantityLimits, MdStorage } from "react-icons/md";
import { GrOfflineStorage, GrVirtualStorage } from "react-icons/gr";
import { FaWarehouse } from "react-icons/fa";
import { PiWarehouseBold } from "react-icons/pi";
import { ColorModeButton } from "../components/ui/color-mode";
import './App.css'


  const links = 
    [
    {path: "dashboard", name: "dashboard"},
    {path: "reports", name: "reports"},
    {path: "inventory", name: "inventory"},
    {path: "management", name: "management"}
   ];

  const Admin = () => {
    
    const handleLogout = (token) => {
      localStorage.removeItem("jwt_token"); // Clear storage                       // Update context
      navigate("/login", { replace: true }); // Redirect
    };
        const token = localStorage.getItem("jwt_token")
    return (
        <div className="relative h-dvh">
        <div className="flex bg-gray-100 glass dark:bg-black">
        <div className="h-dvh flex border-r dark:border-r-gray-900 bg-[#fff] dark:bg-opacity-10 flex-col w-1/5">
    <NavLink to="dashboard" className={({ isActive }) =>
      isActive ? "px-2 flex items-center mr-3 ml-2 py-2 shadow-gray-300 text-sm font-roboto dark:text-gray-800 font-semibold bg-[#f7d518] dark:bg-[#f7d518] rounded-lg"
        : "text-gray-800 flex items-center dark:text-gray-200 font-roboto mr-4 text-sm font-normal px-2 py-2"}>
        <RiDashboard2Fill className="mr-2"/> Dashboard
     </NavLink>
     <NavLink to="reports" className={({ isActive }) =>
      isActive ? "px-2 flex items-center mr-3 ml-2 py-2 shadow-gray-300 text-sm font-roboto dark:text-gray-800 font-semibold bg-[#f7d518] dark:bg-[#f7d518] rounded-lg"
        : "text-gray-800 flex items-center dark:text-gray-200 text-sm font-roboto mr-4 font-normal px-2 py-2"}>
       <HiDocumentReport className="mr-2"/> Reports
     </NavLink>
     <NavLink to="inventory" className={({ isActive }) =>
      isActive ? "px-2 mr-3 flex items-center ml-2 text-sm py-2 shadow-gray-300 font-roboto dark:text-gray-800 font-semibold bg-[#f7d518] dark:bg-[#f7d518] rounded-lg"
        : "text-gray-800 flex items-center text-sm dark:text-gray-200 font-roboto mr-4 font-normal px-2 py-2"}>
         <PiWarehouseBold className="mr-2"/> Inventory
     </NavLink>
     <NavLink to="management" className={({ isActive }) =>
      isActive ? "px-2 mr-3 ml-2 text-sm py-2 flex items-center shadow-gray-300 font-roboto dark:text-gray-800 font-semibold bg-[#f7d518] dark:bg-[#f7d518] rounded-lg"
        : "text-gray-800 flex items-center text-sm dark:text-gray-200 font-roboto mr-4 font-normal px-2 py-2"}>
         <MdManageAccounts className="mr-2"/> Management
     </NavLink>
                     <Link to="/dashboard/home" className="p-3 mt-12 font-font-roboto flex items-center text-sm font-semibold bg-gray-50 d dark:bg-opacity-10  mx-2 rounded-lg"><AiFillShop className="mr-1"/> shop panel</Link>
                     <button onClick={handleLogout}  className="p-2 my-3 font-font-roboto flex text-sm items-center font-semibold bg-gray-50 dark:bg-red-100  mx-2 rounded-lg text-red-500 dark:text-red-800"><BiLogOutCircle className="mr-2"/>Log out</button>
        </div>
        <div className="w-4/5">
           {
          token ? <Outlet/> : <Navigate to="/login"/>
        }
        </div>
        
        
        </div>
    </div>
    )
  }
  export default Admin