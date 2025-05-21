import { useState } from "react";
import { BiCartAdd, BiChevronDown, BiChevronUp } from "react-icons/bi";

const Product = ({product, onAdd, image}) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative flex bg-white dark:bg-opacity-10 text-gray-950 dark:text-gray-100 flex-col rounded-lg dark:shadow-gray-200
                      md:h-48 h-40 w-full">
                      <div className="h-3/4 rounded-t-md bg-[#e2dede] dark:bg-opacity-30 animate-pulse">
                         <img src={image} className="h-full w-full"/>
                      </div>
            <div className="flex h-1/4 justify-between m-2 items-center">
            <div>
            <div className="flex flex-col">
            <div className="flex">
            <h className=" font-open text-sm mr-2">{product.name}</h>
            <button onClick={()=> setShow(!show)} className="">{show ? <BiChevronUp/> : <BiChevronDown/>}</button>
            </div>
            <p className="text-xs font-open">{product.price.toLocaleString()}/=</p>
            { show && <p className="text-xs font-extralight  font-open max-w-28 max-h-32 py-2">{product.description}</p> }
            </div>
            <p className="text-xs flex mt-2 font-light">{product.stock}  {product.stock > 1 ? <p className="ml-1">items</p> : <p className="ml-1">item</p>}</p>
            </div>
            <button onClick={onAdd}
            className="rounded-full `absolute shadow-lg bottom-1 right-1 size-8 dark:text-gray-950 place-items-center font-bold bg-custom"><BiCartAdd className="font-bold text-lg"/></button>
            </div>
            </div>
    );
  }

  export default Product