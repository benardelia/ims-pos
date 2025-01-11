import { useEffect,useState } from "react";

import { Table, TableColumnHeader, TableHeader } from "@chakra-ui/react";
import { fetchProducts } from "../api";

const Products = () => {
      const [products, setProducts] = useState([]);

      useEffect(()=> {
        const getData = async () => {
            try {
                const data = await sfetchProducts();

                setProducts(data);
            } catch (error) {
                console.error("failed to fetch products");
            }
        };
        getData();
      }, []);
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
                            <Table.Row key={product.name}>
                                <Table.Cell>{product.id}</Table.Cell>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell  textAlign="center">{product.stock}</Table.Cell>
                                <Table.Cell textAlign="end">{product.price}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>


        </Table.Root>
        </Table.ScrollArea>
        </div>
        <p>{JSON.stringify(products, null, 2)}</p>
        </div>
    );
}

export default Products