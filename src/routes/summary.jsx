import { useState } from "react";
import { Avatar } from "../components/ui/avatar";
import axiosInstance from "./axiosInstance";

const Summary = () => {
    const [dash, setDash] = useState(null)
    const [user, setUser] = useState(null)


    axiosInstance.get(`/store/customer_dashboard/`)
        .then(res => {
            setDash(res.data)
        })
    axiosInstance.get("/core/user/me/")
        .then(res => {
            setUser(res.data)
        })
    return (
        <div className="h-dvh w-full flex font-roboto justify-center place-items-center p-6">
            <div className="sm:p-6 p-3 size-full rounded-lg bg-[#f7f5f5]">
                <h1 className="text-xl font-semibold">FACTORY MANAGEMENT</h1>
                <p className="text-lg">Report Summary</p>
                <div className="flex flex-col-reverse sm:flex-row place-items-center justify-center">
                    <div className="grid sm:gap-8 gap-4 sm:m-8 m-2 grid-cols-2">
                        <Item item={{
                            name: "Total products",
                            value: dash?.total_products_ordered
                        }} />
                        <Item item={{
                            name: "Orders revenue",
                            value: dash?.total_orders_price.toLocaleString()
                        }} />
                        <Item item={{
                            name: "Products ordered",
                            value: dash?.completed_orders
                        }} />
                        <Item item={{
                            name: "Pending orders",
                            value: dash?.pending_orders
                        }} />
                    </div>
                    <div className="bg-white w-1/3 h-1/3 flex place-items-center justify-center sm:flex-row flex-col rounded-lg shadow-lg p-8">
                        <Avatar h="6rem" w="6rem" />
                        <div className="ml-2">
                            <h1 className="font-open">{user?.username}</h1>
                            <p className="font-semibold">{user?.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const Item = ({ item }) => {
    return (
        <div className="w-full h-30 shadow-lg font-roboto p-6 bg-white rounded-lg">
            <h1 className="font-normal text-xs font-open sm:text-sm">{item.name}</h1>
            <h1 className="font-semibold font-open text-xl sm:text-2xl">{item.value}</h1>
        </div>
    )
}
export default Summary;