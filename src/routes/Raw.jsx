import axios from "axios"
import { useEffect, useState } from "react"
import { BiArrowFromRight, BiChevronLeft, BiChevronRight, BiSend } from "react-icons/bi"
import { BsArrowRight } from "react-icons/bs"
import { CgArrowRight } from "react-icons/cg"
import { toaster, Toaster } from "../components/ui/toaster";
import axiosInstance from "./axiosInstance"
import { FaSpinner, FaX } from "react-icons/fa6"
import { LuX } from "react-icons/lu"

const Raw = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axiosInstance.get("/store/products/", {
            params: {
                category: "23756693-650b-422d-b052-12858bde0572"
            }
            })
            .then(res => {
                setProducts(res.data.results)
            })
    }, [])
    return (
        <div className="h-dvh font-roboto px-6">
            <Toaster />
            <h1 className="text-xl font-semibold mb-4">Raw materials</h1>
            <p></p>
            <div className="grid grid-cols-3 gap-4 space-y-2">
                {products?.map(product =>
                    <Material product={product} key={product?.uuid} />
                )
                }
            </div>
        </div>
    )
}

const Material = ({ product }) => {
    const [show, setShow] = useState(false)
    const [value, setValue] = useState({
        uuid: product.uuid,
        name: product.name,
        category: product.category,
        description: product.description,
        images: product.images,
        price: product.price,
        stock: product.stock
    })

    const [loading, setloading] = useState(false)
    const [error, setError] = useState()
    const [val, setVal] = useState("")

    // handleUpdate: validate the used quantity, compute the new stock locally,
    // send the computed payload to the API (avoids stale state), then update
    // local UI from the server response. Shows toasts for loading/success/error.
    const handleUpdate = async (e) => {
        // if called from a button click that sends an event
        if (e && e.preventDefault) e.preventDefault()

        const used = parseInt(val, 10)
        if (Number.isNaN(used) || used <= 0) {
            toaster.create({ title: "Enter a valid positive number", type: "error" })
            return
        }

        const currentStock = Number(value?.stock ?? product?.stock ?? 0)
        if (used > currentStock) {
            toaster.create({ title: "Used quantity exceeds current stock", type: "error" })
            return
        }

        const newStock = currentStock - used
        const newValue = { ...value, stock: newStock }

        setloading(true)
        {loading &&
        toaster.create({ title: "Updating product", type: "loading" })
        }
        try {
            const res = await axiosInstance.put(`/store/products/${product.uuid}/`, newValue)
            // prefer server response if it returns the updated object
            const updated = res?.data ?? newValue
            setValue(updated)
            setVal("")
            setError(undefined)
            toaster.create({ title: "material updated", type: "success", duration: 5000 })
        } 
        catch (err) {
            setError(err)
            toaster.create({ title: JSON.stringify(err?.response), type: "error" })
            console.error(err)
        }
        finally {
            setloading(false)
        }
    }

    return (
        <div className="bg-white dark:bg-opacity-10 relative max-w-fit rounded-xl flex items-center justify-between shadow-md p-4">
            <div className="w-72">
                <h1 className="font-roboto font-semibold">{product.name}</h1>
                <p className="font-roboto text-sm">items: {value?.stock}</p>
            </div>
            {
                show &&
                <div className="w-36 mr-6 flex items-center">
                    <input value={val} onChange={(e) => setVal(e.target.value)} type="number" placeholder="used..." className=" bg-gray-200 dark:bg-opacity-20 mr-3 w-24 font-open text-xs border-1 border-black rounded-lg p-2" />
                    <button onClick={handleUpdate} className="p-2 bg-yellow-500 rounded-full text-black shadow-sm">{loading ? <FaSpinner className="animate-spin" /> : error ? <LuX className="text-red-700" /> : <BiSend />}</button>
                </div>
            }
            <button onClick={() => setShow(!show)} className=" absolute rounded-r-xl text-gray-800 h-full right-0 bg-[#faf9f9] dark:bg-opacity-20 p-2 shadow-md">{!show ? <BiChevronRight /> : <BiChevronLeft />}</button>
            {error && <p className="">{JSON.stringify(error)}</p>}
        </div>
    )
}


export default Raw