import { Badge, Portal, Table, TableScrollArea, Tabs } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { BsArrowUp, BsThreeDots, BsThreeDotsVertical, BsTrash2Fill } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import SalesChart from "./SalesChart";
import { createClient } from "@supabase/supabase-js";
import { FaFileInvoiceDollar, FaSackDollar, FaSpinner, FaUserTag } from "react-icons/fa6";
import axios from "axios";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import axiosInstance from "./axiosInstance";
import { PiSpinnerLight } from "react-icons/pi";
import { Menu } from "@chakra-ui/react";
import { MdOutlinePendingActions, MdFilterAlt } from "react-icons/md";



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
        <div className="font-roboto h-full w-full">
        <div className="">
             <div className="mx-4">
            {loading ? <PiSpinnerLight className="animate-spin size-8 flex place-self-center"/> :
            <TableScrollArea  h="26rem">
            <Table.Root shadow="md" interactive borderColor="orange.800" variant="outline"className="bg-white w-full dark:bg-opacity-10">
            <Table.Header className="p-2 sticky top-0">
            <Table.Row className="bg-[#f7d518]">
            <Table.ColumnHeader className="dark:text-gray-900 text-sm font-bold">NO.</Table.ColumnHeader>
            <Table.ColumnHeader className="dark:text-gray-900 text-sm font-bold">Status</Table.ColumnHeader>
            <Table.ColumnHeader className="dark:text-gray-900 text-sm font-bold" textAlign="center">QUANTITY SOLD</Table.ColumnHeader>
            <Table.ColumnHeader className="dark:text-gray-900 text-sm font-bold" textalign="center">AMOUNT</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center" className="text-sm">action</Table.ColumnHeader>
            </Table.Row>
            </Table.Header>
              <Table.Body>
                {sales?.map((sale, i) =>
                    <Table.Row key={sale.uuid} >
                    <Table.Cell className="text-xs">{i + 1}</Table.Cell>
                    <Table.Cell className="text-xs font-semibold">{sale.order.status}</Table.Cell>
                    <Table.Cell textAlign="center" className="text-xs">{sale.order.items.length}</Table.Cell>
                    <Table.Cell className="text-xs">{sale.amount}</Table.Cell>
                    <Table.Cell textAlign="center" className=" text-xs underline"><Link to={`/orders/${sale.uuid}`}>see items</Link></Table.Cell>
                </Table.Row>
               )}
            </Table.Body>
            </Table.Root>
        </TableScrollArea>
}
         {!loading && <div className="flex mt-4 justify-self-center items-center">
            {previous && <button onClick={onPrev} className="   font-roboto rounded-full text-sm bg-gray-300 dark:bg-gray-800 p-1"><BiChevronLeft/></button>}
                   <p className="text-xs mx-4 font-bold text-center   font-roboto">{page}/{tota}</p>
                         {next && <button onClick={onNext} className=" rounded-full   font-roboto text-sm bg-gray-300 dark:bg-gray-800 p-1"><BiChevronRight/></button>
                          }
                                                    </div>}
                                    </div>
                        </div>
        </div>
    );
  }

 const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

   const Orders = () => {
    const [orders, setOrders] = useState(null);
    const [statusFilter, setStatusFilter] = useState('')
    const [dateFilter, setDateFilter] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [total, setTotal] = useState(null)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null);
    
    const [url, setUrl] = useState(`/store/orders/`)
    const [page, setPage] = useState(1)                
    const navigate = useNavigate()

    const params = {
        ...(statusFilter && {status: statusFilter}),
        ...(dateFilter && {created_at: dateFilter}),
    };
              useEffect(()=> {
                axiosInstance.get(url, { params })
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
                
               },[url, statusFilter, dateFilter])
               
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
        <div className=" h-full font-roboto w-full pb-12">    
              <div className="mx-4 flex flex-col place-items-center">
              {loading ? <PiSpinnerLight className="animate-spin m-auto size-8 flex place-self-center"/> :
               error ? <p className="  font-roboto text-center">Error loading</p>
                          :
                          <>
                             <div className="flex w-full mx-6 justify-between">
            <p>{status}</p>
            <div>
            <input type="date" value={dateFilter} onChange={(e)=>setDateFilter(e.target.value)} className="p-2 m-2 border-1 rounded-lg font-semibold text-sm font-open"/>
          <Menu.Root className="absolute top-0 left-2/3">
                                  <Menu.Trigger>
                                      <Button className="dark:text-gray-100 text-sm" > 
                                         <MdFilterAlt/>
                                      </Button>
                                  </Menu.Trigger>
                                  <Portal>
                                      <Menu.Positioner alignContent="end">
                                          <Menu.Content>
                                              <Menu.Item onClick={()=>setStatusFilter("Pending")}>
                                               pending
                                              </Menu.Item>
                                              <Menu.Item onClick={()=>setStatusFilter("Completed")}> 
                                                  completed
                                              </Menu.Item>
                                              
                                          </Menu.Content>
                                      </Menu.Positioner>
                                  </Portal>
                                 </Menu.Root>
                </div>
        </div>
                          <TableScrollArea maxH="24rem" w="full">
                            <Table.Root interactive shadow="md" variant="outline" className=" bg-white h-2/3 dark:bg-opacity-10">
                                <Table.Header className="bg-[#f7d518] sticky z-50 top-0 text-sm">
                                    <Table.Row>
                                        <Table.ColumnHeader className="dark:text-gray-900">No.</Table.ColumnHeader>
                                        <Table.ColumnHeader className="dark:text-gray-900">Status</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">items no.</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">time ordered</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">action</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {orders?.map((order, i) => 
                                    <Table.Row key={order.uuid}>
                                        <Table.Cell className="text-xs">{i + 1}</Table.Cell>
                                        <Table.Cell className="text-xs ">{order.status}</Table.Cell>
                                        <Table.Cell textAlign="center" className="text-xs">{order.items.length}</Table.Cell>
                                        <Table.Cell textAlign="center" className="text-xs ">{formatDate(order.created_at)}</Table.Cell>
                                        <Table.Cell textAlign="center"><button onClick={()=>navigate(`/orders/${order.uuid}`)} className="underline text-xs">see items</button></Table.Cell>
                                    </Table.Row>
                                     )}
                                </Table.Body>
                            </Table.Root>
                            </TableScrollArea>
                            </>
   }
                         {!loading &&
                                             <div className="flex mt-4 w-full justify-between place-self-center items-center">
                                                    {previous && <button onClick={handlePrevious} className=" dark:bg-opacity-10 font-roboto rounded-lg text-sm shadow-lg bg-white p-3 w-16 place-items-center"><BiChevronLeft/></button>
                                                           }
                                                           <p className="text-xs mx-4 font-bold text-center   font-roboto">{page}/{tota}</p>
                                                         {next && <button onClick={handleNext} className=" dark:bg-opacity-10 rounded-lg  place-items-center font-roboto text-sm shadow-lg bg-white w-16 p-3"><BiChevronRight/></button>
                                                          }
                                                    </div>
                                    }

        </div>
        </div>
    );
   }

   function Item ({item, link, icon}) {
    return (
     <div className="bg-white flex flex-col justify-between dark:bg-opacity-10 p-3 rounded-lg shadow-md">
        <div className="flex justify-between">
           <h1 className="text-xs font-medium">{item.name}</h1>
           <Menu.Root>
            <Menu.Trigger>
                <button> 
                   <BsThreeDotsVertical/>
                </button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner alignItems="left">
                    <Menu.Content>
                        <Menu.Item>
                            { link &&
                            <Link to={item.link}>
                               view {item.name}
                            </Link>
   }
                    </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
           </Menu.Root>
        </div>
            <h1 className="text-xl py-2 font-semibold">{item.value}</h1>
            {icon}
           </div>
    )
   }

   const Reports = () => {
    const [view, setView] = useState("sales");
    const [url, setUrl] = useState("/store/orders/")
    const [count, setCount] = useState(null)
    const [costumer, setCostumer] = useState(null)
    const [dash, setDash] = useState(null)
    const [date, setDate] = useState("")
    const [status, setStatus] = useState("")
     useEffect(()=> {
                axiosInstance.get(url)
                .then((res)=> {
                    setCount(res.data.count)
                }).catch(
                    error => {
                        setError(true)
                    }
                )
            axiosInstance.get("/store/customers/")
            .then(res=> {
                setCostumer(res.data.count)
                
            })
            axiosInstance.get("/store/customer_dashboard/")
                  .then(
                    res => {
                     setDash(res.data)
                    }
                  )

            }, [])
    return (
        <div className="w-full h-svh font-roboto bg-inherit">
            <div className="w-full flex">
              <div className="w-full grid grid-cols-4 gap-4 px-4">
               <Item link={false} item={{
                name: "revenues",
                value: dash?.total_orders_price?.toLocaleString(),
                rate: "12%"
               }}
               icon={<FaSackDollar className="text-xl text-green-600"/>}
               />
               <Item link={false} item={{
                name: "orders",
                value: dash?.completed_orders,
                rate: "59%",
                link: ""
               }}
               icon={<FaFileInvoiceDollar className="text-xl"/>}
               />
               <Item link={true} item={{
                name: "customers",
                value: costumer,
                rate: "2%",
                link: "/admin/customers"
               }}
               icon={<FaUserTag className="text-2xl"/>}
               />
               <Item link={true} item={{
                name: "pending orders",
                value: dash?.pending_orders,
                rate: "41%",
                link: "/admin/pending-orders"
               }}
               icon={<MdOutlinePendingActions className="text-2xl text-red-600"/>}
               />
            </div>

            </div>
            <div className="w-full pt-16 h-2/3">
                 <Orders/>
            </div>
            
        </div>
    );
        }

export default Reports