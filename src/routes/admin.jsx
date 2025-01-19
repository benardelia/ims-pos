import { NavLink, Outlet } from "react-router"
import { Avatar } from "../components/ui/avatar";

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
        <div className="min-h-dvh flex bg-white rounded-r-lg  flex-col w-1/5">
        <div className="bg-inherit px-3 py-3 flex border-b border-gray-100 mb-3">
            <Avatar name="Nassir Masuke"/>
            <div className="flex flex-col ml-4">
                <h1 className=" text-gray-700 font-bold">Nassir Masuke</h1>
                <p className="text-gray-700 font-light text-sm">shope admin</p>
            </div>
        </div>
         {links.map(link =>
    <NavLink key={link.name} to={link.path} className={({ isActive }) =>
      isActive ? "px-2 py-2 shadow-gray-300  font-semibold bg-blue-300 rounded-md mr-1"
        : "text-gray-800 font-normal dark:text-gray-200 px-2 py-2"}>
                    {link.name}
                    </NavLink>)
                     }
        </div>
        <Outlet/>
        </div>
    </div>
    )
  }
  export default Admin