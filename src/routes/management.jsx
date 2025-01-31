import { Tabs, Table, Badge, Center } from "@chakra-ui/react";
import { useState } from "react";
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




const users = [
    {
        id: 0,
        name: "Goodluck john",
        joined: "12th Dec 2023",
        role: "keeper"
    },
    {
        id: 1,
        name: "Ashura Hajj",
         role: "keeper",
        joined: "19th Jan 2024"
    },
    {
        id: 2,
         role: "admin",
        name: "Masuke Junior",
        joined: "3rd Aug 2022"
    }
]

const User = ({user}) => {
    return (
        <div className="flex relative shadow-sm items-center mx-2 my-3 bg-gray-50 py-2 px-2 rounded-md">
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


const Management = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-700 w-full h-dvh">
            <div className="w-full my-4 flex justify-between px-6">
                <div className="flex flex-col">
                <h1 className=" font-bold text-lg">User Management</h1>
                <p className="text-xs text-gray-500">Users' detailed information</p>  
                </div>
                <div className="flex items-center">
                <Input type="search" variant="filled" placeholder="Search a User" 
                className=" rounded-2xl h-8 mx-6 text-gray-700 text-sm bg-white px-3 "/>
                <Button className="bg-yellow-400 font-semibold px-4 h-8">Add user</Button>
                </div>
            </div>

            <div className="m-12">
                <h1 className="font-semibold">List of Users</h1>
                <Table.Root variant="outline" shadow="lg"  text-gray-800 dark:text-gray-200 rounded="xl" interactive >
                    <Table.Header >
                      <Table.Row className="bg-blue-200 dark:bg-blue-800">
                      <Table.ColumnHeader className="w-6">NO.</Table.ColumnHeader>
                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                        <Table.ColumnHeader>User Roles</Table.ColumnHeader>
                        <Table.ColumnHeader pr="3rem" textAlign="end">Actions</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body className="bg-white dark:bg-gray-800">
                       { users.map((user, index) => (<Table.Row key={user.id}><Table.Cell>{index + 1}</Table.Cell>
                                              <Table.Cell>
                                                <div className="flex  text-gray-800 dark:text-gray-200 ">
                                                   <Avatar size="xs" name={user.name}/>
                                                   <div className="flex ml-4 flex-col">
                                                    <h1 className="font-semibold  flex items-center">{user.name}</h1>
                                                   <div className="flex items-center"><p className="font-semibold">since:</p><p className="text-xs text-gray-500">{user.joined}</p></div>
                                                   </div>
                                                </div>
                                              </Table.Cell>
                                              <Table.Cell>
                                                <Badge h="1rem"  bg={ user.role ==="admin" ? "green.400" : "yellow.400"}
                                                rounded="full"
                                                fontSize="xs"
                                                fontWeight="medium" 
                                                p="8px" >{user.role}</Badge>
                                              </Table.Cell>
                                              <Table.Cell textAlign="end"><Button size="xs" bg="gray.200" rounded="full">
                                                <FiEdit/>
                                                </Button><Button size="xs" fontSize="xs" bg="red.600" mx="1rem" p="0.5rem" fontWeight="black" rounded="full" color="white">
                                                    <FiTrash/></Button> </Table.Cell>
                                                
                                              </Table.Row>
                    ))}
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
    )
}
export default Management