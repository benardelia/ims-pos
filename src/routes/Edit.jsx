import { useState,useEffect, useRef } from "react"
import { Editable, IconButton} from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
import { Link, useParams } from "react-router"
import { BiArrowToLeft, BiCategoryAlt, BiDollar, BiLeftArrow } from "react-icons/bi"
import { RiArrowLeftLine, RiStockFill } from "react-icons/ri"
 import axios from "axios"
import { Input } from "@chakra-ui/react"
import { toaster, Toaster } from "../components/ui/toaster"
import axiosInstance from "./axiosInstance"
import { CgNametag } from "react-icons/cg"
import { AiFillProduct, AiOutlineStock } from "react-icons/ai"
import { MdCategory, MdDescription, MdOutlineInventory2, MdProductionQuantityLimits } from "react-icons/md"
import { PiListNumbers } from "react-icons/pi"
import { GiPriceTag } from "react-icons/gi"

const Edit = () => {
      const {id} = useParams();
      const [products, setProducts] = useState(null)
           const [loading, setLoading] = useState(true);
      const [description, setDescription] = useState("350 mls");
      const [stock,setStock] = useState("50");
      const [price,setPrice] = useState("600");
      const [product,setProduct] = useState(null)
      const inputRef = useRef()
      
          useEffect(()=> {
    axiosInstance.get(`/store/products/${id}`)
      .then(res=> {
         setProduct({
          uuid: res.data.uuid,
          name: res.data.name,
          category: res.data.category,
          description: res.data.description,
          price: res.data.price,
          stock: res.data.stock
         })
                 console.log(res.data)
                 setLoading(false);
             })
            },[id])
 
      const handleChange = (e) => {
        setProduct({
          ...product, [e.target.name] : e.target.value
        });
      }
      const handlePut = async(e) => {
        e.preventDefault()
        console.log(product)
        try {
        const res = await axiosInstance.put(`/store/products/${product.uuid}/`,product);

        toaster.create({
          title: "product updated successfully!",
          description: res.status,
          type: "success",
          duration: 3000
        })
      } catch (error) {
  
        console.log(error.message)
        toaster.create({
          title: "fields cannot be empty",
          type: "error",
          duration: 5000
        })
      }
    }

  return (
    <div className="h-dvh font-roboto flex justify-center relative bg-[#dddbdb] dark:bg-black first-line: w-full">
      <Link to="/admin/inventory" className="absolute top-8 left-8"><RiArrowLeftLine/></Link>
      <div className="rounded-xl justify-center h-auto my-6 bg-white dark:bg-opacity-20 flex-col flex px-8 w-auto">
      <h1 className="font-bold font-roboto text-lg m-2">Edit Product</h1>
      <form onSubmit={handlePut} className="w-full flex flex-col place-items-center space-y-12 ">
      <div className="flex items-center w-full">
      <AiFillProduct/>
         <Input name="name" value={product?.name} w="28rem" onChange={handleChange}  className="bg-[#f0ebeb]   text-sm h-10 px-2 rounded-md dark:bg-opacity-10"/>  
       </div>
         <div className="flex items-center w-full">
        <MdDescription/>
         <Input name="description" value={product?.description} onChange={handleChange} className="bg-[#f0ebeb]   text-sm h-10 px-2 rounded-md dark:bg-opacity-10"/> 
         </div>
         <div className="flex items-center w-full">
        <MdCategory/>
         <Input name="category" value={product?.category} className="bg-[#f0ebeb]   text-sm h-10 px-2 rounded-md dark:bg-opacity-10"/> 
         </div>
         <div className="flex items-center w-full">
         <MdOutlineInventory2/>
         <Input name="stock" value={product?.stock} onChange={handleChange}  className="bg-[#f0ebeb]   text-sm h-10 px-2 rounded-md dark:bg-opacity-10"/> 
         </div>
         <div className="flex items-center w-full">
         <BiDollar/>
         <Input name="price" value={product?.price} onChange={handleChange}  className="bg-[#f0ebeb]   text-sm h-10 px-2 rounded-md dark:bg-opacity-10"/>   
         </div>
         <Toaster/>
         <button type="submit" className="bg-custom w-full py-2 md:py-2 mt-16 mb-8 shadow-md dark:text-gray-900 rounded-md font-roboto font-bold">UPDATE PRODUCT</button>
         </form>
      </div>
    </div>
    
  )
  
}
export default Edit