import { Button, Table, Input } from "@chakra-ui/react"
import { CgAdd } from "react-icons/cg"
import { GrAdd } from "react-icons/gr"
import { Link, useNavigate} from "react-router"
import { Tabs } from "@chakra-ui/react"

const products = [
    {
        id: 0,
        name: "azam juice",
        stock: 12,
        category: "soft drink"

    },
    {
        id: 1,
        name: "blueband",
        stock: 12,
        category: "food"

    },
    {
        id: 2,
        name: "steel wool",
        stock: 12,
        category: "appliances"

    },
    {
        id: 3,
        name: "rice",
        stock: 20,
        category: "food"

    },
    {
        id: 4,
        name: "halo 1000 voucher",
        stock: 100,
        category: "mobile"

    },
    {
        id: 5,
        name: "candy",
        stock: 15,
        category: "food"

    },
    {
        id: 6,
        name: " 5kg maize flour",
        stock: 20,
        category: "food"

    },
    {
        id: 7,
        name: "Vim",
        stock: 12,
        category: "cleaning"

    },
    {
        id: 8,
        name: "clean wash",
        stock: 12,
        category: "soap"

    },
    {
        id: 9,
        name: "magadi",
        stock: 12,
        category: "soap"

    },
]

const Inventory = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-dvh overflow-y-auto bg-gray-100 dark:bg-gray-700">
               <div className="w-full my-4 flex justify-between px-6">
                            <div className="flex flex-col">
                            <h1 className=" font-bold text-lg">User Management</h1>
                            <p className="text-xs text-gray-500">Users' detailed information</p>  
                            </div>
                            <div className="flex items-center">
                            <Input type="search" variant="filled" placeholder="search a product" 
                            className=" rounded-2xl h-8 mx-6 text-gray-700 text-sm bg-white px-3 "/>
                            <Button  onClick={()=> navigate("/admin/newInv")} className="bg-red-400 font-semibold px-4 h-8"><GrAdd/>Add product</Button>
                            </div>
                        </div>
            <div className="mx-6">
            <div classname="flex justify-between items-center">
            <h1 className="my-6 font-bold text-xl">Inventory.</h1>
            </div>
            
                <h1 className="font-bold text-lg">List of Products.</h1>
            </div>
            <div className="mx-8 mb-24">
                <Table.Root shadow="lg" variant="outline" interactive rounded="xl"className="bg-white dark:bg-gray-800">
                    <Table.Header>
                        <Table.Row className="bg-blue-200 rounded-t-lg dark:bg-blue-950">
                            <Table.ColumnHeader>
                                Product Name
                            </Table.ColumnHeader>
                            <Table.ColumnHeader>
                                Product Id
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    Category
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>
                                   Qty in stock
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>action</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            products.map((product)=> (<Table.Row>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell alignItems="center">{product.id}</Table.Cell>
                                <Table.Cell>{product.category}</Table.Cell>
                                <Table.Cell>{product.stock}</Table.Cell>
                                <Table.Cell><Link className="underline text-sm">Go to product</Link> </Table.Cell>
                            </Table.Row>))
                        }
                    </Table.Body>
                </Table.Root>

            </div>
        </div>
    )
}
export default Inventory