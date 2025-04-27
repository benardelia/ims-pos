import { Table, TableScrollArea, Tabs } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { BsTrash2Fill } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import SalesChart from "./SalesChart";
import { createClient } from "@supabase/supabase-js";
import { FaSpinner } from "react-icons/fa6";
import axios from "axios";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const supabase = createClient("https://hdvpgcnhocljtpmtlrae.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnBnY25ob2NsanRwbXRscmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNTc0ODMsImV4cCI6MjA1NzgzMzQ4M30.4YvNxHdJ1VKo2oB9qa7AsMGFeAydZf0lx_DR831FF-s");


const Sales = () => {
        const [sales, setSales] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
         const [next, setNext] = useState(null)
            const [previous, setPrevious] = useState(null);
            const [cont, setCont] = useState(null)
             const [url, setUrl] = useState("/store/payments")
             const [page, setPage] = useState(1)
        
        const session = localStorage.getItem("jwt_token");
                 const axiosInstance = axios.create({
                             baseURL: "http://127.0.0.1:8000",
                                 timeout: 18000,
                                 headers: {
                                     Authorization : `Bearer ${session}`,
                                     "Content-Type": "application/json"
                                 }
                             })
                     useEffect(()=> {
               axiosInstance.get(url)
                 .then(res=> {
                    setSales(res.data.results)
                    setNext(res.data.next)
                    setPrevious(res.data.previous)
                    setCont(res.data.count)
                        })
               },[url]) 
               const onNext = () => {
                setUrl(next)
                setPage(page + 1)
            }
            const onPrev = () => {
                setUrl(previous)
                setPage(page - 1)
            }
            const tota = Math.ceil(cont/10)
    return (
        <div className="font-open w-full mb-36">
             <div className=" my-6 mx-6 flex justify-between">
                            <h1 className="font-semibold text-xl">Sales report.</h1>
                            <Button rounded="lg" fontSize="sm" px="0.75rem" className="text-red-500 dark:text-white bg-white dark:bg-red-500" fontWeight="bold">clear sales<CgTrash/></Button>
                        </div>
                        <div className="">
                              <div className="mx-12">
                                    <Table.Root shadow="md" interactive borderColor="orange.800" variant="outline"className="bg-white w-full dark:bg-gray-800">
                                        <Table.Header>
                                            <Table.Row className="bg-custom">
                                            <Table.ColumnHeader className="dark:text-gray-900 font-bold">NO.</Table.ColumnHeader>
                                            <Table.ColumnHeader className="dark:text-gray-900 font-bold">PRODUCT</Table.ColumnHeader>
                                            <Table.ColumnHeader className="dark:text-gray-900 font-bold" textAlign="center">QUANTITY SOLD</Table.ColumnHeader>
                                            <Table.ColumnHeader className="dark:text-gray-900 font-bold">Cart ID</Table.ColumnHeader>
                                            <Table.ColumnHeader className="dark:text-gray-900 font-bold" textalign="center">AMOUNT</Table.ColumnHeader>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {sales?.map((sale, i) =>
                                            <Table.Row key={sale.uuid} >
                                                <Table.Cell>{i + 1}</Table.Cell>
                                                <Table.Cell>{sale.order.status}</Table.Cell>
                                                <Table.Cell textAlign="center">{sale.order.items.length}</Table.Cell>
                                                <Table.Cell>{sale.order.items.length}</Table.Cell>
                                                <Table.Cell>{sale.amount}</Table.Cell>
                                            </Table.Row>
                                           )}
                                        </Table.Body>
                                    </Table.Root>
                                     <div className="flex fixed  bottom-12 right-1/3 mt-4 justify-self-center items-center">
                                                    {previous && <button onClick={onPrev} className=" font-open rounded-full text-sm bg-gray-300 dark:bg-gray-800 p-1"><BiChevronLeft/></button>}
                                                           <p className="text-xs mx-4 font-bold text-center font-open">{page}/{tota}</p>
                                                         {next && <button onClick={onNext} className=" rounded-full font-open text-sm bg-gray-300 dark:bg-gray-800 p-1"><BiChevronRight/></button>
                                                          }
                                                    </div>
                                    </div>
                        </div>
        </div>
    );
  }


   const Carts = () => {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  async function getCarts() {
        const { data, error } = await supabase.from("sales").select();
                setCarts(data);
                

                if (error) {
                    setError(true)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            }
              useEffect(()=> {
                 getCarts();
               },[])  

    return (
        <div className="font-open w-full">
              <div className="flex justify-between  my-6 mx-12">
            <h1 className="font-semibold text-xl">Carts report.</h1>
            <Button className="text-red-500 dark:text-white bg-white dark:bg-red-500" px="0.75rem" fontSize="sm" fontWeight="bold"rounded="lg" >clear carts<CgTrash/></Button>
            </div>
              <div className="mx-36">
              {loading ? <div className="size-12 shadow-xl flex justify-center place-items-center justify-self-center bg-white rounded-md">
                                              <FaSpinner className="animate-spin"/>
                                               </div>:
               error ? <p className="font-open text-center">Error</p>
                          :
                          <TableScrollArea>
                            <Table.Root h="40rem" interactive shadow="md" variant="outline" rounded="xl" striped="gray.300" className="mb-12 bg-white dark:bg-gray-800">
                                <Table.Header className="bg-lime-200 dark:bg-blue-700">
                                    <Table.Row>
                                        <Table.ColumnHeader>Cart ID</Table.ColumnHeader>
                                        <Table.ColumnHeader>Date & Time</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center">Cart link</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {carts.map((order, index) => 
                                    <Table.Row key={order.id}>
                                        <Table.Cell>{order.id}</Table.Cell>
                                        <Table.Cell className="text-sm ">{order.created_at}</Table.Cell>
                                        <Table.Cell textAlign="center" className="underline"><Link>View cart</Link></Table.Cell>
                                    </Table.Row>
                                     )}
                                </Table.Body>
                            </Table.Root>
                            </TableScrollArea>
   }
        </div>
        </div>
    );
   }

   const Reports = () => {
    const [view, setView] = useState("sales");
    return (
        <div className="w-full font-open bg-gray-50 dark:bg-slate-700">
            <Tabs.Root defaultValue="Sales" w="full" mx="">
            <Tabs.List>
                <Tabs.Trigger value="Sales" asChild>
                <div onClick={() =>setView("sales") } className="text-lg font-semibold pr-4">
                 Sales
               </div>
              </Tabs.Trigger>
              <Tabs.Trigger value="carts" asChild>
               <div onClick={() =>setView("carts") } className="text-lg font-semibold pr-4">
                 Carts
               </div>
            </Tabs.Trigger>
      </Tabs.List>
            </Tabs.Root>
            {
                view === "sales" ? <Sales/> : <Carts/>
            }
        </div>
    );
        }

export default Reports