import { Avatar } from "../components/ui/avatar"
import { Menu, Portal } from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Link, useNavigate, useParams } from "react-router"
import { Badge } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axiosInstance from "./axiosInstance"
import { Table,TableScrollArea } from "@chakra-ui/react"
import { BiArrowBack } from "react-icons/bi"
import { GiTick } from "react-icons/gi"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
 };

const Crew = () => {
    const {id} = useParams()
    const [user, setUser] = useState(null)
    const [success, setSuccess]= useState(false)
    const [orders, setOrders] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [total, setTotal] = useState(null)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null);
    const [url, setUrl] = useState(`/store/orders/?customer=${id}`)
    const [page, setPage] = useState(1)
    const [dash, setDash] = useState(null)
    
     const navigate = useNavigate()
    useEffect(() => {
          axiosInstance.get(`/store/customer/${id}`)
      .then(res=> {
        setSuccess(true)
         setUser(res.data)
         console.log(res.data)
      })
       axiosInstance.get(url)
                .then((res)=> {
                    setOrders(res.data.results)
                    setNext(res.data.next)
                    setPrevious(res.data.previous)
                    setTotal(res.data.count)
                    setLoading(false)
                }).catch(
                    error => {
                        setError(true)
                    }
                )
      axiosInstance.get(`/store/customer_dashboard/?customer=${id}`)
      .then(
        res => {
         setDash(res.data)
        }
      )
    },[url])
   const handleNext = () => {
       setUrl(next)
       setPage(page + 1)
       setLoading(true)
            }
   const handlePrevious = () => {
       setUrl(previous)
       setPage( page - 1)
       setLoading(true)
      }

    const tota = Math.ceil(total/10);
    return (
        <div className="w-full bg-gray-100 dark:bg-black h-svh relative">
              <div className="grid grid-cols-3 gap-8">
                <div className=" p-4 grid gap-4 grid-cols-4 h-32 col-span-2 rounded-md">
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
                <div className="p-4 items-center dark:bg-opacity-10 bg-white h-28 m-4 flex shadow-lg font-open rounded-lg">
                    <Avatar src={`https://grandypos.duckdns.org${user?.image}`} h="4rem" w="4rem"/>
                    <div className="flex ml-10 flex-col">
                       {success &&
                       <>
                    <h1 className="font-normal text-sm mt-4 ">{user?.first_name} {user?.last_name}</h1> 
                    <h1 className=" text-sm text-gray-400">{user?.email}</h1>
                    <h1 className=" text-sm text-gray-800 dark:text-gray-50 mt-2">{user?.phone}</h1>
                    </>
                    }
                    </div>
                    
                </div>
              </div>
              <div className="w-full px-12">
              <TableScrollArea mt="4rem"  maxH="20rem" w="full">
                <Table.Root interactive shadow="md" variant="outline" className=" bg-white h-2/3 dark:bg-opacity-10">
                   <Table.Header className="bg-yellow-400 h-12 text-sm">
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
                            <Table.Cell textAlign="center" className="text-xs ">{formatDate(order.created_at)}</Table.Cell>
                            <Table.Cell textAlign="center"><button onClick={()=>navigate(`/orders/${order.uuid}`)} className="underline text-xs">see items</button></Table.Cell>
                     </Table.Row>
                       )}                                  
                     </Table.Body>
                </Table.Root>
            </TableScrollArea>
            
            {!loading &&
                     <div className="flex mt-4 w-full justify-between place-self-center items-center">
                            {previous && <button onClick={handlePrevious} className=" dark:bg-opacity-10 font-roboto rounded-lg text-sm shadow-lg bg-white p-3 w-16 place-items-center"><BiChevronLeft/></button>
                                   }
                                   <p className="text-xs mx-4 font-bold text-center   font-roboto">{page}/{tota}</p>
                                 {next && <button onClick={handleNext} className=" dark:bg-opacity-10 rounded-lg  place-items-center font-roboto text-sm shadow-lg bg-white w-16 p-3"><BiChevronRight/></button>
                                  }
                            </div>
            }
            </div>
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
            
           </div>
    )
   }



export default Crew