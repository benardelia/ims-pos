import { Table } from "@chakra-ui/react";
import SalesChart from "./SalesChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";


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
    const session = localStorage.getItem("jwt_token");
    
         const axiosInstance = axios.create({
                baseURL: "http://10.219.31.111:8000",
                timeout: 9000,
                headers: {
                    Authorization : `Bearer ${session}`,
                }
            }) 

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
            })
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
        <div className="">
        <h className="text-xl font-bold pb-8"> Sales.</h>
        <div className="mx-4">
        <Table.Root interactive variant="outline"className="bg-white font-semibold font-open dark:bg-gray-800 mr-16" >
            <Table.Header>
                <Table.Row className="bg-custom " mt="5rem">
                <Table.ColumnHeader className="font-bold dark:text-black">No.</Table.ColumnHeader>
                <Table.ColumnHeader className="font-bold dark:text-black">Status</Table.ColumnHeader>
                <Table.ColumnHeader className="font-bold dark:text-black">Payment time</Table.ColumnHeader>
                <Table.ColumnHeader className="font-bold dark:text-black" textalign="center">Amount</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
             { loading ? <p className="font-open">Loading...</p>
             :
             sales?.map((sale, i) =>
                <Table.Row>
                    <Table.Cell className="">{i + 1}</Table.Cell>
                    <Table.Cell className="">{sale.status}</Table.Cell>
                    <Table.Cell className="text-xs">{sale.payment_date.slice(0,20)}</Table.Cell>
                    <Table.Cell className="font-semibold" textAlign="center">{sale.amount}</Table.Cell>
                </Table.Row>)}
            </Table.Body>
        </Table.Root>
         <div className="flex mt-4 absolute bottom-16 left-1/2 justify-self-center items-center">
                {previous && <button onClick={onPrev} className=" dark:bg-gray-800 font-open rounded-full text-sm shadow-lg bg-gray-300 p-1"><BiChevronLeft/></button>
                       }
                       <p className="text-xs mx-4 font-bold text-center font-open">{page}/{tota}</p>
                     {next && <button onClick={onNext} className=" dark:bg-gray-800 rounded-full font-open text-sm shadow-lg bg-gray-300 p-1"><BiChevronRight/></button>
                      }
                </div>
        </div>
        </div>
    );
}

export default Sales