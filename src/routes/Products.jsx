import { useEffect,useState } from "react";
import axios from "axios";
import { Skeleton, Spinner, Table, TableColumnHeader, TableHeader } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { FaSpinner } from "react-icons/fa6";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { toaster } from "../components/ui/toaster";
import { PiSpinnerLight } from "react-icons/pi";
import axiosInstance from "./axiosInstance";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [total, setTotal] = useState(null)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null);
     const [url, setUrl] = useState("/store/products/?stock=1")
     const [page, setPage] = useState(1)
     
            useEffect(()=> {
                axiosInstance.get(url)
                .then((response)=> {
                    setProducts(response.data.results);
                    setTotal(response.data.count);
                    setLoading(false);
                        setNext(response.data.next)
                        setPrevious(response.data.previous)
                }
                ).catch(
                    error=> {
                        setError(true)
                    }
                )
            },[url])


            const handleNext = () => {
                setUrl(next)
                setPage(page + 1)
            }
           const handlePrevious = () => {
                 setUrl(previous)
                 setPage( page - 1)
            }
            const tota = Math.ceil(total/10);
    return (
        <div className=" mx-0 sm:mx-4">
        <h1 className="font-bold   font-roboto text-lg my-4">List of Products.</h1>
        <div className="mx-6 flex-col flex justify-center place-items-center">
        
    { loading ? <PiSpinnerLight className="animate-spin my-72 size-8"/> 
             :
    
        <Table.Root size="lg" interactive variant="outline" className="bg-white h-full w-full   font-roboto dark:bg-opacity-10">
            <Table.Header className="bg-[#f7d518] text-sm sticky top-0">
                <Table.Row>
                    <Table.ColumnHeader className="dark:text-black">NO.</Table.ColumnHeader>
                    <Table.ColumnHeader className="dark:text-black">PRODUCT</Table.ColumnHeader>
                    <Table.ColumnHeader className="dark:text-black" textAlign="center">Q.IN STOCK</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end" className="dark:text-black">PRICE</Table.ColumnHeader>
                </Table.Row>
                </Table.Header>
                <Table.Body className="text-sm">
                    {products?.map((product,index)=>(
                    <Table.Row key={product.id}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell textAlign="center">{product.stock}</Table.Cell>
                        <Table.Cell textAlign="end">{product.price}</Table.Cell>
                    </Table.Row>)
                    )}
                </Table.Body>
        </Table.Root>
}
{!loading &&
<div className="flex place-self-center mt-6 items-center">
        {previous && <button onClick={handlePrevious} className=" border dark:bg-opacity-10   font-roboto rounded-full text-sm shadow-lg bg-gray-300 p-1"><BiChevronLeft/></button>}
               <p className="text-xs mx-4 font-bold text-center   font-roboto">{page}/{tota}</p>
             {next && <button onClick={handleNext} className="border rounded-full   font-roboto text-sm shadow-lg bg-gray-300 dark:bg-opacity-10 p-1"><BiChevronRight/></button>
              }
        </div>}
        </div>
        </div>
    );
}

export default Products