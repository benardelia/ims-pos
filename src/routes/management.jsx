import { Tabs, Table, Badge, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { CgEditNoise, CgTrash } from "react-icons/cg";
import { Avatar } from "../components/ui/avatar";
import { BsFillTrashFill, BsTrashFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { FiDelete, FiEdit, FiTrash } from "react-icons/fi";
import { Input } from "@chakra-ui/react";
import { PiTrashFill } from "react-icons/pi";
import axios from "axios";

const User = ({user}) => {
    return (
        <div className="flex font-open relative shadow-sm items-center mx-2 my-3 bg-gray-50 dark:bg-gray-700 py-2 px-2 rounded-md">
            <Avatar name={user.name} size="sm"/>
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
            <button className="p-4 bg-green-500 font-open font-bold
            ">Add Expense</button>
        </div>
    )
   }

   

const Management = () => {
    const [users, setUsers] = useState([]);
    const [loading ,setLoading] = useState(true)
    const session = localStorage.getItem("jwt_token");
    const axiosInstance = axios.create({
                    baseURL: "http://127.0.0.1:8000/",
                    timeout: 9000,
                    headers: {
                        Authorization : `Bearer ${session}`,
                    }
                })
        useEffect(()=> {
            axiosInstance.get("/auth/users/")
            .then((response) => {
                setUsers(response.data.results)
                setLoading(false)
            })

        },[])

    return (
        <div className="bg-gray-100 font-open dark:bg-slate-700 w-full h-dvh">
            <div className="w-full my-4 flex justify-between px-6">
                <div className="flex flex-col">
                <h1 className=" font-bold text-lg">User Management</h1>
                <p className="text-xs text-gray-500">Users' detailed information</p>  
                </div>
                <div className="flex items-center">
                <Input type="search" variant="filled" placeholder="Search a User" 
                className=" rounded-2xl h-8 mx-6 text-gray-700 text-sm bg-white px-3 "/>
                <Button className="bg-yellow-400  dark:text-gray-900 font-semibold px-4 h-8">Add user</Button>
                </div>
            </div>

            <div className="m-8">
                <h1 className="font-semibold">List of Users</h1>
                
                <Table.Root className=" bg-white rounded-lg dark:bg-gray-500text-gray-800 dark:text-gray-200" rounded="xl" interactive >
                    <Table.Header >
                      <Table.Row className="bg-custom dark:bg-custom dark:text-gray-900">
                      <Table.ColumnHeader className="dark:text-gray-900 font-bold w-6">NO.</Table.ColumnHeader>
                        <Table.ColumnHeader className="dark:text-gray-900 font-bold">Name</Table.ColumnHeader>
                        <Table.ColumnHeader className="dark:text-gray-900 font-bold">User Roles</Table.ColumnHeader>
                        <Table.ColumnHeader pr="3rem" textAlign="end" className="dark:text-gray-900 font-bold"> Actions</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                       {users.length>0 && users.map((user, index) => (<Table.Row key={user.id}  className="bg-white dark:bg-gray-800"><Table.Cell >{index + 1}</Table.Cell>
                                              <Table.Cell>
                                                <div className="flex  text-gray-800 dark:text-gray-200 ">
                                                   <Avatar size="xs" name={user.name}/>
                                                   <div className="flex ml-4 flex-col">
                                                    <h1 className="font-semibold  flex items-center">{user.username}</h1>
                                                   <div className="flex items-center"><p className="text-sm text-gray-500 dark:text-gray-100">{user.email}</p></div>
                                                   </div>
                                                </div>
                                              </Table.Cell>
                                              <Table.Cell>
                                                <div className="text-xs font-bold">{user.role}</div>
                                              </Table.Cell>
                                              <Table.Cell textAlign="end" className="flex justify-end"><button  className="size-8 flex place-items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                                <FiEdit/>
                                                </button><button className="size-8 flex place-items-center mx-4 justify-center rounded-full bg-red-400 dark:bg-red-700">
                                                    <FiTrash/></button> </Table.Cell>
                                                
                                              </Table.Row>
                    ))}
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
    )
}
export default Management