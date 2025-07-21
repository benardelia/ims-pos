import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "@chakra-ui/react";
import { PiSpinnerLight } from "react-icons/pi";
import axiosInstance from "./axiosInstance";
import { Link, useNavigate } from "react-router";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Shortage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(null)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null);
    const [cont, setCont] = useState(null)
    const [url, setUrl] = useState("/store/products/?shortage=0")
    const [page, setPage] = useState(1)


    useEffect(()=> {
       axiosInstance.get(url)
             .then(res=>{
                
                setCont(res.data.count)
                setProducts(res.data.results)
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
    const navigate = useNavigate();
    return (
        <div className="">
        <h className="text-xl m-6   font-roboto font-bold">Stock shortage {cont}.</h>
       <div className="m-6 flex flex-col justify-center place-items-center">
        { loading ? <PiSpinnerLight className="animate-spin size-8"/> :
            <Table.Root interactive className="dark:bg-opacity-20 sm:mx-6">
                <Table.Header >
                    <Table.Row className="bg-[#f7d518] ">
                        <Table.ColumnHeader className="dark:text-gray-900"> 
                            Product
                        </Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">
                            link
                        </Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                   {
                    products?.map((item, i)=><Table.Row className="">
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell textAlign="center" className=""><button className="underline" onClick={()=>navigate(`/dashboard/product/${item.uuid}`)}>see product</button></Table.Cell>
                    </Table.Row>)
                   }
                </Table.Body>
            </Table.Root>
}
 {!loading &&
         <div className="flex mt-4 place-self-center items-center">
                {previous && <button onClick={onPrev} className=" dark:bg-opacity-10   font-roboto rounded-full text-sm shadow-lg bg-gray-300 p-1"><BiChevronLeft/></button>
                       }
                       <p className="text-xs mx-4 font-bold text-center   font-roboto">{page}/{tota}</p>
                     {next && <button onClick={onNext} className=" dark:bg-opacity-10 rounded-full   font-roboto text-sm shadow-lg bg-gray-300 p-1"><BiChevronRight/></button>
                      }
                </div>
}
         
            </div>
        </div>
    );
}

export default Shortage