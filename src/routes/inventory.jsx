import { Button, Table, Input,  Dialog,
    HStack,VStack, Field,Select, createListCollection,
    Portal, 
    IconButton} from "@chakra-ui/react"
import { CgAdd } from "react-icons/cg"
import { GrAdd } from "react-icons/gr"
import { Link, useNavigate} from "react-router"
import { Tabs } from "@chakra-ui/react"
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react"
import { FaSpinner } from "react-icons/fa6";
import axios from "axios"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { FiTrash, FiEdit } from "react-icons/fi"
import { toaster, Toaster } from "../components/ui/toaster"
import axiosInstance from "./axiosInstance"
import { PiSpinnerBallLight, PiSpinnerLight } from "react-icons/pi"


const Inventory = () => {
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const [categories,setCategories] = useState([]);
    const [filters, setFilters] = useState("")
    const [url, setUrl] = useState(`/store/products/?name=${filters}`)
    const [next, setNext] = useState(null);
    const [cont, setCont] = useState(null);
    const [previous, setPrevious] = useState(null);
     const [page, setPage] = useState(1)
     const [refresh, setRefresh] = useState(true)
     const [searchQuery, setSearchQuery] = useState("")
    
             useEffect(()=> {
       axiosInstance.get(url)
         .then(res=> {
            setProducts(res.data.results)
            setCont(res.data.count);
            setNext(res.data.next)
            setPrevious(res.data.previous)
            setLoading(false)
                })
                
             },[url, refresh])  
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
            const total = Math.ceil(cont/10);
            
            const handleDelete = (id) => {
                axiosInstance.delete(`/store/products/${id}/`)
                .then(res=> {
                    toaster.create({
                             title: "product deleted successfully!",
                             type: "success",
                             duration: 3000
                           })
                           setRefresh(!refresh)
                         } )
                         .catch(
                        err => {
                            const errorBody = err.response.data;
                                console.error(err)
                                toaster.create({
                                    description: errorBody.error,
                                    type: "error",
                                    duration: 5000
                                  })
                            }
                         )
        }
    
    return (
        <div className="w-full   font-roboto text-gray-900 dark:text-gray-50 h-dvh overflow-y-auto bg-inherit">
             <Toaster/>
               <div className="w-full my-4 flex  justify-end px-6">
                            <div className="flex items-center justify-self-end">
                            <Input type="search" value={filters} onChange={(e)=>setFilters(e.target.value)} variant="filled" placeholder="search a product" 
                            className=" rounded-2xl h-8 mx-6 text-gray-700 text-sm bg-white px-4 w-60 "/>
                               
                                <Button onClick={()=>navigate("/admins/newInv")}
                                 className="bg-yellow-300 dark:bg-yellow-500 font-semibold dark:text-gray-900 px-4 h-8"><GrAdd/>Add product</Button>
                 </div>
            </div>
            <div className="mx-6">
            </div>
            <div className="mx-8 h-fit flex flex-col justify-center place-items-center mb-24">
                {loading ? <PiSpinnerLight className="animate-spin size-7 flex place-self-center"/> :
                <Table.Root interactive className="bg-white dark:bg-opacity-20">
                    <Table.Header>
                        <Table.Row className="bg-custom rounded-t-lg dark:bg-custom dark:text-gray-900">
                        <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                NO.
                            </Table.ColumnHeader>
                            <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                Product Name
                            </Table.ColumnHeader>
                                <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                   Quantity in stock
                                </Table.ColumnHeader>
                                <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                   description
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" className="font-bold dark:text-gray-900">actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            products?.map((product,i)=> (<Table.Row key={product.id} className="">
                                <Table.Cell>{i + 1}</Table.Cell>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.stock}</Table.Cell>
                                <Table.Cell>{product.description}</Table.Cell>
                                <Table.Cell alignItems="flex-end" className="flex justify-self-center"><div className="flex items-center justify-between">
                                    <button onClick={()=>navigate(`/admins/edit/${product.uuid}`)} 
                                    className="p-2 flex place-items-center justify-center rounded-lg bg-gray-100 dark:bg-opacity-20">
                                                                                    <FiEdit/>
                                                                                    </button>
                                <button onClick={()=>handleDelete(product.uuid)} className=" p-2 flex place-items-center ml-6 justify-center rounded-lg bg-red-50 text-red-500 dark:text-red-100 dark:bg-red-600">
                                                                                    <FiTrash/></button></div></Table.Cell>
                            </Table.Row>))
                        }
                    </Table.Body>
                </Table.Root>
}              {!loading &&                <div className="flex items-center justify-center mt-4">
                        {previous && <button onClick={handlePrevious} className="  font-roboto rounded-full text-sm dark:bg-gray-800 bg-gray-300 p-1"><BiChevronLeft/></button>
                               }
                               <p className="text-xs mx-4 font-bold text-center   font-roboto">{page}/{total}</p>
                             {next && <button onClick={handleNext} className="rounded-full   font-roboto text-sm bg-gray-300 dark:bg-gray-800 p-1"><BiChevronRight/></button>
                              }
                </div>
                }
            </div>
        </div>
    )
};
export default Inventory