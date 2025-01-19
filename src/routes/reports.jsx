import { Table } from "@chakra-ui/react"
import { useState } from "react"
import { BsTrash2Fill } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
const Reports = () => {
    const [state, setState] = useState("sales");
    return (
        <div className="w-full bg-gray-100 h-dvh overflow-y-auto">
            <div className=" m-6 flex justify-between">
                <h1 className="font-bold text-lg">Sales report.</h1>
                <Button bg="red.100" color="red.600" rounded="lg" fontSize="sm" px="0.75rem"  fontWeight="bold">clear sales<CgTrash/></Button>
            </div>
            <div className="">
                  <div className="mx-12">
                        <Table.Root rounded="md" bg="white" striped borderColor="orange.800" variant="outline">
                            <Table.Header>
                                <Table.Row className="bg-blue-200" mt="5rem">
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
            <div className="flex justify-between m-12">
            <h1 className="font-bold text-xl">Orders report.</h1>
            <Button color="red.600" bg="red.100" px="0.75rem" fontSize="sm" fontWeight="bold"rounded="lg" >clear orders<CgTrash/></Button>
            </div>
            <div className="mx-48">
                <Table.Root variant="outline" bg="white" rounded="xl" className="mb-12">
                    <Table.Header className="bg-blue-300">
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
    )
}
export default Reports