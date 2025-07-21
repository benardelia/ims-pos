import { Avatar } from "../components/ui/avatar"
import { Menu, Portal } from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Link, useNavigate, useParams } from "react-router"
import { Badge } from "@chakra-ui/react"
import pass from "./asset/pass.jpg"
import { useEffect, useState } from "react"
import axiosInstance from "./axiosInstance"
import { Table,TableScrollArea } from "@chakra-ui/react"
import { BiArrowBack } from "react-icons/bi"
import { GiTick } from "react-icons/gi"
const Crew = () => {
    const [user, setUser] = useState(null)
    const [success, setSuccess]= useState(false)
    const [orders, setOrders] = useState(null)
    const [dash, setDash] = useState(null)
    const { id } = useParams()
     const navigate = useNavigate()
    useEffect(() => {
          axiosInstance.get(`/store/customer/${id}`)
      .then(res=> {
        setSuccess(true)
         setUser(res.data)
         console.log(res.data)
      })
      axiosInstance.get(`/store/orders/?customer=${id}`)
      .then(
        res => {
            setOrders(res.data.results)
        }
      )
      axiosInstance.get(`/store/customer_dashboard/?customer=${id}`)
      .then(
        res => {
         setDash(res.data)
        }
      )
    },[])
    return (
        <div className="w-full h-svh relative bg-inherit">
              <div className="grid grid-cols-3 gap-8">
                <div className=" p-4 grid gap-4 grid-cols-4 col-span-2 rounded-md">
                     <Item item={{
                       name: "orders price",
                       value: dash?.total_orders_price.toLocaleString(),
                       rate: "2%"
                      }}/>
                      <Item item={{
                       name: "products ordered",
                       value: dash?.total_products_ordered,
                       rate: "2%"
                      }}/>
                <div className="bg-white dark:bg-opacity-10 flex justify-between flex-col p-3 rounded-lg shadow-md">
        <div className="flex justify-between">
           <h1 className="text-xs font-medium mb-4">orders completed</h1>
        </div>
            <h1 className="text-xl font-semibold">{dash?.completed_orders}</h1>
           </div>
            <div className="bg-white dark:bg-opacity-10 flex justify-between flex-col p-3 rounded-lg shadow-md">
        <div className="flex justify-between">
           <h1 className="text-xs font-medium mb-4">pending orders</h1>
           
        </div>
            
            <h1 className="text-xl font-semibold">{dash?.pending_orders}</h1>
            
           </div>
                </div>
                <div className="p-4 flex shadow-lg rounded-md">
                    <Avatar src={`grandypos.duckkdns.org${user?.image}`} h="6rem" w="6rem"/>
                    <div className="flex ml-10 flex-col">
                       {success &&
                       <>
                    <h1 className="font-light text-xl mt-4 ">{user?.first_name} {user?.last_name}</h1> 
                    <h1 className=" text-sm text-gray-400">{user?.email}</h1>
                    <h1 className=" text-sm text-gray-800 mt-2">{user?.phone}</h1>
                    </>
                    }
                    </div>
                    
                </div>
                 
              </div>
              <TableScrollArea mt="4rem" h="20rem" w="full">
                <Table.Root interactive shadow="md" variant="outline" className=" bg-white h-2/3 dark:bg-opacity-10">
                   <Table.Header className="bg-[rgba(214,214,186,0.63)] h-12 text-sm">
                      <Table.Row>
                      <Table.ColumnHeader className="dark:text-gray-900">No.</Table.ColumnHeader>
                      <Table.ColumnHeader className="dark:text-gray-900">Status</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">items no.</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">time ordered</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center" className="dark:text-gray-900">action</Table.ColumnHeader>
                      </Table.Row>
                   </Table.Header>
                  <Table.Body>
                    {orders?.map((order, i) => 
                     <Table.Row key={order.uuid}>
                            <Table.Cell className="text-xs">{i + 1}</Table.Cell>
                            <Table.Cell className="text-xs ">{order.status}</Table.Cell>
                            <Table.Cell textAlign="center" className="text-xs">{order.items.length}</Table.Cell>
                            <Table.Cell textAlign="center" className="text-xs ">{order.created_at.slice(0,20)}</Table.Cell>
                            <Table.Cell textAlign="center"><button onClick={()=>navigate(`/orders/${order.uuid}`)} className="underline text-xs">see items</button></Table.Cell>
                     </Table.Row>
                       )}                                  
                     </Table.Body>
                </Table.Root>
            </TableScrollArea>
        </div>
    )
}

 function Item ({item}) {
    return (
     <div className="bg-white dark:bg-opacity-10 flex justify-between flex-col p-3 rounded-lg shadow-md">
        <div className="flex justify-between">
           <h1 className="text-xs font-medium mb-4">{item.name}</h1>
           <Menu.Root>
            <Menu.Trigger>
                <button> 
                   <BsThreeDotsVertical/>
                </button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner alignItems="left">
                    <Menu.Content>
                        <Menu.Item>
                         Details
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/admin/view/:id">
                               view {item.name}
                            </Link>
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
           </Menu.Root>
           
        </div>
            
            <h1 className="text-xl font-semibold">{item.value}</h1>
            <Badge w="2rem" className="bg-green-500 dark:bg-green-800">{item.rate}</Badge>
           </div>
    )
   }

export default Crew