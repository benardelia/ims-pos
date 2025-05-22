import { Table, TableScrollArea, Tabs } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { BsTrash2Fill } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import SalesChart from "./SalesChart";
import { createClient } from "@supabase/supabase-js";
import { FaSpinner } from "react-icons/fa6";
import axios from "axios";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import axiosInstance from "./axiosInstance";
import { PiSpinnerLight } from "react-icons/pi";

const Sales = () => {
        const [sales, setSales] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
         const [next, setNext] = useState(null)
            const [previous, setPrevious] = useState(null);
            const [cont, setCont] = useState(null)
             const [url, setUrl] = useState("/store/payments")
             const [page, setPage] = useState(1)
             
             useEffect(()=> {
               axiosInstance.get(url)
                 .then(res=> {
                    setSales(res.data.results)
                    setNext(res.data.next)
                    setPrevious(res.data.previous)
                    setCont(res.data.count)
                    setLoading(false)
                        })
               },[url]) 
               const onNext = () => {
                setUrl(next)
                setPage(page + 1)
                setLoading(true)
            }
            const onPrev = () => {
                setUrl(previous)
                setPage(page - 1)
                setLoading(true)
            }
            const tota = Math.ceil(cont/10)
    return (
        <div className="font-open w-full mb-36">
             <div className=" my-6 mx-6 flex justify-between">
                            <h1 className="font-semibold text-xl">Sales report.</h1>
                            <Button rounded="lg" fontSize="sm" px="0.75rem" className="text-red-500 dark:text-white bg-white dark:bg-red-500" fontWeight="bold">clear sales<CgTrash/></Button>
                        </div>
                        <div className="">
                              <div className="mx-4">
                                {loading ? <PiSpinnerLight className="animate-spin size-8 flex place-self-center"/> :
                                    <Table.Root shadow="md" interactive borderColor="orange.800" variant="outline"className="bg-white w-full dark:bg-opacity-10">
                                        <Table.Header>
                                            <Table.Row className="bg-custom">
                                            <Table.ColumnHeader className="dark:text-gray-900 font-bold">NO.</Table.ColumnHeader>
                                            <Table.ColumnHeader className="dark:text-gray-900 font-bold">PRODUCT</Table.ColumnHeader>
                                            <Table.ColumnHeader className="dark:text-gray-900 font-bold" textAlign="center">QUANTITY SOLD</Table.ColumnHeader>
                                            <Table.ColumnHeader className="dark:text-gray-900 font-bold" textalign="center">AMOUNT</Table.ColumnHeader>
                                            <Table.ColumnHeader textAlign="center">action</Table.ColumnHeader>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {sales?.map((sale, i) =>
                                            <Table.Row key={sale.uuid} >
                                                <Table.Cell>{i + 1}</Table.Cell>
                                                <Table.Cell>{sale.order.status}</Table.Cell>
                                                <Table.Cell textAlign="center">{sale.order.items.length}</Table.Cell>
                                                <Table.Cell>{sale.amount}</Table.Cell>
                                                <Table.Cell textAlign="center" className="underline"><Link to={`/orders/${sale.uuid}`}>see items</Link></Table.Cell>
                                            </Table.Row>
                                           )}
                                        </Table.Body>
                                    </Table.Root>
}
                                     {!loading && <div className="flex mt-4 justify-self-center items-center">
                                                    {previous && <button onClick={onPrev} className="   font-open rounded-full text-sm bg-gray-300 dark:bg-gray-800 p-1"><BiChevronLeft/></button>}
                                                           <p className="text-xs mx-4 font-bold text-center   font-open">{page}/{tota}</p>
                                                         {next && <button onClick={onNext} className=" rounded-full   font-open text-sm bg-gray-300 dark:bg-gray-800 p-1"><BiChevronRight/></button>
                                                          }
                                                    </div>}
                                    </div>
                        </div>
        </div>
    );
  }


   const Orders = () => {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [total, setTotal] = useState(null)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null);
    const [url, setUrl] = useState("/store/orders/")
    const [page, setPage] = useState(1)                
    const navigate = useNavigate()
              useEffect(()=> {
                axiosInstance.get(url)
                .then((res)=> {
                    setOrders(res.data.results)
                    setNext(res.data.next)
                    setPrevious(res.data.previous)
                    setTotal(res.data.count)
                    setLoading(false)
                }).catch(
                    error => {
                        setError(true)
                    }
                )
                
               },[url])  
               const handleNext = () => {
                setUrl(next)
                setPage(page + 1)
                setLoading(true)
            }
           const handlePrevious = () => {
                 setUrl(previous)
                 setPage( page - 1)
                 setLoading(true)
            }
            const tota = Math.ceil(total/10);
        

    return (
        <div className=" h-dvh font-open w-full pb-12">
            <div className="flex justify-between  my-6 mx-12">
            <h1 className="font-semibold text-xl">Orders report.</h1>
            <Button className="text-red-500 dark:text-white bg-white dark:bg-red-500" px="0.75rem" fontSize="sm" fontWeight="bold"rounded="lg" >clear orders<CgTrash/></Button>
            </div>
              
              <div className="mx-4 flex flex-col place-items-center">
              {loading ? <PiSpinnerLight className="animate-spin m-auto size-8 flex place-self-center"/> :
               error ? <p className="  font-open text-center">Error loading</p>
                          :
                          <TableScrollArea className="w-full">
                            <Table.Root interactive shadow="md" variant="outline" className=" bg-white dark:bg-opacity-10">
                                <Table.Header className="bg-custom">
                                    <Table.Row>
                                        <Table.ColumnHeader className="dark:text-gray-900">No.</Table.ColumnHeader>
                                        <Table.ColumnHeader className="dark:text-gray-900">Status</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">items no.</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">time ordered</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">action</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {orders.map((order, i) => 
                                    <Table.Row key={order.uuid}>
                                        <Table.Cell>{i + 1}</Table.Cell>
                                        <Table.Cell className="text-sm ">{order.status}</Table.Cell>
                                        <Table.Cell textAlign="center" className="underline">{order.items.length}</Table.Cell>
                                        <Table.Cell textAlign="center" className="text-sm ">{order.created_at.slice(0,20)}</Table.Cell>
                                        <Table.Cell textAlign="center"><button onClick={()=>navigate(`/orders/${order.uuid}`)} className="underline">see items</button></Table.Cell>
                                    </Table.Row>
                                     )}
                                </Table.Body>
                            </Table.Root>
                            </TableScrollArea>
   }
                            {!loading &&
                            <div className="flex place-self-center items-center">
                                    {previous && <button onClick={handlePrevious} className=" border dark:bg-gray-800   font-open rounded-full text-sm shadow-lg bg-gray-300 p-1"><BiChevronLeft/></button>}
                                           <p className="text-xs mx-4 font-bold text-center   font-open">{page}/{tota}</p>
                                         {next && <button onClick={handleNext} className="border rounded-full font-open text-sm shadow-lg bg-gray-300 dark:bg-gray-800 p-1"><BiChevronRight/></button>
                                          }
                                    </div>
                            }

        </div>
        </div>
    );
   }

   function Item () {
    return (
        <div className="bg-[#fff] rounded-lg shadow-lg w-full h-24">

        </div>
    )
   }

   const Reports = () => {
    const [view, setView] = useState("sales");
    return (
        <div className="w-full font-open bg-inherit">
           
            <Tabs.Root defaultValue="Sales" w="full" mx="">
            <Tabs.List>
                <Tabs.Trigger value="Sales" asChild>
                <div onClick={() =>setView("sales") } className="text-lg font-semibold pr-4">
                 Sales
               </div>
              </Tabs.Trigger>
              <Tabs.Trigger value="orders" asChild>
               <div onClick={() =>setView("orders") } className="text-lg font-semibold pr-4">
                 Orders
               </div>
            </Tabs.Trigger>
      </Tabs.List>
            </Tabs.Root>
            {
                view === "sales" ? <Sales/> : <Orders/>
            }
        </div>
    );
        }

export default Reports