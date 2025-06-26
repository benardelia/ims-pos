import { useNavigate } from "react-router";
import logo from "./asset/logo.png"
const Home = () => {
    const navigate = useNavigate();
    return (
            <div className="flex h-dvh relative flex-col overflow-y-auto w-full">
                
            <div className="w-full h-3/4 bg-[#62c29a] bg-opacity-10">
                
                <div className="flex justify-between z-50 mx-6 sm:mx-24 mt-4">
                    <ul className="flex font-roboto text-sm flex-row space-x-6">
                        <li className="font-roboto">features</li>
                        <li className="">pricing</li>
                        <li className="">about</li>
                    </ul>
                    <div className="">
                      
                    </div>
                    
                </div>
                <div className="flex sm:flex-row flex-col mx-8 sm:items-center h-full">
                    <div className="sm:w-3/4">
                    <h1 className="font-roboto font-extralight text-7xl sm:text-5xl pb-6 text-center sm:text-start">GrandyPOS. For Smart, Simple and Seamless Sales.</h1>
                    <p className="sm:text-md sm:w-5/6 text-center sm:text-start  font-roboto py-8">Whether you run a retail store, pharmacy, or supermarket, our powerful tools are built to keep your operations smooth.</p>
                    <button onClick={()=>navigate("/login")} className="bg-green-400 font-roboto flex sm:justify-self-start justify-self-center font-semibold text-gray-800 py-2 sm:px-8 px-24 mt-4 rounded-md">Get started</button>
                    </div>
                   <img src={logo} className="sm:h-1/2 "/>
                </div>
            </div>
            <div className=" h-1/2 w-full bg-green-400 p-4">
               <h1 className="font-normal text-gray-900 sm:justify-self-center mt-6 text-xl flex items-center text-center   font-roboto">Trusted by Companies and solo enterprises. </h1>
            </div>
            </div>
    )
}
export default Home;