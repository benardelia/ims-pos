import { useState } from "react";
import { Avatar } from "../components/ui/avatar";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import apiClient from "../api/axios";
import { Checkbox, Spinner } from "@chakra-ui/react"
import { Button } from "../components/ui/button";
import { Input, Stack, defineStyle,Field } from "@chakra-ui/react"
import { BiArrowBack } from "react-icons/bi";
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
import { Box } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
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
  const [loading, setLoading] = useState();
  const ref = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://10.219.31.111:8000/auth/jwt/create/", JSON.stringify({username, password}),
      {
        headers: {
          "Content-Type": "application/json",
        }
      },
      );

      if (response.status === 200) {
        const token = response.data.access;
        localStorage.setItem('jwt_token', token);
        navigate('/dashboard/home');
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        console.error("login failed:",error.response.data);
      }
      navigate("/")
    }

  }
  return (
    <div className="flex w-full relative font-open">
      <div className="sm:w-1/2 bg-[#082d2e]"></div>
      <Link to="/" className="absolute text-white left-8 top-8"><BiArrowBack/></Link>
      <div className="flex flex-col py-auto w-full sm:w-1/2 items-center justify-center min-h-screen dark:bg-slate-500">
        <div className=" py-12 dark:bg-slate-800 justify-center w-2/3 h-3/4 sm:h-5/6">
          <h2 className="text-2xl font-poppins font-semibold text-slate-800 dark:text-slate-50">Welcome</h2>
          <p className="text-xs font-open">please enter login details below</p>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center h-4/5">
          <div className="flex flex-col space-y-12 my-16">
            <Field.Root>
              <Input
                type="text"
                variant="flushed"
                placeholder="Enter Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 border-b mt-1 text-gray-900 bg-green-50 border-[#082d2e] h-10 sm:h-10  text-md sm:text-sm"
              />
            </Field.Root>
              <PasswordInput
              placeholder="Enter Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 border-b border-[#082d2e] mt-1 h-10 sm:h-10 bg-green-50 text-md sm:text-sm"
              />
             
            </div>
            <div className="flex justify-between my-8">
               <div className="flex items-center"><input type='checkbox' className=" border mx-2 border-slate-900 " />
               <p className=" text-sm">remember me</p>
               </div>
              <Link className="text-sm underline">Forgot password?</Link>
            </div>
            <button
              type="submit" onClick={handleSubmit}
               className="py-3 bg-[#082d2e] text-sm sm:text-sm h-10 sm:h-10 rounded-md text-gray-100 hover:font-bold font-semibold"
            >
              Sign In
            </button>
          </form>
        
        </div>
        <p className="text-sm font-open">Don't have an account? Please <Link to="/register" className="underline">register</Link></p>
      </div>
    </div>
  );
}

    const floatingStyle = defineStyle({
      pos: "absolute",
      bg: "bg",
      px:"0.5",
      top: "-0.3",
      insetStart: "2",
      pointerEvents: "none",
      transition: "position",
      _peerPlaceholderShown: {
        color: "fg.muted",
        top: "2.5",
        insetStart: "3"
      },
      _peerFocusVisible: {
        color: "fg",
        tp: "-3",
        insetStart: "2"
      }
    })

export default Login;