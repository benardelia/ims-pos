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
   
           const session = localStorage.getItem("jwt_token");
              const axiosInstance = axios.create({
                              baseURL: "http://127.0.0.1:8000/",
                              timeout: 18000,
                              headers: {
                                  Authorization : `Bearer ${session}`,
                                  "Content-Type": "application/json"
                              }
                          })
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
                         const res = await axios.post(
                           'http://127.0.0.1:8000///store/products/',
                           {name, category, description, price, stock},
                           {
                             headers: {
                               Authorization: `Bearer ${session}`,
                               'Content-Type': 'application/json'
                             },
                           }
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
                         console.log(error.message)
                     }
                  };              
             
    return (
        <Center w="100%" rounded="md" className="font-open relative bg-gray-200 dark:bg-slate-700">
          <Link to="/admin/inventory" className="absolute top-8 left-4"><RiArrowLeftLine/></Link>
                           <div className="flex flex-col space-y-8 bg-white dark:bg-slate-800 py-8 rounded-lg px-6">
             <Field.Root>
                <Field.Label>Product name:</Field.Label>
                <Input required rounded="sm" placeholder="product name" 
                value={name} onChange={(e)=>setName(e.target.value)} 
                px="1rem"
                border="2px" 
                fontSize="sm"  
                h="2.3rem" 
                w="-moz-fit-content" 
                className="bg-gray-200 dark:text-white dark:bg-gray-700" 
                />
            </Field.Root>
            <NativeSelect.Root  variant="subtle" size="sm" width="md" p="0.25rem" >
              <NativeSelect.Field placeholder="Select category"
              value={category}
              onChange={(e) => setCategory(e.currentTarget.value)}
              h="2.9rem"
              px="0.5rem"
              className="dark:bg-gray-700 bg-gray-200 dark:text-white"
              >
                {categories.map(cat=>
              <option value={cat.uuid}>{cat.name}</option>
                )}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.Root>
                <Field.Label>Product Quantity:</Field.Label>
                <Input required type="number" value={stock} onChange={(e)=>setStock(e.target.value)} 
                 placeholder="product quantity" 
                  rounded="sm" fontSize="sm" px="1rem" border="2px"
                    h="2.3rem" w="-moz-fit-content"  
                   className="bg-gray-200 dark:text-white dark:bg-gray-700"/>
            </Field.Root>
            <Field.Root>
                <Field.Label>Product descriptions:</Field.Label>
                <Input required placeholder="enter description" 
                value={description} onChange={(e)=>setDescription(e.target.value)}  
                rounded="sm" px="1.5" border="2px" fontSize="sm" 
               h="3rem" w="-moz-fit-content" 
                 className="bg-gray-200 dark:text-white dark:bg-gray-700"/>
            </Field.Root>
            <Field.Root>
                <Field.Label>Product Price:</Field.Label>
                <Input type="number" required
                 placeholder="enter price" value={price} 
                 onChange={(e)=>setPrice(e.target.value)}  rounded="sm" px="1.5" 
                 border="2px" fontSize="sm" h="2.3rem" w="-moz-fit-content"  
                 className="bg-gray-200 dark:text-white dark:bg-gray-700"/>
            </Field.Root>
             <Toaster/>
            <button onClick={handleSubmit}
             className="bg-custom dark:text-gray-800 hover:font-bold rounded-md font-semibold py-2 w-full my-3">Add Product</button>
            </div>
        </Center>
    )
}
export default NewInv