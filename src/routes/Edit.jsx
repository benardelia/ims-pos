import { useState,useEffect, useRef } from "react"
import { Editable, IconButton} from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
import { Link, useParams } from "react-router"
import { BiArrowToLeft, BiLeftArrow } from "react-icons/bi"
import { RiArrowLeftLine } from "react-icons/ri"
 import axios from "axios"
import { Input } from "@chakra-ui/react"
import { toaster, Toaster } from "../components/ui/toaster"


const Edit = () => {
      const {id} = useParams();
      const [products, setProducts] = useState(null)
           const [loading, setLoading] = useState(true);
      const [description, setDescription] = useState("350 mls");
      const [stock,setStock] = useState("50");
      const [price,setPrice] = useState("600");
      const [product,setProduct] = useState(null)
      const inputRef = useRef()
      const session = localStorage.getItem("jwt_token");
      const axiosInstance = axios.create({
                  baseURL: "http://10.219.31.111:8000",
                      timeout: 18000,
                      headers: {
                          Authorization : `Bearer ${session}`,
                          "Content-Type": "application/json"
                      }
                  })
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
        const res = await axios.put(`http://10.219.31.111:8000/store/products/${product.uuid}/`,product,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`
        }
        });

        toaster.create({
          title: "product updated successfully!",
          type: "success",
          duration: 3000
        })
      } catch (error) {
        console.log(error.message)
        toaster.create({
          title: error.message,
          type: "error",
          duration: 5000
        })
      }
    }
  return (
    <div className="h-dvh flex relative place-items-center dark:bg-slate-700 justify-center bg-gray-200 w-full">
      <Link to="/admin/inventory" className="absolute top-8 left-4"><RiArrowLeftLine/></Link>
      <div className="rounded-lg flex-col h-auto py-12 shadow-lg bg-white dark:bg-slate-800 flex place-items-center justify-center w-1/2">
      <h1 className="font-bold font-open text-lg my-2">Edit Product</h1>
      <form onSubmit={handlePut} className="w-full flex flex-col my-6 place-items-center space-y-6">
      <div className="flex flex-col w-5/6">
      <p className="font-open text-sm font-semibold">Edit name</p>
         <Input name="name" value={product?.name} onChange={handleChange}  className="bg-gray-100 text-sm h-10 px-2 rounded-md dark:bg-gray-700"/>  
       </div>
         <div className="flex flex-col w-5/6">
         <p className="font-open text-sm font-semibold">Edit description</p>
         <Input name="description" value={product?.description} onChange={handleChange} className="bg-gray-100 text-sm h-10 px-2 rounded-md dark:bg-gray-700"/> 
         </div>
         <div className="flex flex-col w-5/6">
         <p className="font-open text-sm font-semibold">Edit category</p>
         <Input name="category" value={product?.category} onChange={handleChange} className="bg-gray-100 text-sm h-10 px-2 rounded-md dark:bg-gray-700"/> 
         </div>
         <div className="flex flex-col w-5/6">
         <p className="font-open text-sm font-semibold">Edit Stock</p>
         <Input name="stock" value={product?.stock} onChange={handleChange}  className="bg-gray-100 text-sm h-10 px-2 rounded-md dark:bg-gray-700"/> 
         </div>
         <div className="flex flex-col w-5/6">
         <p className="font-open text-sm font-semibold">Edit price</p>
         <Input name="price" value={product?.price} onChange={handleChange}  className="bg-gray-100 text-sm h-10 px-2 rounded-md dark:bg-gray-700"/>   
         </div>
         <Toaster/>
         <button className="bg-custom w-5/6 py-2 md:py-2 mt-16 mb-8 shadow-md dark:text-gray-900 rounded-md font-open font-bold">UPDATE PRODUCT</button>
         </form>
      </div>
    </div>
    
  )
  
}
export default Edit