import { Table } from "@chakra-ui/react";
import SalesChart from "./SalesChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Skeleton } from "@chakra-ui/react";
import { FaSpinner } from "react-icons/fa";
import { PiSpinnerLight } from "react-icons/pi";
import axiosInstance from "./axiosInstance";

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [total, setTotal] = useState(null)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null);
    const [cont, setCont] = useState(null)
     const [url, setUrl] = useState("/store/payments")
     const [page, setPage] = useState(1)

            useEffect(()=>{
             axiosInstance.get(url)
             .then(res=>{
                setCont(res.data.count)
                setSales(res.data.results)
                setNext(res.data.next)
                setPrevious(res.data.previous)
                setLoading(false)
             }
             )
            },[url])
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
        <div className="h-dvh">
        <h className="text-xl font-bold pb-8"> Sales.</h>
        <div className=" h-full flex flex-col justify-center relative">
            { loading ? <PiSpinnerLight className="animate-spin size-8 flex place-self-center"/> :
        <Table.Root interactive variant="outline"className="bg-white font-semibold font-open dark:bg-opacity-10 mr-16" >
            <Table.Header>
                <Table.Row className="bg-custom " mt="5rem">
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
                    <Table.Cell className="font-normal">{sale.status}</Table.Cell>
                    <Table.Cell className="font-normal text-xs">{sale.payment_date.slice(0,20)}</Table.Cell>
                    <Table.Cell className="font-semibold" textAlign="center">{sale.amount}</Table.Cell>
                </Table.Row>)}
            </Table.Body>
        </Table.Root>}
        {!loading &&
         <div className="flex mt-4 place-self-center items-center">
                {previous && <button onClick={onPrev} className=" dark:bg-opacity-10   font-open rounded-full text-sm shadow-lg bg-gray-300 p-1"><BiChevronLeft/></button>
                       }
                       <p className="text-xs mx-4 font-bold text-center   font-open">{page}/{tota}</p>
                     {next && <button onClick={onNext} className=" dark:bg-opacity-10 rounded-full   font-open text-sm shadow-lg bg-gray-300 p-1"><BiChevronRight/></button>
                      }
                </div>
}
        </div>
        </div>
    );
}

export default Sales