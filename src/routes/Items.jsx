import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axiosInstance from "./axiosInstance";
import { Table } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
const Items = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/store/order/${id}/`)
            .then(res => {
                setOrder(res.data)
            })

    }, [])

    const total = order?.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return (
        <div className="h-dvh relative flex justify-center py-6 bg-[#e6e4e4] dark:bg-black w-full">
            <Link to="/admin/reports" className="absolute left-12 top-6"><BsArrowLeft /></Link>
            <div className="bg-white relative p-3 rounded-lg h-auto dark:bg-opacity-10 shadow-xl w-auto">
                <h1 className="font-open font-bold">Order details</h1>
                <Table.Root w="full">
                    <Table.Header >
                        <Table.ColumnHeader className="dark:text-gray-900 mr-6"></Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center" className="dark:text-gray-900 "></Table.ColumnHeader>
                    </Table.Header>
                    <Table.Body  >
                        <Table.Row>
                            <Table.Cell textAlign="end" className="font-semibold bg-gray-100 dark:bg-opacity-20 font-open pr-36">Customer</Table.Cell>
                            <Table.Cell textAlign="start" className="font-open bg-gray-100 dark:bg-opacity-20 pl-36">{order?.uuid}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign="end" className="font-semibold bg-gray-100 dark:bg-opacity-20 font-open pr-36">Status</Table.Cell>
                            <Table.Cell textAlign="start" className="font-open bg-gray-100 dark:bg-opacity-20 pl-36">{order?.status}</Table.Cell>
                        </Table.Row>
                        <Table.Row className="">
                            <Table.Cell textAlign="end" className="font-semibold bg-gray-100 font-open pr-36 dark:bg-opacity-20">Products</Table.Cell>
                            <Table.Cell textAlign="start" className="font-open bg-gray-100 pl-36 dark:bg-opacity-20">{order?.items.length}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>

                <Table.Root className="bg-gray-50 dark:bg-opacity-20 my-20">
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

                <div className="flex justify-between mx-6">
                    <h1 className="font-open mr-72 font-semibold">Total</h1>
                    <h1 className="font-open font-semibold">{total}</h1>
                </div>
                
                <div className="flex justify-between my-16 mx-6">
                    <button className="bg-red-600 w-1/2 mr-2 text-gray-900 font-open font-semibold rounded-md py-2 px-3">DELETE</button>
                    <button className="bg-blue-500 w-1/2 font-open font-semibold rounded-md py-2 px-3">EDIT</button>
                </div>
            </div>
        </div>
    )
}


export default Items;