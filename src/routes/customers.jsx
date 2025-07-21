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



const Customers = () => {
      const [users, setUsers] = useState([]);
        const [loading ,setLoading] = useState(true)
        
            useEffect(()=> {
                axiosInstance.get("/store/customers/")
                .then((response) => {
                    setUsers(response.data.results)
                    setLoading(false)
                })
            },[])
     const navigate = useNavigate()
    return (
        <div className="bg-inherit font-roboto w-full h-dvh">
                    <div className="w-full my-4 flex justify-between px-6">
                        <div className="flex flex-col">
                        <h1 className=" font-bold text-lg">system Customers</h1>
                        <p className="text-xs text-gray-500">Customers' detailed information</p>  
                        </div>
                        <div className="flex items-center">
                        <Input type="search" variant="filled" placeholder="Search a User" 
                        className=" rounded-2xl h-8 mx-6 text-gray-700 text-sm bg-white px-3 "/>
                        <Button onClick={()=>navigate("/admin/add-customer")} className="bg-yellow-400  dark:text-gray-900 font-semibold px-4 h-8">Add user</Button>
                        </div>
                    </div>
                    <div className="m-8">
                        <h1 className="font-semibold">List of Customers</h1>
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
                               {users.length>0 && users.map((user, index) => (<Table.Row key={user.id}  className=""><Table.Cell >{index + 1}</Table.Cell>
                                                      <Table.Cell>
                                                        <div className="flex  text-gray-800 dark:text-gray-200 ">
                                                           <Avatar size="xs" name={user.name}/>
                                                           <div className="flex ml-4 flex-col">
                                                            <h1 className="font-semibold  flex items-center">{user.first_name}</h1>
                                                           <div className="flex items-center"></div>
                                                           </div>
                                                        </div>
                                                      </Table.Cell>
                                                      <Table.Cell>
                                                        <div className="text-xs font-bold">{user?.phone}</div>
                                                      </Table.Cell>
                                                      <Table.Cell textAlign="end" className="underline font-semibold">
                                                        <Link to={`/admin/view/${user.uuid}`}>view customer</Link>
                                                        </Table.Cell>
                                                      </Table.Row>
                            ))}
                            </Table.Body>
                        </Table.Root>
        }
                    </div>
                </div>
    );
}

export default Customers