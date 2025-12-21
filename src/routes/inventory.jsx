import { Button, Table, Input,  Dialog,
    HStack,VStack, Field,Select, createListCollection,
    Portal, 
    IconButton,
    Skeleton} from "@chakra-ui/react"
import { CgAdd } from "react-icons/cg"
import { GrAdd } from "react-icons/gr"
import { Link, useNavigate} from "react-router"
import { Tabs } from "@chakra-ui/react"
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react"
import { FaSpinner } from "react-icons/fa6";
import axios from "axios"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { FiTrash, FiEdit } from "react-icons/fi"
import { toaster, Toaster } from "../components/ui/toaster"
import axiosInstance from "./axiosInstance"
import { PiSpinnerBallLight, PiSpinnerLight } from "react-icons/pi"
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { IoReload } from "react-icons/io5"




const Inventory = () => {
   const navigate = useNavigate();
  
    
    return (
        <div className="w-full font-roboto text-gray-900 dark:text-gray-50 h-dvh overflow-y-auto bg-inherit">
             <Toaster/>
            <div className="mx-8 h-dvh flex flex-col  place-items-center mb-24">
                <QueryErrorResetBoundary>
               {
                ({reset}) => (
                    <ErrorBoundary onReset={reset} fallbackRender={({error, resetErrorBoundary})=> (
                      <div className="flex flex-col place-items-center justify-center h-full w-full">
                         <p className="font-roboto text-sm font-medium text-red-600 mb-4">An error occurred: {error.message}</p>     
                         <Button onClick={()=> resetErrorBoundary()} className="bg-yellow-500 font-medium font-roboto text-sm p-2 rounded-lg"><IoReload/></Button>
                       </div>
                   )}>
                 <Suspense fallback={
                    <div className="w-full">
                         <div className="w-full my-4 flex  justify-end px-6">
                            <div className="flex items-center justify-self-end">
                           
                                <Button
                                 className="bg-yellow-300 dark:bg-yellow-500 font-semibold dark:text-gray-900 px-4 h-8"><GrAdd/>Add product</Button>
                 </div>
            </div>
                    
                    <Table.Root className="bg-white dark:bg-opacity-20">
                    <Table.Header>
                        <Table.Row className="bg-[#f7d518] rounded-t-lg dark:bg-[#f7d518] dark:text-gray-900">
                        <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                NO.
                            </Table.ColumnHeader>
                            <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                Product Name
                            </Table.ColumnHeader>
                                <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                   Quantity in stock
                                </Table.ColumnHeader>
                                <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                   description
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" className="font-bold dark:text-gray-900">actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    <Table.Row className="">
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell alignItems="flex-end" className="flex justify-self-center"><div className="flex items-center justify-between">
                                   <Skeleton h="2rem" w="2rem" mr="1rem" rounded="lg"/>
                                   <Skeleton h="2rem" w="2rem" rounded="lg"/>
                                </div></Table.Cell>
                            </Table.Row>
                    <Table.Row className="">
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell alignItems="flex-end" className="flex justify-self-center"><div className="flex items-center justify-between">
                                   <Skeleton h="2rem" w="2rem" mr="1rem" rounded="lg"/>
                                   <Skeleton h="2rem" w="2rem" rounded="lg"/>
                                </div></Table.Cell>
                            </Table.Row>
                            <Table.Row className="">
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell alignItems="flex-end" className="flex justify-self-center"><div className="flex items-center justify-between">
                                   <Skeleton h="2rem" w="2rem" mr="1rem" rounded="lg"/>
                                   <Skeleton h="2rem" w="2rem" rounded="lg"/>
                                </div></Table.Cell>
                            </Table.Row>
                            <Table.Row className="">
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell alignItems="flex-end" className="flex justify-self-center"><div className="flex items-center justify-between">
                                   <Skeleton h="2rem" w="2rem" mr="1rem" rounded="lg"/>
                                   <Skeleton h="2rem" w="2rem" rounded="lg"/>
                                </div></Table.Cell>
                            </Table.Row>
                            <Table.Row className="">
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell><Skeleton h="0.6rem" w="70%"/></Table.Cell>
                                <Table.Cell alignItems="flex-end" className="flex justify-self-center"><div className="flex items-center justify-between">
                                   <Skeleton h="2rem" w="2rem" mr="1rem" rounded="lg"/>
                                   <Skeleton h="2rem" w="2rem" rounded="lg"/>
                                </div></Table.Cell>
                            </Table.Row>
                         </Table.Body>
                    </Table.Root>
                    </div>
                        }>
                        <Items/>
                        </Suspense>
                    </ErrorBoundary>
                )
}              
                </QueryErrorResetBoundary>
            </div>
        </div>
    )
};


