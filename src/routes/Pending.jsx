import { Tabs, Table,TableScrollArea, Badge, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { CgEditNoise, CgTrash } from "react-icons/cg";
import { Avatar } from "../components/ui/avatar";
import { BsFillTrashFill, BsTrashFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { FiAlertTriangle, FiDelete, FiEdit, FiTrash } from "react-icons/fi";
import { Input } from "@chakra-ui/react";
import { PiSpinnerLight, PiTrashFill } from "react-icons/pi";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { BsArrowLeft } from "react-icons/bs";
const Pending = () => {
     const [pending, setPending] = useState(null)
     useEffect(()=> {
      axiosInstance.get("/store/orders/?status=pending")
      .then(
        res=> {
            setPending(res.data.results)
        }
      )
      .catch( error=> {
        setPending(null)
      })
     },[])
     const navigate = useNavigate()
    return (
        <div className="p-4 flex place-items-center justify-center">
            <Link to="/admin/reports" className="absolute left-12 top-6"><BsArrowLeft /></Link>
            {
            pending?.length>0 ?
           <TableScrollArea h="2/3" w="full">
                                       <Table.Root interactive shadow="md" variant="outline" className=" bg-white h-2/3 dark:bg-opacity-10">
                                           <Table.Header className="bg-[#f7d518] sticky z-50 top-0 text-sm">
                                               <Table.Row>
                                                   <Table.ColumnHeader className="dark:text-gray-900">No.</Table.ColumnHeader>
                                                   <Table.ColumnHeader className="dark:text-gray-900">Status</Table.ColumnHeader>
                                                   <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">no. of items</Table.ColumnHeader>
                                                   <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">time ordered</Table.ColumnHeader>
                                                   <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">action</Table.ColumnHeader>
                                               </Table.Row>
                                           </Table.Header>
                                           <Table.Body>
                                               {pending?.map((order, i) => 
                                               <Table.Row key={order.uuid}>
                                                   <Table.Cell className="text-xs">{i + 1}</Table.Cell>
                                                   <Table.Cell className="text-xs ">{order.status}</Table.Cell>
                                                   <Table.Cell textAlign="center" className="text-xs">{order.items.length}</Table.Cell>
                                                   <Table.Cell textAlign="center" className="text-xs ">{order.created_at.slice(0,20)}</Table.Cell>
                                                   <Table.Cell textAlign="center"><button onClick={()=>navigate(`/orders/${order.uuid}`)} className="underline text-xs">see items</button></Table.Cell>
                                               </Table.Row>
                                                )}
                                           </Table.Body>
                                       </Table.Root>
                                       </TableScrollArea>
: <Empty/>
}
        </div>
    )
}

   const Empty = () => {
    return (
        <div className="flex flex-col  mt-36 border border-black rounded-2xl p-24 justify-center place-items-center">
            <FiAlertTriangle className="text-8xl mb-16 text-red-500"/>
            <h1 className="font-roboto font-light text-3xl">Empty pending orders</h1>
            <Link to="/admin/reports" className=" mt-6 underline font-roboto">back</Link>
        </div>
    )
   }

export default Pending