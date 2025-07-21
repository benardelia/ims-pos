import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axiosInstance from "./axiosInstance";
import { Flex, Table, TableScrollArea } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import { FiTrash2 } from "react-icons/fi";
import { NativeSelect, NativeSelectField, NativeSelectIndicator } from "@chakra-ui/react";
import { toaster, Toaster } from "../components/ui/toaster"


const Items = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({
    uuid: "",
    customer: "",
    status: "",
    items: [],
    created_at: "",
    updated_at: ""})
    const [posting, setPosting] = useState(null);
    const [customer, setCustomer] = useState(null)
    useEffect(() => {
        axiosInstance.get(`/store/order/${id}/`)
            .then(res => {
                setOrder({
                 uuid: res.data.uuid,
                 customer: res.data.customer,
                 status: res.data.status,
                 items: res.data.items,
                 created_at: res.data.created_at,
                 updated_at: res.data.updated_at
                })
            })
    
    }, [])
      
    const handleAccept = async (e) => {
        e.preventDefault();
        setPosting(true)
        try {
          const res = await axiosInstance.put(`/store/order/${order.uuid}/`,order,
                        )
                    toaster.create({
                    title: "order saved successfully!",
                    type: "success",
                    duration: 3000
                    })
                    setPosting(false)
                }
                 catch (error) {
                     console.log(error) 
                     toaster.create({
                      title: error.message,
                      type: "error",
                      duration: 5000
                    })
                    setPosting(false)
             }

    }

    const handleDelete = async (e) => {
        e.preventDefault()
        axiosInstance.delete(`/store/order/${order.uuid}/`)
        .then( res => {
             toaster.create({
                      title: "order deleted successfully",
                      type: "loading",
                      duration: 8000
                    })
        })
    }
      
    const total = order?.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return (
        <div className="h-dvh relative flex justify-center py-6 bg-[#e6e4e4] dark:bg-black w-full">
            <Link to="/admin/pending-orders" className="absolute left-12 top-6"><BsArrowLeft /></Link>
            <Toaster/>
            <div className="bg-white relative p-3 rounded-lg h-auto dark:bg-opacity-10 shadow-xl w-1/2">
                <h1 className="font-open font-bold">Order details</h1>
                {posting && <h>posting</h>}
                <Table.Root w="full">
                    <Table.Header >
                        <Table.ColumnHeader className="dark:text-gray-900 mr-6"></Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center" className="dark:text-gray-900 "></Table.ColumnHeader>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell textAlign="end" className="font-semibold bg-gray-100 dark:bg-opacity-20 font-open pr-36">Customer</Table.Cell>
                            <Table.Cell textAlign="start" className="font-open bg-gray-100 dark:bg-opacity-20 pl-36">{order?.customer}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign="end" className="font-semibold bg-gray-100 dark:bg-opacity-20 font-open pr-36">Status</Table.Cell>
                            <Table.Cell textAlign="start" className="font-open bg-gray-100 flex items-center dark:bg-opacity-20 pl-36">
                                {order.status} {order.status === "Pending" && <button onClick={()=>setOrder({...order, status: "Completed"})} className="mx-12 items-center flex"><FcOk/>accept?</button>}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="">
                            <Table.Cell textAlign="end" className="font-semibold bg-gray-100 font-open pr-36 dark:bg-opacity-20">Products</Table.Cell>
                            <Table.Cell textAlign="start" className="font-open bg-gray-100 pl-36 dark:bg-opacity-20">{order?.items.length}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
                
                <TableScrollArea h="13rem" className="bg-gray-50 dark:bg-opacity-20 my-12">
                <Table.Root >
                    <Table.Body>
                        <Table.Row className="">
                            <Table.Cell textAlign="end" className="font-semibold font-open pr-36">Products List</Table.Cell>
                            <Table.Cell textAlign="start" className="font-open pl-36"></Table.Cell>
                        </Table.Row>
                        {order?.items.map(item =>
                            <Table.Row key={item.uuid} className="px-24">
                                <Table.Cell textAlign="" className="bg-gray-100 font-semibold dark:bg-opacity-20 font-open pl-24">{item.product.name}</Table.Cell>
                                <Table.Cell textAlign="" className="font-open pr-24 bg-gray-100 dark:bg-opacity-20">{item.quantity}</Table.Cell>
                            </Table.Row>)
                        }
                    </Table.Body>
                </Table.Root>
                </TableScrollArea>
                <div className="flex justify-between mx-6">
                    <h1 className="font-open mr-72 font-semibold">Total</h1>
                    <h1 className="font-open font-semibold">{total?.toLocaleString()}</h1>
                </div>
                
                <Flex justify="space-around">
                  <button onClick={handleDelete} className="bg-red-50  mr-2 text-gray-900 font-open flex justify-center items-center font-semibold rounded-md py-2 px-12"><FiTrash2 className="text-red-600"/> DELETE</button>
                    <button onClick={handleAccept} className="bg-[#47bb56]  font-open flex items-center justify-center font-semibold rounded-md py-2 px-12">SAVE</button>
                </Flex>
                    
                
            </div>
        </div>
    )
}


export default Items;