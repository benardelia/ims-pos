import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axiosInstance from "./axiosInstance";
import { Flex, Table, TableScrollArea } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import { FiTrash2 } from "react-icons/fi";
import { NativeSelect, NativeSelectField, NativeSelectIndicator } from "@chakra-ui/react";
import { toaster, Toaster } from "../components/ui/toaster"
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
  Icon
 } from '@chakra-ui/react';
import { Avatar } from "../components/ui/avatar";



 
 

  const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
 };
  export default function Items () {
    const { id } = useParams();
    const [order, setOrder] = useState({
    uuid: "",
    customer: "",
    status: "",
    items: [],
    created_at: "",
    updated_at: "",
    created_by: ""
})
    const [posting, setPosting] = useState(null);
    const [customer, setCustomer] = useState(null)
    const [user, setUser] = useState(null)
    useEffect(() => {
        axiosInstance.get(`/store/order/${id}/`)
            .then(res => {
                setOrder({
                 uuid: res.data.uuid,
                 customer: res.data.customer,
                 status: res.data.status,
                 items: res.data.items,
                 created_at: res.data.created_at,
                 updated_at: res.data.updated_at,
                 created_by: res.data.created_by
                })
                axiosInstance.get(`/core/user/${res.data.created_by}`)
                .then(
                 setUser(res.data)   
                )
                axiosInstance.get(`/store/customer/${res.data.customer}`)
                .then(
                 setCustomer(res.data)   
                )
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
        <div className="min-h-screen font-roboto bg-[#f7f5f5] dark:bg-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Toaster/>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Order Details
          </h1>
          
        </div>
        {/* Order Summary Card */}
        <div className="bg-white dark:bg-opacity-20 rounded-md shadow-xl p-6 mb-8 transform
 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Order ID: {order?.uuid.slice(0, 8)}...
            </h2>
            <span
              className={`px-4 py-1 rounded-lg text-sm font-medium ${
                order?.status === 'Pending'
                  ? 'bg-red-400 text-yellow-800 dark:bg-red-400 dark:text-gray-200'
                  : 'bg-green-300 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}
            >
              {order?.status}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
           
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-400">
                Created At
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {formatDate(order?.created_at)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-400">
                Created By
              </p>
              <div className="flex items-center">
                <Avatar src={user?.image}/>
              <p className="text-sm text-gray-900 dark:text-white">
                {user?.username}
              </p>
            </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-400">
                No, of items
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {order?.items.length}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-400">
                Customer
              </p>
              <div className="flex items-center">
                <Avatar src={customer?.image}/>
              <p className="text-sm text-gray-900 dark:text-white">
                {customer?.first_name}
              </p>
            </div>
            </div>
          </div>
          {order.status === "Pending" && <button onClick={()=>setOrder({...order, status: "Completed"})} className="flex justify-self-end p-2 bg-green-100 border font-semibold text-sm border-green-800 dark:bg-slate-700 rounded-md">Accept order</button>}
        </div>
        {/* Order Items Table */}
        <div className="bg-white dark:bg-opacity-20 rounded-es-xl rounded-tr-xl shadow-md p-6 transform
 hover:scale-[1.01] transition-transform duration-300">
          <h2 className=" font-semibold text-gray-900 dark:text-white mb-4">
            Order Items
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="">
                <tr className="border-b dark: bg-yellow-300 border-gray-200 dark:border-gray-700">
                  
                  <th className="py-3 px-4 text-sm font-semibold text-gray-800">
                    Product name
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-800 text-right">
                    Quantity
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-800 text-right">
                    Price
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {order?.items.map((item) => (
                  <tr
                    key={item.uuid}
                    className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50
 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="py-3 px-4 text-sm text-black dark:text-white">
                      {item.product.name}
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-black dark:text-white">
                      {item.quantity.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-black dark:text-white">
                      {item.price.toLocaleString()}
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between p-4">
            <button onClick={handleDelete} className="p-2 text-sm font-semibold w-36 dark:bg-red-700 bg-red-400 rounded-md shadow-sm ">Decline</button>
            <button onClick={handleAccept} className="p-2 text-sm font-semibold w-36 bg-green-400 dark:bg-green-800 rounded-md shadow-sm ">Accept</button>
          </div>
        </div>
      </div>
    </div>
 
    )
}
