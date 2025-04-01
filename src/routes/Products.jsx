import { useEffect,useState } from "react";
import axios from "axios";
import { Skeleton, Spinner, Table, TableColumnHeader, TableHeader } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { FaSpinner } from "react-icons/fa6";


const supabase = createClient("https://hdvpgcnhocljtpmtlrae.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnBnY25ob2NsanRwbXRscmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNTc0ODMsImV4cCI6MjA1NzgzMzQ4M30.4YvNxHdJ1VKo2oB9qa7AsMGFeAydZf0lx_DR831FF-s");



const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const session = localStorage.getItem("jwt_token");

    async function getProducts() {
        const { data, error } = await supabase.from("products").select();
        setProducts(data);
        setLoading(false)

        if (error) {
            setError(true);
        }
    }

    useEffect(()=> {
      getProducts();
    },[]);  
    return (
        <div className="mx-4 overflow-y-auto">
        <h1 className="font-bold font-open text-xl my-4">List of Products   ({products?.length})</h1>
        <div className="mr-12">
        <Skeleton loading={loading} rounded="lg" w="90%" h="25rem" variant=""> 
    { loading ? <div className="size-12 shadow-xl flex justify-center place-items-center justify-self-center bg-white rounded-md">
                                    <FaSpinner className="animate-spin"/>
                                     </div>
                : error ? 
                <p className="font-open text-center font-bold text-red-600">
                    Failed to fetch, Check the internet connection.
                    </p> :
        <Table.ScrollArea>
        <Table.Root size="lg"  interactive rounded="xl" variant="outline" className="bg-white rounded-lg h-full font-open dark:bg-gray-800">
            <Table.Header className="bg-lime-300 text-sm sticky top-0">
                <Table.Row>
                    <Table.ColumnHeader className="">NO.</Table.ColumnHeader>
                    <Table.ColumnHeader className="">PRODUCT</Table.ColumnHeader>
                    <Table.ColumnHeader className="" textAlign="center">Q.IN STOCK</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end" className="">PRICE</Table.ColumnHeader>
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
        </Table.ScrollArea>
}
        </Skeleton>
        </div>
        </div>
    );
}

export default Products