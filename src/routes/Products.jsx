import { useEffect,useState } from "react";
import axios from "axios";
import { Spinner, Table, TableColumnHeader, TableHeader } from "@chakra-ui/react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const session = localStorage.getItem("jwt_token");

    const axiosInstance = axios.create({
        baseURL: "http://154.118.227.229:1967",
        timeout: 18000,
        headers: {
            Authorization : `Bearer ${session}`,
        }
    }) 
    useEffect(()=> {
        axiosInstance.get("/store/products/")
        .then((response)=> {
            setProducts(response.data);
            setLoading(false);
        }
        ).catch((error)=> {
            setError(error.message);
            setLoading(false);
        });
    },[]);  
    return (
        <div className="mx-4">
        <h1 className="font-bold text-xl my-4">List of Products   ({products.length})</h1>
        <div className="mr-12">
            { loading ? <div className="justify-center"><Spinner size="xl"/></div> :
        <Table.ScrollArea>
        <Table.Root size="lg"  interactive striped rounded="md" variant="outline">
            <Table.Header className="bg-slate-600 sticky top-0">
                <Table.Row>
                    <Table.ColumnHeader className="text-gray-100">NO.</Table.ColumnHeader>
                    <Table.ColumnHeader className="text-gray-100">PRODUCT</Table.ColumnHeader>
                    <Table.ColumnHeader className="text-gray-100" textAlign="center">Q.IN STOCK</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end" className="text-gray-100">PRICE</Table.ColumnHeader>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {products.map((product,index)=>(
                    <Table.Row key={product.id}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell textAlign="center">{product.stock}</Table.Cell>
                        <Table.Cell textAlign="end">{product.price}</Table.Cell>
                    </Table.Row>)
                    )}
                </Table.Body>
        </Table.Root>
        </Table.ScrollArea>}
        </div>
        </div>
    );
}

export default Products