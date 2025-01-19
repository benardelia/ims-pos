import { Input, NativeSelect, NativeSelectField, NativeSelectRoot } from "@chakra-ui/react"
import { Button } from "../components/ui/button"

const NewInv = () => {
    return (
        <div className="w-full">
            <h1 className="font-semibold text-xl m-6">Add New Product.</h1>
            <div className="border py-8 flex flex-col m-3 w-4/5 bg-gray-100 rounded-lg place-items-center">
            <div className="m-3">
                <h1 className="font-semibold text-sm text-gray-700">Product name:</h1>
                <Input placeholder="product name" px="1rem" border="2px" fontSize="sm" borderColor="gray.700" h="2.3rem" w="30rem" bg="white"/>
            </div>
            <div className="m-3">
                <h1 className="font-semibold text-sm text-gray-700">Product ID:</h1>
                <Input placeholder="product ID" fontSize="sm" px="1rem" border="2px" borderColor="gray.700" h="2.3rem" w="30rem" bg="white"/>
            </div>
            <div className="m-3">
                <h1 className="font-semibold text-sm text-gray-700">Product Category:</h1>
                <NativeSelectRoot size="md" w="30rem" fontSize="sm" >
                    <NativeSelectField bg="white" placeholder="Select Category"fontColor="black">
                        <option value="Food" className="text-black"></option>
                        <option value="Soft Drink"></option>
                        <option value="Alcohol"></option>
                    </NativeSelectField>
                </NativeSelectRoot>
            </div>
            <div className="m-3">
                <h1 className="font-semibold text-sm text-gray-700">Product Quantity:</h1>
                <Input type="number" placeholder="product quantity"  fontSize="sm" px="1rem" border="2px" borderColor="gray.700" h="2.3rem" w="30rem" bg="white"/>
            </div>
            <div className="m-3">
                <h1 className="font-semibold text-sm text-gray-700">Product descriptions:</h1>
                <Input placeholder="enter description" px="1rem" border="2px" fontSize="sm" borderColor="gray.700" h="3rem" w="30rem" bg="white"/>
            </div>
            <Button bg="green.400" px="1rem" my="1rem" py="0.75rem" fontColor="gray.100" fontWeight="bold" w="30rem">Save Product</Button>
            </div>
        </div>
    )
}
export default NewInv