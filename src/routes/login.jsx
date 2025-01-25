import { useState } from "react";
import { Avatar } from "../components/ui/avatar";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import apiClient from "../api/axios";
import { Spinner } from "@chakra-ui/react"
import { Button } from "../components/ui/button";
import { Input, Stack } from "@chakra-ui/react"
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { useRef } from "react"

export const Lead = () => {
  return (
    <Spinner
    color="green.700"
    size="md"
  />
  );
}
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://154.118.227.229:1967/auth/jwt/create/", JSON.stringify({username, password}),
      {
        headers: {
          "Content-Type": "application/json",
        }
      },
      );

      if (response.status === 200) {
        const token = response.data.access;
        console.log(token);
        localStorage.setItem('jwt_token', token);
        navigate('/dashboard/home');
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        console.error("login failed:",error.response.data);
      } else {
        console.error("error during login:",error.message);
      }
    }

  }
  return (
    <div className='flex w-full '>
      <div className="flex py-auto w-full items-center justify-center min-h-screen bg-slate-300 dark:bg-slate-500">
        <div className=" px-8 py-12 bg-white dark:bg-slate-800 rounded-lg justify-center shadow-xl w-1/3 h-3/4 my-auto sm:h-4/5">
          <h2 className="text-xl  font-poppins font-semibold text-center text-slate-800 dark:text-slate-50">Please sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-16 my-8 sm:my-16 ">
            <div className="flex flex-col space-y-6 my-4">
            <div>
              <label htmlFor="name" className="block text-md sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                Username:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-gray-50 px-4 border dark:bg-gray-700 mt-1 h-10 sm:h-10  text-md sm:text-sm border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 "
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-50 px-4 border border-gray-300 dark:border-gray-500 dark:bg-gray-700 mt-1 h-10 sm:h-10  text-md sm:text-sm  rounded-lg
   focus:outline-none focus:ring-2 "
              />
            </div>
            </div>
            <button
              type="submit" onClick={handleSubmit}
              className="w-full px-8 text-white bg-slate-600 text-sm sm:text-sm h-10 sm:h-10 rounded-md hover:bg-slate-700
   focus:outline-none focus:ring-2 focus:ring-slate-200 hover:font-bold focus:ring-opacity-50 font-semibold"
            >
              Sign In
            </button>
          </form>
        <p className="text-sm flex items-center font-semibold text-center">
          admin click <Link to="/admin/dashboard" className="mx-1 underline">here</Link></p>
    
        </div>
      </div>
    </div>
  );
}
export default Login;