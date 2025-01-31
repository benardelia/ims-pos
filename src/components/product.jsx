import { useState } from "react";
import { BiCartAdd, BiChevronDown, BiChevronUp } from "react-icons/bi";

const Product = ({product, onAdd}) => {
    const [show, setShow] = useState(false);
    return (
        <div className=" flex bg-gray-200 dark:bg-gray-800 text-gray-950 dark:text-white flex-col rounded-lg shadow dark:shadow-gray-200
                    justify-end pb-3 md:h-52 sm:h-44 w-full">
            <div className="flex justify-between mx-2 items-center">
            <div>
            <p className="text-xs font-bold">{product.price}/-</p>
            <div className="flex flex-col">
            <div className="flex">
            <h className="font-bold mr-2">{product.name}</h>
            <button onClick={()=> setShow(!show)} className="">{show ? <BiChevronUp/> : <BiChevronDown/>}</button>
            </div>
            { show && <p className="text-xs max-w-28 max-h-32 py-2">{product.description}</p> }
            </div>
            <p className="text-xs">{product.stock} items</p>
            </div>
            <button onClick={onAdd}
            className="rounded-full size-8 place-items-center border border-gray-600 bg-inherit  font-light"><BiCartAdd/></button>
            </div>
            </div>
    );
  }

  export default Product