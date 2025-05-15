import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "@chakra-ui/react";
import { PiSpinnerLight } from "react-icons/pi";
import axiosInstance from "./axiosInstance";


const Shortage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(null)
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
        <h className="text-xl mx-6   font-open font-bold">Stock shortage.</h>
       <div className="p-5">
       <p className="  font-open ml-12 font-bold">{count}</p>
       </div>
       <div className="flex justify-center">
        { loading ? <PiSpinnerLight className="animate-spin my-72 size-8"/> :
            <Table.Root interactive className="dark:bg-opacity-20 sm:mx-6">
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
                    products?.map((item, i)=><Table.Row className="">
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell textAlign="center" className="underline">see product</Table.Cell>
                    </Table.Row>)
                   }
                </Table.Body>
            </Table.Root>
}
            </div>
        </div>
    );
}

export default Shortage