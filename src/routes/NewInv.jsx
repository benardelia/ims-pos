import { Box, Breadcrumb, VStack, Field, Input, NativeSelect, NativeSelectField, NativeSelectRoot, Heading, Center } from "@chakra-ui/react"
import { Button } from "../components/ui/button"
import { Link } from "react-router"
import { BiArrowBack } from "react-icons/bi"
import { useState, useEffect } from "react"
import { supabase } from "../hooks/supabaseClient"
import { Portal,Select, createListCollection } from "@chakra-ui/react"
import axios from "axios"
import { RiArrowLeftLine } from "react-icons/ri"
import { toaster, Toaster } from "../components/ui/toaster"
import axiosInstance from "./axiosInstance"


const NewInv = () => {
    const [name, setName] = useState("");
    const [category,setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [stock,setStock] = useState(null);
    const [posting, setPosting] = useState(null);
    const [error, setError] = useState(null);
    const [price,setPrice] = useState(null);
    const [cost,setCost] = useState(null);
    const [categories,setCategories] = useState([]);
   
                  useEffect(()=> {
              axiosInstance.get("/store/categories/")
             .then(res=> {
                 setCategories(res.data.results)
                 console.log(res.data)
             })
                  },[])
          const handleSubmit = async (e) => {
                     e.preventDefault();
                     setPosting(true)
                     
                     try {
                         const res = await axiosInstance.post(
                           '/store/products/',
                           {name, category, description, price, stock},
                         );
                        toaster.create({
                                  title: "product added successfully!",
                                  type: "success",
                                  duration: 3000
                                })
                         setPosting(null)
                         setName("")
                         setCategory("")
                        setPrice("")
                        setStock("")
                        setDescription("")
                
                        }
                          catch (error) {
                         console.log(error)
                         toaster.create({
                          title: error.message,
                          type: "error",
                          duration: 5000
                        })
                     }
                  };              
             
    return (
        <Center w="100%" rounded="md" className="font-roboto h-dvh relative bg-[#e0dfdf] dark:bg-black">
          <Link to="/admin/inventory" className="absolute top-8 left-4"><RiArrowLeftLine/></Link>
            <div className="flex flex-col space-y-8 bg-white dark:bg-opacity-20 border-b border-black dark:border-gray-200 py-8 rounded-xl shadow-lg px-6">
             <Field.Root>
                <Field.Label fontSize="xs">Product name:</Field.Label>
                <Input required  placeholder="product name" 
                value={name} onChange={(e)=>setName(e.target.value)} 
                px="1rem"
                fontSize="sm"  
                h="2.3rem" 
                variant="flushed"
                w="-moz-fit-content" 
                className="bg-[#f0ebeb] border-b border-black dark:border-gray-200 dark:text-white dark:bg-opacity-10" 
                />
            </Field.Root>
            <NativeSelect.Root  variant="flushed" size="sm" width="md" p="0.25rem" >
              <NativeSelect.Field placeholder="Select category"
              value={category}
              onChange={(e) => setCategory(e.currentTarget.value)}
              h="2.9rem"
              px="0.5rem"
              className="dark:bg-opacity-10 border-b border-black dark:border-gray-200 bg-[#f0ebeb] dark:text-white"
              >
                {categories.map(cat=>
              <option value={cat.uuid} className="dark:bg-[#363636]">{cat.name}</option>
                )}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.Root>
                <Field.Label fontSize="xs">Product Quantity:</Field.Label>
                <Input required type="number" variant="flushed" value={stock} onChange={(e)=>setStock(e.target.value)} 
                 placeholder="product quantity" 
                fontSize="sm" px="1rem"
                    h="2.3rem" w="-moz-fit-content"  
                   className="bg-[#f0ebeb] border-b border-black dark:border-gray-200 dark:text-white dark:bg-opacity-10"/>
            </Field.Root>
            <Field.Root>
                <Field.Label fontSize="xs">Product descriptions:</Field.Label>
                <Input required placeholder="enter description" 
                value={description} onChange={(e)=>setDescription(e.target.value)}  
                 px="1.5" variant="flushed" fontSize="sm" 
               h="3rem" w="-moz-fit-content" 
                 className="bg-[#f0ebeb] border-b-2 border-black dark:border-gray-200 dark:text-white dark:bg-opacity-10"/>
            </Field.Root>
            <Field.Root>
                <Field.Label fontSize="xs">Product Price:</Field.Label>
                <Input type="number" required variant="flushed"
                 placeholder="enter price" value={price} 
                 onChange={(e)=>setPrice(e.target.value)} px="1.5" 
                 border="2px" fontSize="sm" h="2.3rem" w="-moz-fit-content"  
                 className="bg-[#e6e4e4] border-b border-black dark:border-gray-200 dark:text-white dark:bg-opacity-10"/>
            </Field.Root>
             <Toaster/>
            <button onClick={handleSubmit}
             className="bg-[#f7d518] dark:text-gray-800 hover:font-bold rounded-md font-semibold py-2 w-full my-3">Add Product</button>
            </div>
        </Center>
    )
}
export default NewInv