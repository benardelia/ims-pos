import { Table, TableScrollArea, Tabs } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { BsTrash2Fill } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import SalesChart from "./SalesChart";
import { createClient } from "@supabase/supabase-js";
import { FaSpinner } from "react-icons/fa6";


const supabase = createClient("https://hdvpgcnhocljtpmtlrae.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnBnY25ob2NsanRwbXRscmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNTc0ODMsImV4cCI6MjA1NzgzMzQ4M30.4YvNxHdJ1VKo2oB9qa7AsMGFeAydZf0lx_DR831FF-s");


const Sales = () => {
        const [sales, setSales] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

      async function getSales() {
            const { data, error } = await supabase.from("sales_items").select();
                    setSales(data);
                    
    
                    if (error) {
                        setError(true)
                        setLoading(false)
                    } else {
                        setLoading(false)
                    }
                }
                  useEffect(()=> {
                     getSales();
                   },[])  
    return (
        <div className="font-open w-full mb-36">
             <div className=" my-6 mx-12 flex justify-between">
                            <h1 className="font-semibold text-xl">Sales report.</h1>
                            <Button rounded="lg" fontSize="sm" px="0.75rem" className="text-red-500 dark:text-white bg-white dark:bg-red-500" fontWeight="bold">clear sales<CgTrash/></Button>
                        </div>
                        <div className="">
                              <div className="mx-28">
                                {loading ? <div className="size-12 shadow-xl flex justify-center place-items-center justify-self-center bg-white rounded-md">
                                                                <FaSpinner className="animate-spin"/>
                                                                 </div>
                                : error ? <p className="text-center">Error</p>
                                :
                                    <Table.Root rounded="md" shadow="md" interactive borderColor="orange.800" variant="outline"className="bg-white dark:bg-gray-800">
                                        <Table.Header>
                                            <Table.Row className="bg-lime-200 dark:bg-blue-700" mt="5rem">
                                            <Table.ColumnHeader className="">NO.</Table.ColumnHeader>
                                            <Table.ColumnHeader className="">PRODUCT</Table.ColumnHeader>
                                            <Table.ColumnHeader className="">QUANTITY SOLD</Table.ColumnHeader>
                                            <Table.ColumnHeader className="">Cart ID</Table.ColumnHeader>
                                            <Table.ColumnHeader className="" textalign="center">AMOUNT</Table.ColumnHeader>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {sales?.map(sale =>
                                            <Table.Row key={sale.id} >
                                                <Table.Cell>{sale.id}</Table.Cell>
                                                <Table.Cell>{sale.product_name}</Table.Cell>
                                                <Table.Cell>{sale.quantity}</Table.Cell>
                                                <Table.Cell>{sale.sale_id}</Table.Cell>
                                                <Table.Cell>{sale.price * sale.quantity}</Table.Cell>
                                            </Table.Row>
                                           )}
                                        </Table.Body>
                                        <Table.Footer className="font-bold">
                                            <Table.Cell  colSpan="2">Total Sales:</Table.Cell>
                                            <Table.Cell  colSpan="2" >-----</Table.Cell>
                                        </Table.Footer>
                                    </Table.Root>
}
                                    </div>
                        </div>
        </div>
    );
  }


   const Carts = () => {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  async function getCarts() {
        const { data, error } = await supabase.from("sales").select();
                setCarts(data);
                

                if (error) {
                    setError(true)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            }
              useEffect(()=> {
                 getCarts();
               },[])  

    return (
        <div className="font-open w-full">
              <div className="flex justify-between  my-6 mx-12">
            <h1 className="font-semibold text-xl">Carts report.</h1>
            <Button className="text-red-500 dark:text-white bg-white dark:bg-red-500" px="0.75rem" fontSize="sm" fontWeight="bold"rounded="lg" >clear carts<CgTrash/></Button>
            </div>
              <div className="mx-36">
              {loading ? <div className="size-12 shadow-xl flex justify-center place-items-center justify-self-center bg-white rounded-md">
                                              <FaSpinner className="animate-spin"/>
                                               </div>:
               error ? <p className="font-open text-center">Error</p>
                          :
                          <TableScrollArea>
                            <Table.Root h="40rem" interactive shadow="md" variant="outline" rounded="xl" striped="gray.300" className="mb-12 bg-white dark:bg-gray-800">
                                <Table.Header className="bg-lime-200 dark:bg-blue-700">
                                    <Table.Row>
                                        <Table.ColumnHeader>Cart ID</Table.ColumnHeader>
                                        <Table.ColumnHeader>Date & Time</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="center">Cart link</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {carts.map((order, index) => 
                                    <Table.Row key={order.id}>
                                        <Table.Cell>{order.id}</Table.Cell>
                                        <Table.Cell className="text-sm ">{order.created_at}</Table.Cell>
                                        <Table.Cell textAlign="center" className="underline"><Link>View cart</Link></Table.Cell>
                                    </Table.Row>
                                     )}
                                </Table.Body>
                            </Table.Root>
                            </TableScrollArea>
   }
        </div>
        </div>
    );
   }

   const Reports = () => {
    const [view, setView] = useState("sales");
    return (
        <div className="w-full font-open bg-gray-50 dark:bg-slate-500">
            <Tabs.Root defaultValue="Sales" w="full" mx="">
            <Tabs.List>
                <Tabs.Trigger value="Sales" asChild>
                <div onClick={() =>setView("sales") } className="text-lg font-semibold pr-4">
                 Sales
               </div>
              </Tabs.Trigger>
              <Tabs.Trigger value="carts" asChild>
               <div onClick={() =>setView("carts") } className="text-lg font-semibold pr-4">
                 Carts
               </div>
            </Tabs.Trigger>
      </Tabs.List>
            </Tabs.Root>
            {
                view === "sales" ? <Sales/> : <Carts/>
            }
        </div>
    );
        }

export default Reports