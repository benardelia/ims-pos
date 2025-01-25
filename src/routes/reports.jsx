import { Table, Tabs } from "@chakra-ui/react"
import { useState } from "react"
import { BsTrash2Fill } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

const Sales = () => {
    return (
        <div className="">
             <div className=" my-6 mx-12 flex justify-between">
                            <h1 className="font-semibold text-xl">Sales report.</h1>
                            <Button rounded="lg" fontSize="sm" px="0.75rem" className="text-red-500 dark:text-white bg-white dark:bg-red-500" fontWeight="bold">clear sales<CgTrash/></Button>
                        </div>
                        <div className="">
                              <div className="mx-12">
                                    <Table.Root rounded="md" interactive borderColor="orange.800" variant="outline"className="bg-white dark:bg-gray-800">
                                        <Table.Header>
                                            <Table.Row className="bg-blue-200 dark:bg-blue-950" mt="5rem">
                                            <Table.ColumnHeader className="">NO.</Table.ColumnHeader>
                                            <Table.ColumnHeader className="">PRODUCT</Table.ColumnHeader>
                                            <Table.ColumnHeader className="">QUANTITY SOLD</Table.ColumnHeader>
                                            <Table.ColumnHeader className="" textalign="center">AMOUNT</Table.ColumnHeader>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>1</Table.Cell>
                                                <Table.Cell>Milk</Table.Cell>
                                                <Table.Cell>23</Table.Cell>
                                                <Table.Cell>39000</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>2</Table.Cell>
                                                <Table.Cell>Bread</Table.Cell>
                                                <Table.Cell>12</Table.Cell>
                                                <Table.Cell>22000</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>3</Table.Cell>
                                                <Table.Cell>Bananas</Table.Cell>
                                                <Table.Cell>08</Table.Cell>
                                                <Table.Cell>36500</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>4</Table.Cell>
                                                <Table.Cell>Coffee</Table.Cell>
                                                <Table.Cell>13</Table.Cell>
                                                <Table.Cell>50000</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>5</Table.Cell>
                                                <Table.Cell>Pasta</Table.Cell>
                                                <Table.Cell>29</Table.Cell>
                                                <Table.Cell>52000</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                        <Table.Footer>
                                            <Table.Cell  colSpan="2">Total Sales:</Table.Cell>
                                            <Table.Cell  colSpan="2">199,500</Table.Cell>
                                        </Table.Footer>
                                    </Table.Root>
                                    </div>
                        </div>
        </div>
    );
  }
   const Orders = () => {
    return (
        <div className="">
              <div className="flex justify-between my-6 mx-12">
            <h1 className="font-semibold text-xl">Orders report.</h1>
            <Button className="text-red-500 dark:text-white bg-white dark:bg-red-500" px="0.75rem" fontSize="sm" fontWeight="bold"rounded="lg" >clear orders<CgTrash/></Button>
            </div>
              <div className="mx-12">
                            <Table.Root interactive variant="outline" rounded="xl" striped="gray.300" className="mb-12 bg-white dark:bg-gray-800">
                                <Table.Header className="bg-blue-200 dark:bg-blue-950">
                                    <Table.Row>
                                        <Table.ColumnHeader>ORDER ID</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center">Date & Time</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>24112322</Table.Cell>
                                        <Table.Cell textAlign="center">18 Jan 2025 22:32</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>24112322</Table.Cell>
                                        <Table.Cell textAlign="center">18 Jan 2025 22:32</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>24112322</Table.Cell>
                                        <Table.Cell textAlign="center">18 Jan 2025 22:32</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>24112322</Table.Cell>
                                        <Table.Cell textAlign="center">18 Jan 2025 22:32</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>24112322</Table.Cell>
                                        <Table.Cell textAlign="center">18 Jan 2025 22:32</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>24112322</Table.Cell>
                                        <Table.Cell textAlign="center">18 Jan 2025 22:32</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table.Root>
        </div>
        </div>
    );
   }

   const Reports = () => {
    const [view, setView] = useState("sales");
    return (
        <div className="w-full bg-gray-100 dark:bg-gray-700">
            <h1 className="my-6 text-xl font-bold mx-6">Reports</h1>
            <Tabs.Root defaultValue="Sales" w="full" mx="">
            <Tabs.List>
                <Tabs.Trigger value="Sales" asChild>
                <div onClick={() =>setView("sales") } className="text-lg font-semibold pr-4">
                 Sales
               </div>
              </Tabs.Trigger>
              <Tabs.Trigger value="Orders" asChild>
               <div onClick={() =>setView("orders") } className="text-lg font-semibold pr-4">
                 Orders
               </div>
            </Tabs.Trigger>
      </Tabs.List>
            </Tabs.Root>
            {
                view === "sales" ? <Sales/> : <Orders/>
            }
        </div>
    );
        }

export default Reports