import { Table, TableColumnHeader, TableHeader } from "@chakra-ui/react";


const products = [
    {
    id: 1,
    name: "Milk",
    description: "1-liter carton of fresh whole milk.",
    price: 1200,
    qStock: 100,
    },
    {
    id: 2,
    name: "Eggs",
    description: "12-pack of organic eggs.",
    price: 12000,
    qStock: 50,
    },
    {
    id: 3,
    name: "Bread",
    description: "Freshly baked whole grain bread.",
    price: 1000,
    qStock: 75,
    },
    {
    id: 4,
    name: "Butter",
    description: "250g block of unsalted butter.",
    price: 2500,
    qStock: 60,
    },
    {
    id: 5,
    name: "Cheese",
    description: "500g pack of shredded cheddar cheese.",
    price: 4500,
    qStock: 40,
    },
    {
    id: 6,
    name: "Apples",
    description: "1kg of fresh red apples.",
    price: 1000,
    qStock: 80,
    },
    {
    id: 7,
    name: "Bananas",
    description: "1kg of ripe bananas.",
    price: 1200,
    qStock: 90,
    },
    {
    id: 8,
    name: "Potatoes",
    description: "2kg bag of white potatoes.",
    price: 3000,
    qStock: 70,
    },
    {
    id: 9,
    name: "Rice",
    description: "1kg pack of basmati rice.",
    price: 2800,
    qStock: 65,
    },
    {
    id: 10,
    name: "Pasta",
    description: "500g pack of penne pasta.",
    price: 1500,
    qStock: 85,
    },
    {
    id: 11,
    name: "Tomatoes",
    description: "1kg of fresh tomatoes.",
    price: 2400,
    qStock: 50,
    },
    {
    id: 12,
    name: "Onions",
    description: "1kg of yellow onions.",
    price: 1800,
    qStock: 60,
    },
    {
    id: 13,
    name: "Cooking Oil",
    description: "1-liter bottle of vegetable oil.",
    price: 5000,
    qStock: 45,
    },
    {
    id: 14,
    name: "Sugar",
    description: "1kg pack of white sugar.",
    price: 2300,
    qStock: 100,
    },
    {
    id: 15,
    name: "Salt",
    description: "1kg pack of iodized table salt.",
    price: 500,
    qStock: 110,
    },
    {
    id: 16,
    name: "Cooking Oil",
    description: "1-liter bottle of vegetable oil.",
    price: 5000,
    qStock: 45,
    },
    {
    id: 17,
    name: "Sugar",
    description: "1kg pack of white sugar.",
    price: 2300,
    qStock: 100,
    },
    {
    id: 18,
    name: "Salt",
    description: "1kg pack of iodized table salt.",
    price: 500,
    qStock: 110,
    },
   ];


const Products = () => {
    return (
        <div className="mx-4">
        <h1 className="font-bold text-xl my-4">List of Products   ({products.length})</h1>
        <div className="mr-12">
        <Table.ScrollArea>
        <Table.Root size="lg" showColumnBorder striped rounded="md" variant="outline">
            <Table.Header className="bg-slate-600 sticky top-0">
                <Table.Row>
                    <Table.ColumnHeader className="text-gray-100">ID</Table.ColumnHeader>
                    <Table.ColumnHeader className="text-gray-100">PRODUCT</Table.ColumnHeader>
                    <Table.ColumnHeader className="text-gray-100" textAlign="center">Q.IN STOCK</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end" className="text-gray-100">PRICE</Table.ColumnHeader>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        products.map((product) => (
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.id}</Table.Cell>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell  textAlign="center">{product.qStock}</Table.Cell>
                                <Table.Cell textAlign="end">{product.price}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>


        </Table.Root>
        </Table.ScrollArea>
        </div>
        </div>
    );
}

export default Products