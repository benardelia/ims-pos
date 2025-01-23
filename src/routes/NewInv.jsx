import { Breadcrumb, Input, NativeSelect, NativeSelectField, NativeSelectRoot } from "@chakra-ui/react"
import { Button } from "../components/ui/button"
import { Link } from "react-router"
import { BiArrowBack } from "react-icons/bi"
import { useState } from "react"
const NewInv = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState(null);
    const [category,setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [stock,setStock] = useState(null);

    const handleSubmit = () =>
         {
         
    }
    return (
        <div className="w-full bg-white dark:bg-gray-600">
            <form on onSubmit={handleSubmit}>
                <div className="flex items-center my-6">
             <Link to="/admin/inventory" className="mr-12 ml-4 flex items-center"><BiArrowBack/>Back</Link>
            <h1 className="font-semibold text-xl">Add New Product.</h1>
            </div>
            <div className="shadow-md py-4 flex flex-col justify-self-center place-self-center w-4/5 bg-gray-100 rounded-lg dark:bg-gray-800 place-items-center">
            <div className="m-3">
                <h1 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Product name:</h1>
                <Input placeholder="product name" value={name} onChange={(e)=>setName(e.target.value)} px="1rem" border="2px" fontSize="sm" borderColor="gray.700" h="2.3rem" w="30rem" className="bg-white dark:text-gray-50 dark:bg-gray-600" />
            </div>
            <div className="m-3">
                <h1 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Product ID:</h1>
                <Input type="number" placeholder="product ID"value={id} onChange={(e)=>setId(e.target.value)}  fontSize="sm" px="1rem" border="2px" borderColor="gray.700" h="2.3rem" w="30rem"  className="bg-white dark:text-gray-50 dark:bg-gray-600"/>
            </div>
            <div className="m-3">
                <h1 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Product Category:</h1>
                <NativeSelectRoot size="md" w="30rem" fontSize="sm"  className="bg-white dark:text-gray-50 dark:bg-gray-600">
                    <NativeSelectField placeholder="Select Category"fontColor="black" className="bg-white dark:text-gray-50 dark:bg-gray-600">
                        <option value="Food" className="text-black dark:text-gray-50">Food</option>
                        <option value="Soft Drink"className="text-black dark:text-gray-50">Soft Drink</option>
                        <option value="Alcohol"className="text-black dark:text-gray-50">Alcohol</option>
                    </NativeSelectField>
                </NativeSelectRoot>
            </div>
            <div className="m-3">
                <h1 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Product Quantity:</h1>
                <Input type="number" value={stock} onChange={(e)=>setStock(e.target.value)}  placeholder="product quantity"  fontSize="sm" px="1rem" border="2px" borderColor="gray.700" h="2.3rem" w="30rem"  className="bg-white dark:text-gray-50 dark:bg-gray-600"/>
            </div>
            <div className="m-3">
                <h1 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Product descriptions:</h1>
                <Input placeholder="enter description" value={description} onChange={(e)=>setDescription(e.target.value)}  px="1.5" border="2px" fontSize="sm" borderColor="gray.700" h="3rem" w="30rem"  className="bg-white dark:text-gray-50 dark:bg-gray-600"/>
            </div>
            <Button px="1rem" mt="1rem" py="0.75rem"  w="30rem" className="font-semibold hover:font-bold text-gray-900 dark:text-gray-50 bg-green-500 dark:bg-green-700">Save Product</Button>
            <Button px="1rem" mt="0.3rem" py="0.75rem" w="30rem"className="font-semibold hover:font-bold text-gray-900 dark:text-gray-50 bg-yellow-400 dark:bg-yellow-600">Save and add new one</Button>
            </div>
            </form>
        </div>
    )
}
export default NewInv