import { Table } from "@chakra-ui/react";

const Sales = () => {
    return (
        <div className="">
        <h className="text-xl font-bold pb-8"> Sales.</h>
        <div className="mr-4">
        <Table.Root rounded="md" striped variant="outline">
            <Table.Header>
                <Table.Row className="bg-slate-700" mt="5rem">
                <Table.ColumnHeader className="text-gray-100">NO.</Table.ColumnHeader>
                <Table.ColumnHeader className="text-gray-100">PRODUCT</Table.ColumnHeader>
                <Table.ColumnHeader className="text-gray-100">QUANTITY SOLD</Table.ColumnHeader>
                <Table.ColumnHeader className="text-gray-100" textalign="end">AMOUNT</Table.ColumnHeader>
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
    );
}

export default Sales