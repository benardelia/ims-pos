import { useState } from "react";
import { BiCartAdd, BiChevronDown, BiChevronUp } from "react-icons/bi";

const Product = ({product, onAdd}) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative flex bg-white dark:bg-opacity-10 text-gray-950 dark:text-gray-100 flex-col rounded-lg dark:shadow-gray-200
                    justify-end pb-3 md:h-48 h-40 w-full">
            <div className="flex justify-between mx-2 items-center">
            <div>
            <div className="flex flex-col">
            <div className="flex">
            <h className=" font-roboto mr-2">{product.name}</h>
            <button onClick={()=> setShow(!show)} className="">{show ? <BiChevronUp/> : <BiChevronDown/>}</button>
            </div>
            <p className="text-xs font-roboto">{product.price.toLocaleString()}/=</p>
            { show && <p className="text-xs font-extralight  font-roboto max-w-28 max-h-32 py-2">{product.description}</p> }
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