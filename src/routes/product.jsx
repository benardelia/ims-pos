import { useEffect, useState } from "react";
import { BiCartAdd, BiChevronDown, BiChevronLeft, BiChevronRight, BiChevronUp } from "react-icons/bi";
import axiosInstance from "./axiosInstance";

const Product = ({product, onAdd, image}) => {
    const [show, setShow] = useState(false);
    const [imge, setImge] = useState(`https://grandypos.duckdns.org${image}`)
    
    const nime = product.name
    
    return (
        <div className="relative shadow-sm blur-none flex bg-white dark:bg-opacity-10 text-gray-950 dark:text-gray-100 flex-col rounded-lg dark:shadow-gray-700 sm:h-52 h-40 w-full">
                      
                         <img src={imge} className="h-full rounded-lg w-full"/>
                      
            <div className="flex h-1/3 p-2 bg-white dark:bg-black dark:bg-opacity-80 bg-opacity-80 rounded-b-lg absolute bottom-0 w-full justify-between items-center">
            <div>
            <div className="flex flex-col">
            <div className="flex">
            <h className="font-semibold font-roboto text-sm  mr-2">{nime.length > 13 && !show ? product.name.slice(0,13) + ".." :
            product.name }</h>
            {
              nime.length > 13 && <button onClick={()=> setShow(!show)} className="">{show ? <BiChevronLeft/> : <BiChevronRight/>}</button>
            }
            
            </div>
            <p className="text-xs font-roboto">{product.price.toLocaleString()}/=</p>
            {}
            </div>
            <p className="text-xs flex mt-2 font-open font-light">{product.stock}  {product.stock > 1 ? <p className="ml-1">items</p> : <p className="ml-1">item</p>}</p>
            </div>
            <button onClick={onAdd}
            className="rounded-full absolute mr-1 shadow-xl bottom-1 right-1 size-9 dark:text-gray-950 place-items-center font-bold bg-[#f7d518]"><BiCartAdd className="font-bold text-lg"/></button>
            </div>
            </div>
    );
  }

  export default Product