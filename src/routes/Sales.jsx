import { Table } from "@chakra-ui/react";
import SalesChart from "./SalesChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Skeleton } from "@chakra-ui/react";
import { FaSpinner } from "react-icons/fa";
import { PiSpinnerLight } from "react-icons/pi";
import axiosInstance from "./axiosInstance";
import { Menu,Button, Portal } from "@chakra-ui/react";

import { MdFilterAlt } from "react-icons/md";


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

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [total, setTotal] = useState(null)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null);
    const [cont, setCont] = useState(null)
    const [date, setDate] = useState(null);
    const [status, setStatus] = useState(null)
     const [url, setUrl] = useState("/store/orders/")
     const [page, setPage] = useState(1)

     const handleDateChange = async (e) => {
    const dat = e.target.value;
    setDate(dat);
     }
        const params = {
        ...(status && {status: status}),
        ...(date && {created_at: date}),
    }
  

    useEffect(()=>{
     axiosInstance.get(url, {params})
        .then(res=>{
        setCont(res.data.count)
        setSales(res.data.results)
        setNext(res.data.next)
        setPrevious(res.data.previous)
        setLoading(false)
        }
             )
            },[url, date, status])
const onNext = () => {
    setUrl(next)
    setLoading(true)
    setPage(page + 1)
}
const onPrev = () => {
    setUrl(previous)
    setLoading(true)
    setPage(page - 1)
}
const tota = Math.ceil(cont/10)
    return (
        <div className="h-dvh px-6">
        <div className=" h-full flex flex-col place-items-center relative">
            { loading ? <PiSpinnerLight className="animate-spin size-8 flex place-self-center"/> :
        <><div className="flex items-center w-full mx-6 justify-between">
            <p className="font-semibold">Sales.</p>
            <div>
            <input type="date" value={date} onChange={handleDateChange} className="p-2 m-2 border-1 rounded-lg font-semibold text-sm font-open"/>
            <Menu.Root className="absolute top-0 left-2/3">
                                              <Menu.Trigger>
                                                  <Button className="dark:text-gray-100 text-sm" > 
                                                     <MdFilterAlt/>
                                                  </Button>
                                              </Menu.Trigger>
                                              <Portal>
                                                  <Menu.Positioner alignContent="end">
                                                      <Menu.Content>
                                                          <Menu.Item onClick={()=>setStatus("Pending")}>
                                                           pending
                                                          </Menu.Item>
                                                          <Menu.Item onClick={()=>setStatus("Completed")}> 
                                                              completed
                                                          </Menu.Item>
                                                          
                                                      </Menu.Content>
                                                  </Menu.Positioner>
                                              </Portal>
                                    </Menu.Root>
                                  </div>
        </div>
        <Table.Root interactive variant="outline"className="bg-white font-semibold font-roboto dark:bg-opacity-10 mx-16 w-full" >
            <Table.Header>
                <Table.Row className="bg-[#f7d518] " mt="5rem">
                <Table.ColumnHeader className="font-bold dark:text-black">No.</Table.ColumnHeader>
                <Table.ColumnHeader className="font-bold dark:text-black">Status</Table.ColumnHeader>
                <Table.ColumnHeader className="font-bold dark:text-black">Payment time</Table.ColumnHeader>
                <Table.ColumnHeader className="font-bold dark:text-black" textalign="center">Amount</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
             sales?.map((sale, i) =>
                <Table.Row>
                    <Table.Cell className="">{i + 1}</Table.Cell>
                    <Table.Cell className="font-normal text-xs">{sale.status}</Table.Cell>
                    <Table.Cell className="font-normal text-xs">{formatDate(sale.created_at)}</Table.Cell>
                    <Table.Cell className="font-semibold" textAlign="center">{sale.amount}</Table.Cell>
                </Table.Row>)}
            </Table.Body>
        </Table.Root>
        </>}
        {!loading &&
         <div className="flex mt-4 w-full justify-between place-self-center items-center">
                {previous && <button onClick={onPrev} className=" dark:bg-opacity-10 font-roboto rounded-lg text-sm shadow-lg bg-white p-3 w-16 place-items-center"><BiChevronLeft/></button>
                       }
                       <p className="text-xs mx-4 font-bold text-center   font-roboto">{page}/{tota}</p>
                     {next && <button onClick={onNext} className=" dark:bg-opacity-10 rounded-lg  place-items-center font-roboto text-sm shadow-lg bg-white w-16 p-3"><BiChevronRight/></button>
                      }
                </div>
}
        </div>
        </div>
    );
}

export default Sales