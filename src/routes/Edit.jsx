import { useState,useEffect, useRef } from "react"
import { Editable, IconButton} from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
import { Link, useParams } from "react-router"
import { BiArrowToLeft, BiArrowToRight, BiCategoryAlt, BiDollar, BiLeftArrow, BiRightArrow } from "react-icons/bi"
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
import { BsArrowRight } from "react-icons/bs"

   const Edit = () => {
      const {id} = useParams();
      const [products, setProducts] = useState(null)
           const [loading, setLoading] = useState(true);
      const [description, setDescription] = useState("350 mls");
      const [stock,setStock] = useState("50");
      const [price,setPrice] = useState("600");
      const [file, setFile] = useState(null);
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
        const res = await axiosInstance.put(`/store/products/${product.uuid}/`, product);

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
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    const handleImg = async (e) => {
      e.preventDefault()
      if (!file) {
        toaster.create({
          title: "please select file",
          type: "error",
          duration: 5000
        })
        return;
      }
const formData = new FormData();

   if (file) {
    formData.append("image", file)
    formData.append("product", id); 
   }
   
    await axios.post("http://10.165.206.65:8000/store/image/",formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then( res=> {
      toaster.create({
          title: "file uploaded successfully!",
          description: res.status,
          type: "success",
          duration: 3000
        })
    })
    .catch(error=> {
      const err = error.details
      toaster.create({
          title: JSON.stringify(error.response.data),
          type: "error",
          duration: 10000
        })
        console.error(error)
    })


    }

  return (
    <div className="h-dvh    font-open flex justify-center relative bg-[#dddbdb] dark:bg-black first-line: w-full">
      <Link to="/admin/inventory" className="absolute top-8 left-12"><RiArrowLeftLine/></Link>
      <div className="rounded-md justify-center my-6 bg-white dark:bg-opacity-10 flex-col flex px-8 w-auto">
      <h1 className="font-bold font-open text-center text-lg mb-6">Edit Product</h1>
      <div className="w-full flex flex-col place-items-center space-y-3 ">
      <div className="w-full">
      <p className="text-sm">Name</p>
         <Input name="name" onChange={handleChange} value={product?.name} w="28rem" variant="flushed"    className="bg-[#f0ebeb]   text-sm h-10 px-2 border-b border-black dark:border-gray-200  dark:bg-opacity-10"/>  
       </div>
         <div className=" w-full">
         <p className="text-sm">Description</p>
         <Input name="description" onChange={handleChange} variant="flushed" value={product?.description}    className="bg-[#f0ebeb]   text-sm h-10 px-2 border-b border-black dark:border-gray-200  dark:bg-opacity-10"/> 
         </div>
         <div className=" w-full">
         <p className="text-sm"></p>
         <Input name="category" variant="flushed" value={product?.category} className="bg-[#f0ebeb]   text-sm h-10 px-2 border-b border-black dark:border-gray-200  dark:bg-opacity-10"/> 
         </div>
         <div className="w-full">
         <p className="text-sm">Qty. in stock</p>
         <Input name="stock" onChange={handleChange} variant="flushed" value={product?.stock}   className="bg-[#f0ebeb] border-b border-black dark:border-gray-200 text-sm h-10 px-2 dark:bg-opacity-10"/> 
         </div>
         <div className="w-full">
         <p className="text-sm">Price</p>
         <Input name="price" onChange={handleChange} variant="flushed" value={product?.price}   className="bg-[#f0ebeb]  border-b border-black dark:border-gray-200  text-sm h-10 px-2 dark:bg-opacity-10"/>   
         </div>
         <div className="flex w-full">
          <input type="file" onChange={handleFileChange} className="bg-[#f0ebeb] w-full border-b border-black dark:border-gray-200  text-sm py-2 px-2 dark:bg-opacity-10"/>
         <button onClick={handleImg} className="mx-4"><BiArrowToRight/></button>
         </div>
         <button onClick={handlePut} className="bg-[#f7d518] py-2 text-gray-900 w-full rounded-sm" type="submit">Update Product</button>
         <Toaster/>
          
         </div>
         
      </div>
    </div>
  )
  
}
export default Edit