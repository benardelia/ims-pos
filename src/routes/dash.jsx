import { GridItem } from "@chakra-ui/react";
import React from "react";
import { BiChevronRight, BiChevronsRight } from "react-icons/bi";
import { Link } from "react-router";
import { Box } from "@chakra-ui/react";
  
const Boxy = ({box}) => {
    return(
            <div className="w-full mx-12 h-36 bg-white dark:bg-gray-800 flex place-items-center rounded-xl justify-center shadow-md">
               
                <div className="place-items-center mb-8">
                <Box w="full" h="1.2rem"></Box>
                <h1 className="font-bold text-lg">{box.main}</h1>
                <p className="text-sm ">{box.detail}</p>
                </div>
                <Link to={box.path} className="absolute text-xs bottom-5 flex items-end">{box.link}<BiChevronRight/></Link>
            </div>
    );
   }
   const Reed = ({good}) => {
    return (
        <div className="w-full bg-white dark:bg-gray-800 h-36 rounded-xl shadow-lg">
            <div className="h-10 border-b dark:border-b-gray-800 rounded-t-xl flex bg-blue-200 dark:bg-blue-800 place-items-center justify-between px-6">
                <h1 className="font-semibold text-sm">{good.moja}</h1>
                <Link to={good.tatu} className="text-sm flex items-center">Go to {good.mbili}<BiChevronsRight/></Link>
            </div>
            <div className="flex my-6 justify-around">
                <div className="flex flex-col my-auto">
                    <h className="font-bold text-lg">{good.first}</h>
                    <p className="text-sm">{good.second}</p>
                </div>
                <div className="flex flex-col">
                <h className="font-bold text-lg">{good.third}</h>
                <p className="text-sm">{good.fourth}</p>
                </div>
            </div>
        </div>
     );
   }
const Dash = () => {
    return (
    <div className=" w-full bg-gray-100 dark:bg-gray-700">
        <div className="py-6 px-4">
        <h1 className="text-lg font-bold">Dashboard.</h1>
        <p className="text-sm font-light">A quick overview of the store.</p>
        </div>
        <div className="flex relative justify-evenly px-6 w-full mb-8">
            <Boxy box={{
                main: "450,000",
                color: "green-600",
                detail: "Sales/mo",
                link:"sale report",
                path: "/admin/reports"
             }}/>
            <Boxy box={{
                main: "Good",
                detail: "inventory status",
                link:"inventory report",
                path: "/admin/inventory"
            }}/>
            <Boxy box={{
                main: "305",
                detail: "products available",
                link:"products",
                path: "/admin/reports"
            }}/>
            <Boxy box={{
                  main: "05",
                  detail: "products shortage",
                  link:"shortage",
                  path: "/admin/inventory"
            }}/>
    </div>
    <div className=" mx-16 grid grid-cols-2 grid-rows-2 gap-3">
        <Reed good={{
            moja: "Total products",
            mbili: "inventory",
            tatu: "/admin/inventory",
            first: "305",
            second: "total no. of products",
            third: "12",
            fourth: "products categories"
        }}/>
        <Reed good = {{  
         moja: "Products sold/mo",
         mbili: "sales report",
         tatu: "/admin/inventory",
         first: "122",
         second: "total sold",
         third: "23",
         fourth: "carts generated"
    }}
        />
        <Reed good = {{  
        moja: "Total products",
        mbili: "inventory",
        tatu: "/admin/inventory",
        first: "",
        second: "",
        third: "",
        fourth: ""
    }}
     />
        <Reed good={{
        moja: "Orders",
        mbili: "orders report",
        tatu: "/admin/inventory",
        first: "102",
        second: "total orders",
        third: "Jackgold wine",
        fourth: "frequently bought"
    }}
    />
    </div>
    </div>
    );
}
export default Dash