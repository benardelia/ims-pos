import { useEffect,useState } from "react";
import axios from "axios";
import { Skeleton, Spinner, Table, TableColumnHeader, TableHeader } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { FaSpinner } from "react-icons/fa6";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";


const supabase = createClient("https://hdvpgcnhocljtpmtlrae.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnBnY25ob2NsanRwbXRscmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNTc0ODMsImV4cCI6MjA1NzgzMzQ4M30.4YvNxHdJ1VKo2oB9qa7AsMGFeAydZf0lx_DR831FF-s");



const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [total, setTotal] = useState(null)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null);
     const [url, setUrl] = useState("/store/products/?stock=1")
     const [page, setPage] = useState(1)
    const session = localStorage.getItem("jwt_token");
    
         const axiosInstance = axios.create({
                baseURL: "http://127.0.0.1:8000",
                timeout: 9000,
                headers: {
                    Authorization : `Bearer ${session}`,
                }
            }) 
            useEffect(()=> {
                axiosInstance.get(url)
                .then((response)=> {
                    setProducts(response.data.results);
                    setTotal(response.data.count);
                    setLoading(false);
                        setNext(response.data.next)
                        setPrevious(response.data.previous)
                }
                );  
        
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
        <div className="mx-4">
        <h1 className="font-bold font-open text-lg my-4">List of Products.</h1>
        <div className="mx-6">
        <Skeleton loading={loading} rounded="lg" w="90%" h="25rem" variant=""> 
    { loading ? <div className="size-12 shadow-xl flex justify-center place-items-center justify-self-center bg-white rounded-md">
                                    <FaSpinner className="animate-spin"/>
                                     </div>
                : error ? 
                <p className="font-open text-center font-bold text-red-600">
                    Failed to fetch, Check the internet connection.
                    </p> :
        <Table.ScrollArea>
        <Table.Root size="lg" interactive variant="outline" className="bg-white h-full w-full font-open dark:bg-gray-800">
            <Table.Header className="bg-custom text-sm sticky top-0">
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
        <div className="flex absolute bottom-12 left-1/2 mt-4 justify-self-center items-center">
        {previous && <button onClick={handlePrevious} className=" border dark:bg-gray-800 font-open rounded-full text-sm shadow-lg bg-gray-300 p-1"><BiChevronLeft/></button>
               }
               <p className="text-xs mx-4 font-bold text-center font-open">{page}/{tota}</p>
             {next && <button onClick={handleNext} className="border rounded-full font-open text-sm shadow-lg bg-gray-300 dark:bg-gray-800 p-1"><BiChevronRight/></button>
              }
        </div>
        </Table.ScrollArea>
        
}
        </Skeleton>
        </div>
        </div>
    );
}

export default Products