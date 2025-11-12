import { Tabs, Table, Badge, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { CgEditNoise, CgTrash } from "react-icons/cg";
import { Avatar } from "../components/ui/avatar";
import { BsFillTrashFill, BsTrashFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { FiDelete, FiEdit, FiTrash } from "react-icons/fi";
import { Input } from "@chakra-ui/react";
import { PiSpinnerLight, PiTrashFill } from "react-icons/pi";
import axios from "axios";
import axiosInstance from "./axiosInstance";

const User = ({user}) => {
    return (
        <div className="flex font-roboto relative shadow-sm items-center mx-2 my-3 bg-gray-50 dark:bg-gray-700 py-2 px-2 rounded-md">
            <Avatar name={user.name} src={user.image} size="sm"/>
            <div className="flex flex-col ml-6">
                <h1 className="font-semibold text-gray-800">{user.name}</h1>
                <p className="text-sm font-light">{user.joined}</p>
            </div>
            <div className="flex absolute right-0 ">
                <button className="size-8 bg-white justify-center place-items-center rounded-full text-blue-600"><BiEditAlt/></button>
                <button className="size-8 text-red-400 justify-center place-items-center bg-white rounded-full mx-1 font-bold"><FiTrash/></button>
            </div>
        </div>
    )
} 

   const Expense = () => {
    return (
        <div className="">
            <button className="p-4 bg-green-500 font-roboto font-bold
            ">Add Expense</button>
        </div>
    )
   }

   

const Management = () => {
    const [users, setUsers] = useState([]);
    const [loading ,setLoading] = useState(true)
    
        useEffect(()=> {
            axiosInstance.get("/core/users/")
            .then((response) => {
                setUsers(response.data)
                setLoading(false)
            })
            
        },[])
 
        const navigate = useNavigate();
    return (
        <div className="bg-inherit font-roboto w-full h-dvh">
            <div className="w-full my-4 flex justify-between px-6">
                <div className="flex flex-col">
                <h1 className=" font-bold text-lg">User Management</h1>
                <p className="text-xs text-gray-500">Users' detailed information</p>  
                </div>
                <div className="flex items-center">
                <Input type="search" variant="filled" placeholder="Search a User" 
                className=" rounded-2xl h-8 mx-6 text-gray-700 text-sm bg-white px-3 "/>
                <Button onClick={()=>navigate("/admins/add-user")} className="bg-yellow-400  dark:text-gray-900 font-semibold px-4 h-8">Add user</Button>
                </div>
            </div>
            <div className="m-8">
                <h1 className="font-semibold">List of Users</h1>
                {loading ? <PiSpinnerLight className="animate-spin size-7 flex place-self-center"/> :
                
                
                <Table.Root className=" bg-white rounded-lg dark:bg-opacity-10 text-gray-800 dark:text-gray-200" rounded="xl" interactive >
                    <Table.Header >
                      <Table.Row className="bg-[#f7d518] dark:bg-[#f7d518] dark:text-gray-900">
                      <Table.ColumnHeader className="dark:text-gray-900 font-bold w-6">NO.</Table.ColumnHeader>
                        <Table.ColumnHeader className="dark:text-gray-900 font-bold">Name</Table.ColumnHeader>
                        <Table.ColumnHeader className="dark:text-gray-900 font-bold">User Roles</Table.ColumnHeader>
                        <Table.ColumnHeader pr="3rem" textAlign="end" className="dark:text-gray-900 font-bold"> Actions</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {users?.map((user, index) => (<Table.Row key={user.id}  className=""><Table.Cell >{index + 1}</Table.Cell>
                                              <Table.Cell>
                                                <div className="flex  text-gray-800 dark:text-gray-200 ">
                                                   <Avatar size="xs" src={`https://grandypos.duckdns.org${user.image}`} name={user.name}/>
                                                   <div className="flex ml-4 flex-col">
                                                    <h1 className="font-semibold  flex items-center">{user.username}</h1>
                                                   <div className="flex items-center"><p className="text-sm text-gray-500 dark:text-gray-100">{user.email}</p></div>
                                                   </div>
                                                </div>
                                              </Table.Cell>
                                              <Table.Cell>
                                                <div className="text-xs font-bold">{user?.user_type}</div>
                                              </Table.Cell>
                                              <Table.Cell textAlign="end" className="flex justify-end">
                                                <button onClick={()=>navigate(`/admin/edit-user/${user?.id}`)} className="size-8 flex place-items-center justify-center rounded-full bg-gray-200 dark:bg-opacity-15">
                                                <FiEdit/>
                                                </button></Table.Cell>
                                                
                                              </Table.Row>
                    ))}
                    </Table.Body>
                </Table.Root>
}
            </div>
        </div>
    )
}
export default Management