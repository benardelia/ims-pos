import { useState } from "react";
import { Avatar } from "../components/ui/avatar";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import apiClient from "../api/axios";
import { Checkbox, Spinner } from "@chakra-ui/react"
import { Button } from "../components/ui/button";
import { Input, Stack, defineStyle,Field } from "@chakra-ui/react"
import { BiArrowBack } from "react-icons/bi";
import back from "./asset/bg.jpg"
import { useEffect } from "react";
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
import { Toaster, toaster } from "../components/ui/toaster";
import axiosAuthInstance from "./axiosAuthInstatnce";

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
      const response = await axiosAuthInstance.post("/auth/jwt/create/", JSON.stringify({username, password}));

      if (response.status === 200) {
        const token = response.data.access;
      localStorage.setItem("jwt_token", token);
        setLoading(false);
        navigate("/dashboard/home");
      }
    } catch (error) {
        const err = error.response.data
        console.error(error.response.data);
      toaster.create({
                title: err.detail,
                type: "error",
                duration: 3000
               })
               setLoading(false)
    }

  }
  return (
    <div className="flex h-full w-full relative   font-open">
      <Toaster/>
      <img src={back} className="sm:w-1/2 w-0 opacity-80 h-full relative"/>
      <Link to="/" className="absolute text-white left-8 top-8"><BiArrowBack/></Link>
      <div className="flex flex-col py-auto w-full sm:w-1/2 items-center justify-center  min-h-screen bg-[#082d2e]">
        <div className=" sm:py-12  justify-center sm:w-2/3 w-10/12 h-3/4 sm:h-5/6">
          <h2 className="text-2xl font-poppins text-gray-100 font-semibold">Welcome</h2>
          <p className="sm:text-xs text-sm  text-gray-100 font-open">please enter login details below</p>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center h-4/5">
          <div className="flex flex-col space-y-12 my-16">
            <Field.Root>
              <Input
                type="text"
                required
                variant="flushed"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 border-b mt-1 bg-[#1a5052] text-gray-100 border-b-gray-50  h-10 sm:h-10  text-md sm:text-sm"
              />
            </Field.Root>
              <PasswordInput
              required
              variant="flushed"
              placeholder="Enter Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a5052] px-4 border-b text-gray-100  border-b-gray-50 mt-1 h-10 sm:h-10 text-md sm:text-sm"
              />
             
            </div>
            <div className="flex justify-between my-8">
               <div className="flex items-center"><input type='checkbox' className=" border mx-2 border-slate-900 " />
               <p className=" font-light text-gray-100 text-sm">remember me</p>
               </div>
              <Link className="text-sm font-light text-gray-100 underline">Forgot password?</Link>
            </div>
            <button
              type="submit" disabled={loading}
               className="py-3 bg-green-400 text-sm sm:text-sm h-10 sm:h-10 rounded-md text-gray-900 hover:font-bold font-semibold"
            >
              Sign In
            </button>
          </form>
        </div>
        {loading && <p className="">submitting..</p>}
        <p className="   font-open text-sm text-gray-100 font-light">Don't have an account? Please <Link to="/register" className="underline">register</Link></p>
      </div>
    </div>
  );
}

export default Login;