import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate();
        const token = localStorage.getItem('jwt_token');
        console.log(token)
    return (
            <div className="flex h-svh flex-col overflow-y-auto w-full">
            <div className="w-full bg-[#082d2e]">
                <div className="flex justify-between mx-6 sm:mx-24 mt-4">
                    <h2 className="  font-roboto text-lg font-bold text-gray-50">GrandyPOS</h2>
                    <ul className="flex   font-roboto text-gray-50 text-sm flex-row space-x-6">
                        <li className="  font-roboto">features</li>
                        <li className="">pricing</li>
                        <li className="">about</li>
                    </ul>
                </div>
                <div className="flex sm:flex-row flex-col mx-8 sm:items-center h-full">
                    <div className=" py-6">
                    <h1 className="  font-roboto font-extralight text-5xl sm:text-7xl text-gray-50 py-6 text-center sm:text-start">GrandyPOS. For Smart, Simple and Seamless Sales.</h1>
                    <p className="sm:text-md sm:w-5/6 text-center sm:text-start  font-roboto text-lg my-8 text-gray-100">Whether you run a retail store, pharmacy, or supermarket, our powerful tools are built to keep your operations smooth.</p>
                    <div className="w-full pb-6 bg-gradient-to-r from-[[#082d2e]/0 via-[[#082d2e]/50 to-[[#082d2e]">
                    <button onClick={()=>navigate("/login")} className="bg-green-400 font-roboto flex sm:justify-self-start justify-self-center font-semibold text-gray-800 py-2 sm:px-8 px-24 mt-4 rounded-md">Get started</button>
                     </div>
                    </div>   
                </div>
            </div>
            <div className=" h-60 w-full bg-green-400 p-4">
               <h1 className="font-normal text-gray-900 sm:justify-self-center mt-6 text-xl flex items-center text-center   font-roboto">Trusted by Companies and solo enterprises. </h1>
            </div>
            </div>
    )
}
export default Home;