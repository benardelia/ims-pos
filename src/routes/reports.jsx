import { Badge, Portal, Skeleton, Table, TableScrollArea, Tabs } from "@chakra-ui/react"
import { useState, useEffect, Suspense } from "react"
import { BsArrowUp, BsThreeDots, BsThreeDotsVertical, BsTrash2Fill } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import SalesChart from "./SalesChart";
import { createClient } from "@supabase/supabase-js";
import { FaFileInvoiceDollar, FaSackDollar, FaSpinner, FaUserTag } from "react-icons/fa6";
import axios from "axios";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import axiosInstance from "./axiosInstance";
import { PiSpinnerLight } from "react-icons/pi";
import { Menu } from "@chakra-ui/react";
import { MdOutlinePendingActions, MdFilterAlt } from "react-icons/md";
import { QueryErrorResetBoundary, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from "react-error-boundary";
import { IoReload } from "react-icons/io5";


const Sales = () => {
        const [sales, setSales] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
         const [next, setNext] = useState(null)
            const [previous, setPrevious] = useState(null);
            const [cont, setCont] = useState(null)
             const [url, setUrl] = useState("/store/payments")
             const [page, setPage] = useState(1)
             
             useEffect(()=> {
               axiosInstance.get(url)
                 .then(res=> {
                    setSales(res.data.results)
                    setNext(res.data.next)
                    setPrevious(res.data.previous)
                    setCont(res.data.count)
                    setLoading(false)
                        })
               },[url]) 
               const onNext = () => {
                setUrl(next)
                setPage(page + 1)
                setLoading(true)
            }
            const onPrev = () => {
                setUrl(previous)
                setPage(page - 1)
                setLoading(true)
            }
            const tota = Math.ceil(cont/10)
    return (
        <div className="font-roboto h-full w-full">
        <div className="">
             <div className="mx-4">
            {loading ? <PiSpinnerLight className="animate-spin size-8 flex place-self-center"/> :
            <TableScrollArea  h="26rem">
            <Table.Root shadow="md" interactive borderColor="orange.800" variant="outline"className="bg-white w-full dark:bg-opacity-10">
            <Table.Header className="p-2 sticky top-0">
            <Table.Row className="bg-[#f7d518]">
            <Table.ColumnHeader className="dark:text-gray-900 text-sm font-bold">NO.</Table.ColumnHeader>
            <Table.ColumnHeader className="dark:text-gray-900 text-sm font-bold">Status</Table.ColumnHeader>
            <Table.ColumnHeader className="dark:text-gray-900 text-sm font-bold" textAlign="center">QUANTITY SOLD</Table.ColumnHeader>
            <Table.ColumnHeader className="dark:text-gray-900 text-sm font-bold" textalign="center">AMOUNT</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center" className="text-sm">action</Table.ColumnHeader>
            </Table.Row>
            </Table.Header>
              <Table.Body>
                {sales?.map((sale, i) =>
                    <Table.Row key={sale.uuid} >
                    <Table.Cell className="text-xs">{i + 1}</Table.Cell>
                    <Table.Cell className="text-xs font-semibold">{sale.order.status}</Table.Cell>
                    <Table.Cell textAlign="center" className="text-xs">{sale.order.items.length}</Table.Cell>
                    <Table.Cell className="text-xs">{sale.amount}</Table.Cell>
                    <Table.Cell textAlign="center" className=" text-xs underline"><Link to={`/orders/${sale.uuid}`}>see items</Link></Table.Cell>
                </Table.Row>
               )}
            </Table.Body>
            </Table.Root>
        </TableScrollArea>
}
         {!loading && <div className="flex mt-4 justify-self-center items-center">
            {previous && <button onClick={onPrev} className="   font-roboto rounded-full text-sm bg-gray-300 dark:bg-gray-800 p-1"><BiChevronLeft/></button>}
                   <p className="text-xs mx-4 font-bold text-center   font-roboto">{page}/{tota}</p>
                         {next && <button onClick={onNext} className=" rounded-full   font-roboto text-sm bg-gray-300 dark:bg-gray-800 p-1"><BiChevronRight/></button>
                          }
                                                    </div>}
                                    </div>
                        </div>
        </div>
    );
  }

 const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

  const ORDERS_PER_PAGE = 10;

const Orders = () => {
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);

  // Build dynamic query key so TanStack Query knows when to refetch
  const queryKey = ['orders', { page, status: statusFilter, created_at: dateFilter }];

  const { data, isLoading, isError, error } = useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (dateFilter) params.append('created_at', dateFilter);
      if (page > 1) params.append('page', String(page));

      const response = await axiosInstance.get('/store/orders/', { params });
      return response.data; // { results: [], count: number, next: string|null, previous: string|null }
    },
    keepPreviousData: true, // Important: keeps old data visible while loading new page
    staleTime: 1000 * 60, // 1 minute
  });

  const orders = data?.results ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / ORDERS_PER_PAGE);

  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  const handlePrevious = () => {
    if (hasPrevious) setPage(page - 1);
  };

  const handleNext = () => {
    if (hasNext) setPage(page + 1);
  };

  return (
    <div className="h-full font-roboto w-full pb-12">
      <div className="mx-4 flex flex-col place-items-center">
            <div className="flex w-full mx-6 justify-between items-center mb-4">
              <p className="font-semibold">Orders ({totalCount})</p>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                    setPage(1); // Reset to page 1 when filtering
                  }}
                  className="p-2 border rounded-lg text-sm"
                />
                <Menu.Root>
                  <Menu.Trigger>
                    <Button className="text-sm">
                      <MdFilterAlt />
                    </Button>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner alignContent="end">
                      <Menu.Content>
                        <Menu.Item onClick={() => { setStatusFilter(''); setPage(1); }}>
                          All
                        </Menu.Item>
                        <Menu.Item onClick={() => { setStatusFilter('Pending'); setPage(1); }}>
                          Pending
                        </Menu.Item>
                        <Menu.Item onClick={() => { setStatusFilter('Completed'); setPage(1); }}>
                          Completed
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </div>
            </div>
            <TableScrollArea maxH="24rem" w="full">
              <Table.Root interactive shadow="md" variant="outline" className="bg-white dark:bg-opacity-10">
                <Table.Header className="bg-[#f7d518] text-black sticky top-0 text-sm z-50">
                  <Table.Row>
                    <Table.ColumnHeader className="text-black">No.</Table.ColumnHeader>
                    <Table.ColumnHeader className="text-black">Status</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center" className="text-black">Items No.</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center" className="text-black">Time Ordered</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center" className="text-black">Action</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {orders.map((order, index) => (
                    <Table.Row key={order.uuid}>
                      <Table.Cell className="text-xs">
                        {(page - 1) * ORDERS_PER_PAGE + index + 1}
                      </Table.Cell>
                      <Table.Cell className="text-xs">{order.status}</Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        {order.items.length}
                      </Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        {formatDate(order.created_at)}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <button
                          onClick={() => navigate(`/orders/${order.uuid}`)}
                          className="underline text-xs "
                        >
                          see items
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </TableScrollArea>
        
          <div className="flex mt-2 w-full justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className="p-3 w-16 rounded-lg shadow-lg bg-white dark:bg-opacity-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
              <BiChevronLeft />
            </button>
            <p className="text-xs font-bold">
              {page} / {totalPages || 1}
            </p>

            <button
              onClick={handleNext}
              disabled={!hasNext}
              className="p-3 w-16 rounded-lg shadow-lg bg-white dark:bg-opacity-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BiChevronRight />
            </button>
          </div>
      </div>
    </div>
  );
};

   function Item ({item, link, icon}) {
    return (
     <div className="bg-white flex flex-col justify-between dark:bg-opacity-10 p-3 rounded-lg shadow-md">
        <div className="flex justify-between">
           <h1 className="text-xs font-medium">{item.name}</h1>
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
                            { link &&
                            <Link to={item.link}>
                               view {item.name}
                            </Link>
   }
                    </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
           </Menu.Root>
        </div>
            <h1 className="text-xl py-2 font-semibold">{item.value}</h1>
            {icon}
           </div>
    )
   }

   const Reports = () => {
    const [view, setView] = useState("sales");
    const [url, setUrl] = useState("/store/orders/")
    const [count, setCount] = useState(null)
    const [costumer, setCostumer] = useState(null)
    const [dash, setDash] = useState(null)
    const [date, setDate] = useState("")
    const [status, setStatus] = useState("")
     useEffect(()=> {
                axiosInstance.get(url)
                .then((res)=> {
                    setCount(res.data.count)
                }).catch(
                    error => {
                        setError(true)
                    }
                )
            axiosInstance.get("/store/customers/")
            .then(res=> {
                setCostumer(res.data.count)
                
            })
            axiosInstance.get("/store/customer_dashboard/")
                  .then(
                    res => {
                     setDash(res.data)
                    }
                  )

            }, [])
    return (
        <div className="w-full h-svh font-roboto bg-inherit">
            <div className="w-full flex">
              <div className="w-full grid grid-cols-4 gap-4 px-4">
               <Item link={false} item={{
                name: "revenues",
                value: dash?.total_orders_price.toLocaleString(),
                rate: "12%"
               }}
               icon={<FaSackDollar className="text-xl text-green-600"/>}
               />
               <Item link={false} item={{
                name: "orders",
                value: dash?.completed_orders,
                rate: "59%",
                link: ""
               }}
               icon={<FaFileInvoiceDollar className="text-xl"/>}
               />
               <Item link={true} item={{
                name: "customers",
                value: costumer,
                rate: "2%",
                link: "/admin/customers"
               }}
               icon={<FaUserTag className="text-2xl"/>}
               />
               <Item link={true} item={{
                name: "pending orders",
                value: dash?.pending_orders,
                rate: "41%",
                link: "/admin/pending-orders"
               }}
               icon={<MdOutlinePendingActions className="text-2xl text-red-600"/>}
               />
            </div>
            </div>
            <div className="w-full pt-4 h-2/3">
            <QueryErrorResetBoundary>
                {({reset})=>(
                    <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({error, resetErrorBoundary})=> (
                         <div className="flex flex-col place-items-center justify-center h-full w-full">
                            <p className="font-roboto text-sm font-medium text-red-600 mb-4">An error occurred: {error.message}</p>     
                            <Button onClick={()=> resetErrorBoundary()} className=" font-medium bg-yellow-600 font-roboto text-sm p-3 rounded-lg"><IoReload/></Button>
                        </div>
                    )}>
                    <Suspense fallback={
                    <div className="h-full font-roboto w-full pb-12">
      <div className="mx-4 flex flex-col place-items-center">
            <div className="flex w-full mx-6 justify-between items-center mb-4">
              <p className="font-semibold">Orders</p>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className="p-2 border rounded-lg text-sm"
                />
                    <Button className="text-sm">
                      <MdFilterAlt />
                    </Button>

              </div>
            </div>
                <Table.Root interactive shadow="md" variant="outline" className="bg-white dark:bg-opacity-10">
                <Table.Header className="bg-yellow-500 text-black sticky top-0 text-sm z-50">
                  <Table.Row>
                    <Table.ColumnHeader className="text-black">No.</Table.ColumnHeader>
                    <Table.ColumnHeader className="text-black">Status</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center" className="text-black">Items No.</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center" className="text-black">Time Ordered</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="center" className="text-black">Action</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                 <Table.Row >
                      <Table.Cell className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell className="text-xs"><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell className="text-xs"><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row >
                      <Table.Cell className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell className="text-xs"><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row >
                      <Table.Cell className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell className="text-xs"><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row >
                      <Table.Cell className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell className="text-xs"><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell textAlign="center" className="text-xs">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Skeleton h="0.6rem" w="70%"/>
                      </Table.Cell>
                    </Table.Row>
                </Table.Body>
                </Table.Root>
                </div>
                </div>
                }>
                    <Orders/>
                </Suspense>
                </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
            </div>
        </div>
    );
        }

export default Reports