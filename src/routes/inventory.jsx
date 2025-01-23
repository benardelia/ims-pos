import { Button, Table } from "@chakra-ui/react"
import { CgAdd } from "react-icons/cg"
import { GrAdd } from "react-icons/gr"
import { useNavigate} from "react-router"


const Inventory = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-gray-100 dark:bg-gray-700">
            <div className="mx-6">
            <div classname="flex justify-between  mx-12">
            <h1 className="my-6 font-bold text-2xl">Inventory.</h1>
            </div>
            <div classname="flex">
                <h1 className="font-bold text-lg">List of Medicines.</h1>
                <Button 
                bg="red.500"
                my="1.25rem"
                px="1rem"
                color="white"
                fontSize="sm"
                fontWeight="bold"
                onClick={()=> navigate("/admin/newInv")}
                >
                    <GrAdd/>Add product
                </Button>
                </div>
            </div>
            <div className="mx-8">
                <Table.Root rounded="lg"className="bg-white">
                    <Table.Header>
                        <Table.Row className="bg-blue-300 dark:bg-blue-950">
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

                    </Table.Body>
                </Table.Root>

            </div>
        </div>
    )
}
export default Inventory