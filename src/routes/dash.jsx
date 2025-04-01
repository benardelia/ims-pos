import { GridItem } from "@chakra-ui/react";
import React from "react";
import { BiChevronRight, BiChevronsRight } from "react-icons/bi";
import { Link } from "react-router";
import { Box } from "@chakra-ui/react";
import { MdOutlineInventory } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { AiFillProduct } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Doughnut from "./Doughnut";


// Register Chart.js components before using them
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Months
        datasets: [
            {
                label: "Sales in Tshs",
                data: [500000, 750000, 900000, 650000, 1200000, 1500000], // Sales data
                borderColor: "black",
                backgroundColor: "white",
                borderWidth: 2,
                tension: 0.3, // Smooth curve effect
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Monthly Sales (Tshs)",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `Tsh ${value.toLocaleString()}`, // Format currency
                },
            },
        },
    };

    return <Line data={data} options={options} className="p-4 rounded-xl shadow-lg"/>;
};

const Boxy1 = ({ box }) => {
    return (
        <div className="font-open relative h-36 px-4 flex flex-col justify-center w-60 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="flex w-full justify-between items-center">
                <p className="text-xs font-bold font-open text-gray-900">{box.detail}</p>
                <div className="size-8 flex place-items-center justify-center rounded-full">
                    <MdOutlineInventory className="text-green-800 text-2xl" />
                </div>
            </div>
            <p className="font-semibold text-xl font-open my-4">{box.main}</p>
            <Link to={box.path} className="flex items-center text-xs ">{box.link}<BiChevronRight /></Link>

        </div>
    );
}
const Boxy2 = ({ box }) => {
    return (
        <div className="font-open relative h-36 px-4 flex flex-col justify-center w-60 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="flex w-full justify-between items-center">
                <p className="text-xs font-bold font-open text-gray-900">{box.detail}</p>
                <div className="size-8 flex justify-center place-items-center rounded-full">
                    <AiFillProduct className="text-2xl text-orange-400" />
                </div>
            </div>
            <p className="font-semibold text-xl font-open my-4">{box.main}</p>
            <Link to={box.path} className="flex items-center text-xs ">{box.link}<BiChevronRight /></Link>

        </div>
    );
}
const Boxy3 = ({ box }) => {
    return (
        <div className="font-open relative h-36 px-4 flex flex-col justify-center w-60 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="flex w-full justify-between items-center">
                <p className="text-xs font-bold font-open text-gray-900">{box.detail}</p>
                <div className="size-8 flex place-items-center justify-center rounded-full">
                    <IoWarning className="text-3xl text-red-600" />
                </div>
            </div>
            <p className="font-semibold text-xl font-open my-4">{box.main}</p>
            <Link to={box.path} className="flex items-center text-xs ">{box.link}<BiChevronRight /></Link>

        </div>
    );
}
const Boxy4 = ({ box }) => {
    return (
        <div className="font-open relative h-36 px-4 flex flex-col justify-center w-60 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="flex w-full justify-between items-center">
                <p className="text-xs font-bold font-open text-gray-900">{box.detail}</p>
                <div className="size-8 flex place-items-center justify-center rounded-full"><FcSalesPerformance className="text-2xl" /></div>
            </div>
            <p className="font-semibold text-xl font-open my-4">{box.main}</p>
            <Link to={box.path} className="flex items-center text-xs ">{box.link}<BiChevronRight /></Link>

        </div>
    );
}
const Reed = ({ good }) => {
    return (
        <div className="w-full font-open bg-white dark:bg-gray-800 h-36 rounded-xl shadow-lg">
            <div className=" border-b border-blue-300 dark:border-b-gray-800 rounded-t-xl flex dark:bg-blue-800 place-items-center justify-between px-6 py-2">
                <h1 className="font-semibold font-open text-sm">{good.moja}</h1>
                <Link to={good.tatu} className="text-sm font-open flex items-center">Go to {good.mbili}<BiChevronsRight /></Link>
            </div>
            <div className="flex my-6 justify-around">
                <div className="flex flex-col my-auto">
                    <h className="font-bold font-open text-lg">{good.first}</h>
                    <p className="text-sm font-open">{good.second}</p>
                </div>
                <div className="flex flex-col">
                    <h className="font-bold font-open text-lg">{good.third}</h>
                    <p className="text-sm font-open">{good.fourth}</p>
                </div>
            </div>
        </div>
    );
}
const Dash = () => {
    return (
        <div className=" w-full bg-gray-100 dark:bg-slate-500">
            <div className="py-6 px-4">
                <h1 className="text-lg font-open font-bold">Dashboard.</h1>
                <p className="text-sm font-open font-normal">A quick overview of the store.</p>
            </div>
            <div className="flex relative justify-evenly w-full mb-8">
                <Boxy4 box={{
                    main: "450,000",
                    color: "green-600",
                    detail: "Sales/mo",
                    link: "sale report",
                    path: "/admin/reports"
                }} />
                <Boxy1 box={{
                    main: "Good",
                    detail: "inventory status",
                    link: "inventory report",
                    path: "/admin/inventory"
                }} />
                <Boxy2 box={{
                    main: "305",
                    detail: "products available",
                    link: "products",
                    path: "/admin/inventory"
                }} />
                <Boxy3 box={{
                    main: "05",
                    detail: "products shortage",
                    link: "shortage",
                    path: "/admin/inventory"
                }} />
            </div>
            <div className="flex">
            <div className="w-2/3 mx-6 h-96">
                <SalesChart className="m-36"/>
            </div>
            <div className="w-1/3">
            <p className="font-open text-center mb-3 font-bold text-sm">Income vs Expenses</p>
           
            <Doughnut/>
            <div className="m-6">
                <div className="flex items-center">
                    <div className="h-3 w-5 bg-yellow-500"></div><p className="ml-3 font-open text-sm">expenses</p>
                    </div>
                    <div className="flex items-center"> 
                    <div className="h-3 w-5 bg-green-600"></div><p className="ml-3 font-open text-sm">Income</p>
                </div>
            </div>
            </div>
            </div>
        </div>
    );
}


export default Dash;