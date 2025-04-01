import { Table } from "@chakra-ui/react";
import SalesChart from "./SalesChart";

const Sales = () => {
    return (
        <div className="">
        <h className="text-xl font-bold pb-8"> Sales.</h>
        <div className="mx-4">
        <Table.Root rounded="lg" interactive variant="outline"className="bg-white font-semibold font-open dark:bg-gray-800 mr-16" >
            <Table.Header>
                <Table.Row className="bg-lime-300" mt="5rem">
                <Table.ColumnHeader className="">NO.</Table.ColumnHeader>
                <Table.ColumnHeader className="">PRODUCT</Table.ColumnHeader>
                <Table.ColumnHeader className="">QUANTITY SOLD</Table.ColumnHeader>
                <Table.ColumnHeader className="" textalign="end">AMOUNT</Table.ColumnHeader>
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
                <Table.Cell  colSpan="2">- - -</Table.Cell>
            </Table.Footer>
        </Table.Root>
        </div>
        </div>
    );
}

export default Sales