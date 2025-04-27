import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "@chakra-ui/react";

const Shortage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(null)
    const session = localStorage.getItem("jwt_token");

    const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:8000",
        timeout: 9000,
        headers: {
            Authorization : `Bearer ${session}`,
        }
    }) 
    useEffect(()=> {
        axiosInstance.get("/store/products/?shortage=0")
        .then((response)=> {
            setProducts(response.data.results);
            setCount(response.data.count)
            setLoading(false);
        }
        );
    },[])


    return (
        <div className="">
        <h className="text-xl mx-6 font-open font-bold">Stock shortage.</h>
       <div className="p-5">
       <p className="font-open ml-12 font-bold">{count}</p>
       </div>
       <div className="mx-12">
            <Table.Root interactive className="">
                <Table.Header >
                    <Table.Row className="bg-custom ">
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
                    products?.map((item, i)=><Table.Row className="dark:bg-slate-800">
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell textAlign="center" className="underline">see product</Table.Cell>
                    </Table.Row>)
                   }
                </Table.Body>
            </Table.Root>
            </div>
        </div>
    );
}

export default Shortage