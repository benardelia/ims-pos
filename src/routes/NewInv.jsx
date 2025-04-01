import { Box, Breadcrumb, VStack, Field, Input, NativeSelect, NativeSelectField, NativeSelectRoot, Heading, Center } from "@chakra-ui/react"
import { Button } from "../components/ui/button"
import { Link } from "react-router"
import { BiArrowBack } from "react-icons/bi"
import { useState } from "react"
import { supabase } from "../hooks/supabaseClient"
import { Portal,Select, createListCollection } from "@chakra-ui/react"


const categories = createListCollection(
    {
        items: [
            { label: "food" , value: "food" },
            { label: "alcohol" , value: "alcohol" },
            { label: "kitchen" , value: "kitchen" },
            { label: "other" , value: "other"}
        ],
    }
)

const NewInv = () => {
    const [name, setName] = useState("");
    const [category,setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [stock,setStock] = useState(null);
    const [posting, setPosting] = useState(null);
    const [error, setError] = useState(null);
    const [price,setPrice] = useState(null);
    const [cost,setCost] = useState(null);

    const handleSubmit = async () => {
     setPosting(true);
     const { data, error } = await supabase.from("products").insert([
        {
            name: name, 
            description: description,
            stock: stock,
            category: category,
            price: price,
            cost: cost
        }
     ]);
     if (error) {
        console.error("Error inserting products...")
        setError(true);
        setPosting(false)
     } else {
        console.log("Data inserted successfully")
        setCategory("")
        setDescription("")
        setName("")
        setStock(null)
        setPosting(false)
        setCategory("")
        setPrice(null)
        setCost(null)

        }
    }
    return (
        <Center bg="gray.200" w="100%" rounded="md" className="font-open ">
            <VStack p="2.2rem" bg="white">
            {posting ? <p className="font-open font-semibold">posting form</p> : error && <p className="font-open text-red-400 text-sm font-bold">Error in posting</p>}
            <Field.Root>
                <Field.Label>Product name:</Field.Label>
                <Input bg="gray.200" required rounded="sm" placeholder="product name" value={name} onChange={(e)=>setName(e.target.value)} px="1rem" border="2px" fontSize="sm" borderColor="gray.700" h="2.3rem" w="md" className="bg-gray-200 dark:text-gray-50 dark:bg-gray-600" />
            </Field.Root>
            <Field.Root>
                <Select.Root
                collection={categories}
                width="md"
                required
                value={category}
                onValueChange={(e)=>setCategory(e.value)}
                >
                    <Select.HiddenSelect/>
                    <Select.Label>Select category</Select.Label>
                    <Select.Control  rounded="sm" bg="gray.200">
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select category"/>
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator/>
                        </Select.IndicatorGroup>
                    </Select.Control>
                   <Portal>
                    <Select.Positioner>
                        <Select.Content  width="30rem">
                            {
                                categories.items.map((cat)=>(
                                    <Select.Item item={cat.value} key={cat.value}>
                                        {cat.label}
                                        <Select.ItemIndicator/>
                                    </Select.Item>
                                ))
                            }
                        </Select.Content>
                    </Select.Positioner>
                   </Portal>
                </Select.Root>
            </Field.Root>
            <Field.Root>
                <Field.Label>Product Quantity:</Field.Label>
                <Input required type="number" bg="gray.200" value={stock} onChange={(e)=>setStock(e.target.value)}  placeholder="product quantity"  rounded="sm" fontSize="sm" px="1rem" border="2px" borderColor="gray.700" h="2.3rem" w="md"  className="bg-gray-200 dark:text-gray-50 dark:bg-gray-600"/>
            </Field.Root>
            <Field.Root>
                <Field.Label>Product descriptions:</Field.Label>
                <Input bg="gray.200" required placeholder="enter description" value={description} onChange={(e)=>setDescription(e.target.value)}  rounded="sm" px="1.5" border="2px" fontSize="sm" borderColor="gray.700" h="3rem" w="md"  className="bg-gray-200 dark:text-gray-50 dark:bg-gray-600"/>
            </Field.Root>
            <Field.Root>
                <Field.Label>Product Price:</Field.Label>
                <Input bg="gray.200" required placeholder="enter price" value={price} onChange={(e)=>setPrice(e.target.value)}  rounded="sm" px="1.5" border="2px" fontSize="sm" borderColor="gray.700" h="2.3rem" w="md"  className="bg-gray-200 dark:text-gray-50 dark:bg-gray-600"/>
            </Field.Root>
            <Field.Root>
                <Field.Label>Product Cost:</Field.Label>
                <Input bg="gray.200" required placeholder="enter cost" value={cost} onChange={(e)=>setCost(e.target.value)}  rounded="sm" px="1.5" border="2px" fontSize="sm" borderColor="gray.700" h="2.3rem" w="md"  className="bg-gray-200 dark:text-gray-50 dark:bg-gray-600"/>
            </Field.Root>
            <Button onClick={handleSubmit} px="1rem" mt="1rem" py="0.75rem" rounded="sm" w="md" bg="green.800">Save Product</Button>
            <Button px="1rem" mt="0.3rem" py="0.75rem" w="md" bg="orange.500"  rounded="sm">Save and add new one</Button>
            </VStack>
        </Center>
    )
}
export default NewInv