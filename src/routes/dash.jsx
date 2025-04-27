import { GridItem, Skeleton } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BiChevronRight, BiChevronsRight } from "react-icons/bi";
import { Link } from "react-router";
import { Box } from "@chakra-ui/react";
import { MdOutlineInventory } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { AiFillProduct } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";
import Doughnut from "./Doughnut";
import { Chart, useChart } from "@chakra-ui/charts"
import { HStack, Stack, Text } from "@chakra-ui/react"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import axios from "axios";
import { NativeSelect } from "@chakra-ui/react";



function CustomTooltip(props) {
  const { active, payload, label } = props
  if (!active || !payload || payload  === 0) return null
  return (
    <Box w="40" rounded="lg" className="bg-gray-100 dark:bg-slate-900" p="3">
      <HStack>
        <span className="font-open text-xs font-semibold">{label.slice(0,10)} sales</span>
      </HStack>
      <Stack>
        {payload.map((item) => (
          <HStack key={item.name}>
            <Box boxSize="2" rounded="full" bg={item.color} />
            <Text textStyle="xl">{item.value.toLocaleString()}</Text>
          </HStack>
        ))}
      </Stack>
    </Box>
  )
}

const Demo = ({legals}) => {
  const chart = useChart({
    data:  legals,
    series: [{ name: "sales", color: "teal.solid" }],
  })

  return (
    <div className="bg-white shadow-xl dark:bg-slate-800 rounded-lg">
    <Chart.Root maxH="" chart={chart}>
      <LineChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border")} vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={chart.key("time")}
          tickFormatter={(value) => value.slice(0, 10)}
          stroke={chart.color("border")}
          label={{ value: "time", position: "bottom" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          stroke={chart.color("border")}
          label={{ value: "sales", position: "left", angle: -90 }}
        />
        <Tooltip
          animationDuration={100}
          cursor={false}
          content={<CustomTooltip />}
        />
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            strokeWidth={2}
            dot={false}
            type="linear"
          />
        ))}
      </LineChart>
    </Chart.Root>
    </div>
  )
}


const Boxy1 = ({ box, data1,data2, info }) => {
      if ((data1/data2)>5) {
        info:"Bad"
      }
    


    return (
        <div className="font-open relative h-full p-4 flex flex-col justify-center w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="flex w-full justify-between items-center">
                <p className="text-xs font-bold font-open text-gray-900 dark:text-gray-100">{box.detail}</p>
                <div className="size-8 flex place-items-center justify-center rounded-full">
                    <MdOutlineInventory className="text-green-800 dark:text-green-500 text-2xl" />
                </div>
            </div>
            <p className="font-semibold text-xl font-open my-4">{box.main}</p>
            <Link to={box.path} className="flex items-center text-xs ">{box.link}<BiChevronRight /></Link>

        </div>
    );
}
const Boxy2 = ({ box, isLoading }) => {
    return (
        <div className="font-open relative h-full p-4 flex flex-col justify-center w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="flex w-full justify-between items-center">
                <p className="text-xs font-bold font-open text-gray-900 dark:text-gray-100">{box.detail}</p>
                <div className="size-8 flex justify-center place-items-center rounded-full">
                    <AiFillProduct className="text-2xl text-orange-400" />
                </div>
            </div>
            { isLoading? <Skeleton h="1.5rem" w="3rem" my="1rem"/>:
            <p className="font-semibold text-xl  font-open my-4">{box.main}</p>
}
            <Link to={box.path} className="flex items-center text-xs ">{box.link}<BiChevronRight /></Link>

        </div>
    );
}
const Boxy3 = ({ box,isLoading }) => {
    return (
        <div className="font-open relative h-full p-4 flex flex-col justify-center w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="flex w-full justify-between items-center">
                <p className="text-xs font-bold font-open text-gray-900 dark:text-gray-100">{box.detail}</p>
                <div className="size-8 flex place-items-center justify-center rounded-full">
                    <IoWarning className="text-3xl text-red-600 dark:text-red-500" />
                </div>
            </div>
            { isLoading? <Skeleton h="1.5rem" w="3rem" my="1rem"/>:
            <p className="font-semibold text-xl  font-open my-4">{box.main}</p>
}
            <Link to={box.path} className="flex items-center text-xs ">{box.link}<BiChevronRight /></Link>

        </div>
    );
}
const Boxy4 = ({ box, isLoading }) => {
    return (
        <div className="font-open relative p-4 flex flex-col justify-center w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="flex w-full justify-between items-center">
                <p className="text-xs font-bold font-open text-gray-900 dark:text-gray-100">{box.detail}</p>
                <div className="size-8 flex place-items-center justify-center rounded-full"><FcSalesPerformance className="text-2xl" /></div>
            </div>
            { isLoading? <Skeleton h="1.5rem" w="6rem" my="1rem"/>:
            <p className="font-semibold text-xl md:text-xl font-open my-4">{box.main}</p>}
            <Link to={box.path} className="flex items-center text-xs">{box.link}<BiChevronRight /></Link>

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
    const [products,setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [shortage, setShortage] = useState([])
    const [dash, setDash] = useState(null);
    const [category, setCategory] = useState(null)


    const session = localStorage.getItem("jwt_token");

    const cats = ["year", "month","day"];

    const axiosInstance = axios.create({
           baseURL: "http://10.219.31.111:8000",
           timeout: 9000,
           headers: {
               Authorization : `Bearer ${session}`,
           }
       }) 
       useEffect(()=> {
           axiosInstance.get("/store/products/?stock=1")
           .then((response)=> {
               setProducts(response.data.results);
               setLoading(false);
           }
           ).catch(
            error=> {
                console.error(error.message)
            }
           )
           axiosInstance.get("/store/products/?shortage=0")
           .then((response)=> {
               setShortage(response.data.results);
           }
           );
           axiosInstance.get(`/store/dashboard/?group_by=${category}`)
           .then(res=> {
            setDash(res.data);
           })
       },[])
    return (
        <div className=" w-full relative bg-gray-100 dark:bg-slate-700 p-3">
            <div className=" relative h-1/6 grid grid-flow-col gap-8 px-4 w-full mb-8">
                <Boxy4 isLoading={loading} box={{
                    main: dash?.total_sales.toLocaleString(),
                    color: "green-600",
                    detail: "Sales/month",
                    link: "sale report",
                    path: "/admin/reports"
                }}
                />
                <Boxy1 data1={dash?.total_products} data2={dash?.shortage_products} box={{
                    main: "Bad",
                    detail: "inventory status",
                    link: "inventory report",
                    path: "/admin/inventory"
                }}
                />
                <Boxy2 isLoading={loading} box={{
                    main: dash?.total_products ,
                    detail: "total products",
                    link: "products",
                    path: "/admin/inventory"
                }}
                />
                <Boxy3 isLoading={loading} box={{
                    main: dash?.shortage_products,
                    detail: "products shortage",
                    link: "shortage",
                    path: "/admin/inventory"
                }}
                />
            </div>
            <div className="flex h-1/2">
            <div className="w-3/4  mx-6">
                <Demo className="" legals={dash?.sales_summary.map(item => ({
                sales: item.total_sales,
                time: item.period?.slice(0,10)
              }))} />
            </div>
            <div className="w-1/4">
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