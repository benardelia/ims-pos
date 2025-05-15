import { useState } from 'react';
import { NavLink, Link } from "react-router";
import { toaster, Toaster } from '../components/ui/toaster';
import axios from 'axios';
import { Input } from '@chakra-ui/react';
import axiosAuthInstance from './axiosAuthInstatnce';
import back from "./asset/bg.jpg"
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: ""
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(null)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
       await axiosAuthInstance.post("/auth/users/", JSON.stringify(formData));
      if (loading) {
        toaster.create({
          title: "creating account!",
          type: "loading",
          duration: 3000
         })
      }
      toaster.create({
        title: " account created!",
        type: "success",
        duration: 1000
       })
        navigate("/login");
        setLoading(false);
    } catch (error) {
      if (error.response) {
        const err = error.response.data
        console.error("login failed:",error.response.data);
        toaster.create({
          title: error.message,
          type: "error",
          duration: 3000
         })
        setLoading(false)
      }
      
    }

  }
  return (
    <div className="flex h-dvh overflow-y-auto w-full">
      <div className='sm:w-2/3 h-dvh overflow-y-auto py-6 w-full flex justify-center bg-[#082d2e]'>
        <div className="w-full font-open sm:px-20 px-10 space-y-4  bg-[#082d2e]  ">
          <h2 className="text-xl font-open text-center text-slate-100">
            Please Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-10 ">
            <div>
              <Input variant="flushed"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3  mt-1 sm:text-xs bg-[#1a5052] text-gray-100 border-gray-50 border-b text-sm"
              />
            </div>
            <div>
              <Input variant="flushed"
                type="email"
                id="email"
                placeholder="Enter e-mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#1a5052] text-gray-100 border-gray-50  sm:py-3 mt-1  text-sm sm:text-xs border-b"
              />
            </div>
            <div>
              <Input variant="flushed"
                type="password"
                placeholder='Enter Password'
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3 mt-1 text-sm sm:text-xs border-b bg-[#1a5052]  border-b-gray-50"
              />
            </div>
            <div>
              <Input variant="flushed"
                type="password"
                placeholder='Confirm Password'
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[#1a5052] text-gray-100 border-b-gray-50 sm:py-3 mt-1 sm:text-xs border-b "/>
              {(formData.password && confirmPassword) !== "" && formData.password !== confirmPassword ? <p className='text-xs mt-2 font-semibold  dark:text-red-400 text-red-600 '>Passwords do not match..</p> :  ( (formData.password && confirmPassword) === "" ) ? <p>  </p> : <p className='text-green-500 text-xs mt-2 font-bold font-poppins'>Passwords match</p> }
            </div>
            <div>
              <Input variant="flushed"
                type="text"
                id="username"
                placeholder="Enter First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full bg-[#1a5052] text-gray-100 border-gray-50 px-4 py-2 sm:py-3 mt-1 sm:text-xs border-b b text-sm"
              />
            </div>
            <div>
              <Input variant="flushed"
                type="text"
                placeholder="Enter Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full bg-[#1a5052] text-gray-100 border-b-gray-50 px-4 py-2 sm:py-3 mt-1 sm:text-xs border-b text-sm"
              />
            </div>
          
            <div>
              <div className="flex mb-2 items-center mx-1">
                <input type='checkbox' value={formData.terms} onChange={handleChange} className="border-b border-b-slate-900 mr-2" /><p className="sm:text-xs text-sm text-gray-100">I agree with <Link className='underline'> terms and regulations</Link></p>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full px-4 hover:font-semibold bg-green-400 text-sm py-3 font-semibold text-gray-900 sm:text-sm  rounded-lg focus:ring-opacity-50"
              >
                Register
              </button>
            </div>
            <Toaster/>
            <p className="text-center text-white pb-8 text-sm font-light">
            Already have an account?
            <Link to="/login" className=" hover:underline">
                 Login
            </Link>
          </p>
          </form>
        </div>
      </div>
      <img src={back} className="sm:w-1/2 w-0 opacity-40 h-dvh relative"/>
    </div>

  );
};

export default Register