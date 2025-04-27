import { Link, NavLink, Outlet } from "react-router"
import { Avatar } from "../components/ui/avatar";
import { BiLogOutCircle } from "react-icons/bi";
import { AiFillShop } from "react-icons/ai";

  const links = 
    [
    {path: "dashboard", name: "dashboard"},
    {path: "reports", name: "reports"},
    {path: "inventory", name: "inventory"},
    {path: "management", name: "management"}
   ];

  const Admin = () => {
    return (
        <div className="relative min-h-svh">
        <div className="flex">
        <div className="min-h-dvh flex bg-white dark:bg-slate-700 rounded-r-lg  flex-col w-1/5">
        <div className="bg-inherit px-3 py-3 flex border-b border-gray-100 mb-3">
            <Avatar name="Nassir Masuke"/>
            <div className="flex flex-col ml-4">
                <h1 className=" text-gray-700 dark:text-gray-50 font-open font-bold">Nassir Masuke</h1>
                <p className="text-gray-700 dark:text-gray-50 font-light font-open text-sm">shop admin</p>
            </div>
        </div>
         {links.map(link =>
    <NavLink key={link.name} to={link.path} className={({ isActive }) =>
      isActive ? "px-2 mr-3 ml-2 py-2 shadow-gray-300 font-open dark:text-gray-800 font-semibold bg-custom dark:bg-custom rounded-lg"
        : "text-gray-800 dark:text-gray-100 font-open mr-4 font-normal px-2 py-2"}>
                    {link.name}
                    </NavLink>)
                     }
                     <Link to="/dashboard/home" className="p-3 mt-12 font-open flex items-center text-sm font-semibold bg-gray-50 dark:bg-gray-800  mx-2 rounded-lg"><AiFillShop className="mr-1"/> shop panel</Link>
                     <Link to="/login" className="p-2 my-3 font-open flex text-sm items-center font-semibold bg-gray-50 dark:bg-red-100  mx-2 rounded-lg text-red-500 dark:text-red-800"><BiLogOutCircle className="mr-2"/>Log out</Link>
        </div>
        <Outlet/>
        </div>
    </div>
    )
  }
  export default Admin