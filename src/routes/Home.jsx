import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate();
        const token = localStorage.getItem('jwt_token');
        console.log(token)
    return (
        <div className="w-full bg-gray-100 dark:bg-slate-600 h-svh">
            <div className="flex flex-col">
             <h1 className="text-4xl font-open text-gray-900 dark:text-gray-100 mt-72 text-center font-bold">Welcome to GrandyPOS</h1>
             <p className="font-bold text-center dark:text-gray-200 text-gray-950 mb-2 text-lg font-open mt-12"></p>
             <button onClick={()=> navigate("/login")} 
               className="px-4 mx-auto py-2 font-bold text-xl 
               rounded-md bg-custom font-open dark:bg-slate-300 dark:text-slate-900 w-96">Login</button>
           </div>
        </div>
    )
}
export default Home;