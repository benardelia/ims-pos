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


const supabase = createClient("https://hdvpgcnhocljtpmtlrae.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnBnY25ob2NsanRwbXRscmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNTc0ODMsImV4cCI6MjA1NzgzMzQ4M30.4YvNxHdJ1VKo2oB9qa7AsMGFeAydZf0lx_DR831FF-s");

const Inventory = () => {
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const [name, setName] = useState("");
    const [category,setCategory] = useState();
    const [description, setDescription] = useState("");
    const [stock,setStock] = useState(null);
    const [posting, setPosting] = useState(null);
    const [errorPosting, setErrorPosting] = useState(null);
    const [price,setPrice] = useState(null);
    const [cost,setCost] = useState(null);
    const [categories,setCategories] = useState([]);
    const [url, setUrl] = useState("/store/products/")
    const [next, setNext] = useState(null);
    const [cont, setCont] = useState(null);
    const [previous, setPrevious] = useState(null);
     const [page, setPage] = useState(1)
    
      const session = localStorage.getItem("jwt_token");
         const axiosInstance = axios.create({
                     baseURL: "http://10.219.31.111:8000",
                         timeout: 18000,
                         headers: {
                             Authorization : `Bearer ${session}`,
                             "Content-Type": "application/json"
                         }
                     })
             useEffect(()=> {
       axiosInstance.get(url)
         .then(res=> {
            setProducts(res.data.results)
            setCont(res.data.count);
                        setNext(res.data.next)
                           setPrevious(res.data.previous)
                })
                
             },[url])  
             const handleNext = () => {
                setUrl(next)
                setPage(page + 1)
            }
           const handlePrevious = () => {
                setUrl(previous)
               setPage( page - 1)
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
                         } )
                         .catch(
                            error => {
                                toaster.create({
                                    title: error.message,
                                    type: "error",
                                    duration: 5000
                                  })
                            }
                         )
        }
    return (
        <div className="w-full font-open text-gray-900 dark:text-gray-50 h-dvh overflow-y-auto bg-gray-50 dark:bg-slate-700">
             <Toaster/>
               <div className="w-full my-4 flex justify-end px-6">
                            <div className="flex items-center justify-self-end">
                            <Input type="search" variant="filled" placeholder="search a product" 
                            className=" rounded-2xl h-8 mx-6 text-gray-700 text-sm bg-white px-4 w-60 "/>
                               
                                <Button onClick={()=>navigate("/admin/newInv")}
                                 className="bg-yellow-300 dark:bg-yellow-500 font-semibold dark:text-gray-900 px-4 h-8"><GrAdd/>Add product</Button>
                 </div>
            </div>
            <div className="mx-6">
            </div>
            <div className="mx-8 mb-24">
                
                <Table.Root interactive className="bg-white dark:bg-gray-800">
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
                            products?.map((product,i)=> (<Table.Row key={product.id} className="bg-white dark:bg-gray-800">
                                <Table.Cell>{i + 1}</Table.Cell>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.stock}</Table.Cell>
                                <Table.Cell>{product.description}</Table.Cell>
                                <Table.Cell alignItems="flex-end" className="flex justify-self-center"><div className="flex items-center justify-between">
                                    <button onClick={()=>navigate(`/admin/edit/${product.uuid}`)} 
                                    className="p-2 flex place-items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                                                                    <FiEdit/>
                                                                                    </button>
                                <button onClick={()=>handleDelete(product.uuid)} className=" p-2 flex place-items-center ml-6 justify-center rounded-lg bg-red-50 text-red-500 dark:text-red-100 dark:bg-red-600">
                                                                                    <FiTrash/></button></div></Table.Cell>
                            </Table.Row>))
                        }
                    </Table.Body>
                </Table.Root>
                <div className="flex items-center absolute bottom-4 left-1/2 justify-center mt-4">
                        {previous && <button onClick={handlePrevious} className="font-open rounded-full text-sm dark:bg-gray-800 bg-gray-300 p-1"><BiChevronLeft/></button>
                               }
                               <p className="text-xs mx-4 font-bold text-center font-open">{page}/{total}</p>
                             {next && <button onClick={handleNext} className="rounded-full font-open text-sm bg-gray-300 dark:bg-gray-800 p-1"><BiChevronRight/></button>
                              }
                </div>
            </div>
        </div>
    )
};
export default Inventory