const PRODUCTS_PER_PAGE = 10;

const fetchProducts = async ({ queryKey }) => {
  const [_key, { page, search }] = queryKey;

  const params = new URLSearchParams();
  if (search) params.append('name', search);
  if (page > 1) params.append('page', String(page));

  const response = await axiosInstance.get('/store/products/', { params });
  return response.data;
};

 const Items = () => {
    
    const queryClient = useQueryClient();
    const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Query key includes page and search so it auto-refetches on change
  const queryKey = ['products', { page, search: searchQuery }];

  const { data } = useSuspenseQuery({
    queryKey,
    queryFn: fetchProducts,
    keepPreviousData: true, // Smooth pagination: show old data while fetching new
    staleTime: 1000 * 30, // 30 seconds
  });

  const products = data.results ?? [];
  const totalCount = data.count ?? 0;
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  const handlePrevious = () => hasPrevious && setPage(page - 1);
  const handleNext = () => hasNext && setPage(page + 1);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setPage(1); // Reset to page 1 on new search
  };

  const handleDelete = async (uuid) => {
    try {
      await axiosInstance.delete(`/store/products/${uuid}/`);
      toaster.create({
        title: 'Product deleted successfully!',
        type: 'success',
        duration: 3000,
      });

      // Invalidate and refetch the list
      queryClient.invalidateQueries({ queryKey: ['products'] });
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to delete product';
      toaster.create({
        description: errorMsg,
        type: 'error',
        duration: 5000,
      });
    }
  };
    return (
        <>
         <div className="w-full my-4 flex  justify-end px-6">
                            <div className="flex items-center justify-self-end">
                                <Button onClick={()=>navigate("/admins/newInv")}
                                 className="bg-yellow-300 dark:bg-yellow-500 font-semibold dark:text-gray-900 px-4 h-8"><GrAdd/>Add product</Button>
                 </div>
            </div>
                               <Table.Root interactive className="bg-white dark:bg-opacity-20">
                    <Table.Header>
                        <Table.Row className="bg-[#f7d518] rounded-t-lg dark:bg-[#f7d518] dark:text-gray-900">
                        <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                NO.
                            </Table.ColumnHeader>
                            <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                Product Name
                            </Table.ColumnHeader>
                                <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                   Quantity in stock
                                </Table.ColumnHeader>
                                <Table.ColumnHeader className="font-bold dark:text-gray-900">
                                   description
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" className="font-bold dark:text-gray-900">actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            products?.map((product,i)=> (
                            <Table.Row key={product.id} className="">
                                <Table.Cell>{i + 1}</Table.Cell>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.stock}</Table.Cell>
                                <Table.Cell>{product.description}</Table.Cell>
                                <Table.Cell alignItems="flex-end" className="flex justify-self-center"><div className="flex items-center justify-between">
                                    <button onClick={()=>navigate(`/admins/edit/${product.uuid}`)} 
                                    className="p-2 flex place-items-center justify-center rounded-lg bg-gray-100 dark:bg-opacity-20">
                                                                                    <FiEdit/>
                                                                                    </button>
                                <button onClick={()=>handleDelete(product.uuid)} className=" p-2 flex place-items-center ml-6 justify-center rounded-lg bg-red-50 text-red-500 dark:text-red-100 dark:bg-red-600">
                                                                                    <FiTrash/></button></div></Table.Cell>
                            </Table.Row>))
                        }
                    </Table.Body>
                </Table.Root>
                {/* Pagination */}
        {products.length > 0 && (
          <div className="flex items-center justify-center mt-6 gap-6">
            <button
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BiChevronLeft />
            </button>

            <p className="text-sm font-bold">
              {page} / {totalPages || 1}
            </p>

            <button
              onClick={handleNext}
              disabled={!hasNext}
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BiChevronRight />
            </button>
          </div>
        )}
      </>
    )
 }

export default Inventory