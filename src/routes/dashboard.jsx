import { IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { BiCart, BiCartAdd } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";
import { NavLink, Outlet, Link } from "react-router";

const products = [
    {
    id: 1,
    name: "Milk",
    description: "1-liter carton of fresh whole milk.",
    price: 1.50,
    qStock: 100,
    },
    {
    id: 2,
    name: "Eggs",
    description: "12-pack of organic eggs.",
    price: 3.25,
    qStock: 50,
    },
    {
    id: 3,
    name: "Bread",
    description: "Freshly baked whole grain bread.",
    price: 2.00,
    qStock: 75,
    },
    {
    id: 4,
    name: "Butter",
    description: "250g block of unsalted butter.",
    price: 2.50,
    qStock: 60,
    },
    {
    id: 5,
    name: "Cheese",
    description: "500g pack of shredded cheddar cheese.",
    price: 4.50,
    qStock: 40,
    },
    {
    id: 6,
    name: "Apples",
    description: "1kg of fresh red apples.",
    price: 3.00,
    qStock: 80,
    },
    {
    id: 7,
    name: "Bananas",
    description: "1kg of ripe bananas.",
    price: 1.20,
    qStock: 90,
    },
    {
    id: 8,
    name: "Potatoes",
    description: "2kg bag of white potatoes.",
    price: 2.75,
    qStock: 70,
    },
    {
    id: 9,
    name: "Rice",
    description: "1kg pack of basmati rice.",
    price: 2.99,
    qStock: 65,
    },
    {
    id: 10,
    name: "Pasta",
    description: "500g pack of penne pasta.",
    price: 1.50,
    qStock: 85,
    },
    {
    id: 11,
    name: "Tomatoes",
    description: "1kg of fresh tomatoes.",
    price: 2.40,
    qStock: 50,
    },
    {
    id: 12,
    name: "Onions",
    description: "1kg of yellow onions.",
    price: 1.80,
    qStock: 60,
    },
    {
    id: 13,
    name: "Cooking Oil",
    description: "1-liter bottle of vegetable oil.",
    price: 5.00,
    qStock: 45,
    },
    {
    id: 14,
    name: "Sugar",
    description: "1kg pack of white sugar.",
    price: 1.20,
    qStock: 100,
    },
    {
    id: 15,
    name: "Salt",
    description: "1kg pack of iodized table salt.",
    price: 0.80,
    qStock: 110,
    },
   ];

const links = 
    [
    {path: "/dashboard/home", name: "Home"},
    {path: "/dashboard/products", name: "Products"},
    {path: "/dashboard/sales", name: "Sales"},
    {path: "/dashboard/shortage", name: "Shortage"}
   ];

const Header = () => {
    return (
        <div className="w-full py-2 px-4 bg-gray-800 mb-3 flex">
            <h1 className="font-bold text-gray-200 text-lg">Nassy's POS</h1>
        </div>
    )
}
 
 const Dashboard = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
         setCart((prevCart) => [...prevCart, product]);
    };


    return (
        <div className="h-svh bg-gray-50 overflow-y-auto w-full">
            <Header/>
            <div className="flex">
            <div className="w-1/6 rounded-md mr-1 flex flex-col h-dvh">
            {links.map(link =>
            <NavLink key={link.name} to={link.path} className={({ isActive }) =>
                isActive ? "px-2 py-2 shadow-md shadow-gray-300 my-1 rounded-md text-gray-100 font-semibold bg-gray-700 "
                : "text-gray-800 font-normal px-2 py-2"}>
            {link.name}
            </NavLink>)
             }
             <Link to="/" className="my-8 font-semibold text-red-500 text-sm ml-3">Sign Out</Link>
            </div>
            <div className="w-5/6 rounded-lg">
            <Outlet/>
            </div>
           
            </div>
        </div>
    );
 }

 export default Dashboard;