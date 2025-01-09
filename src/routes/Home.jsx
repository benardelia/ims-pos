import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-slate-900 h-svh">
            <div className="flex flex-col">
             <h1 className="text-4xl text-gray-100 mt-72 text-center font-bold">You're Welcomed To Your Shop</h1>
             <p className="font-bold text-center text-gray-200 mb-2 text-lg font-mono mt-12">log in to continue..</p>
             <button onClick={()=> navigate("/login")} 
               className="px-4 mx-auto py-2 font-bold text-lg rounded-md bg-slate-200 w-96">Login</button>
           </div>
        </div>
    )
}
export default Home;