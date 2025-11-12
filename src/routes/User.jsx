import { Input, NativeSelect } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router";
import { Toaster, toaster } from "../components/ui/toaster";
import { BsArrowLeft } from "react-icons/bs";
import axiosInstance from "./axiosInstance";
import axiosAuthInstance from "./axiosAuthInstatnce";
import axios from "axios";

  

  function User () {
        
       const [img, setImg] = useState(null)
       const [formData, setFormData] = useState({
          username: "",
          email: "",
          image: null,
          userType: "",
          password: "",
          first_name: "",
          last_name: ""
        })
        
        const [confirmPassword, setConfirmPassword] = useState("")
        const [loading, setLoading] = useState(null)
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name] : value,
          });
        };
        
       const handleImgChange = (e) => {
        const file = e.target.files[0];

        setFormData({...formData,image: file});
       }
         
       const data = new FormData();
          data.append("username", formData.username)
          data.append("email", formData.email)
          {  formData.image &&  data.append("image", formData.image) }
          data.append("user_type", formData.userType)
          data.append("password", formData.password)
          data.append("first_name", formData.first_name)
          data.append("last_name", formData.last_name)
          
        const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
           
          
          try {
            const res = await axios.post("http://127.0.0.1:8000/auth/users/",data, {
              headers: {
                'Content-Type':'multipart/form-data'
              }
            });
            toaster.create({
              title: "user created successfully",
              type: "success",
              duration: 4000
             })

              setLoading(false)
          } catch (error) {
              const err = error.response?.data || error.message || "Unknown error";
              console.error("login failed:",err);
              toaster.create({
                title: typeof err === "string" ? err : JSON.stringify(err),
                type: "error",
                duration: 3000
               })
              setLoading(false)
          }
      }
        return (
          <div className="flex relative h-dvh overflow-y-auto w-full">
            <div className=' h-dvh overflow-y-auto py-6 w-full flex justify-center dark:bg-black bg-[#e6e7e7]'>
                <Link to="/admin/management" className="absolute left-12 top-4"><BsArrowLeft/></Link>
              <div className="w-auto font-roboto px-16 pb-12 space-y-1 shadow-xl rounded-xl bg-white dark:bg-opacity-10">
                <h2 className=" font-roboto text-center mt-8 text-slate-900 dark:text-gray-50">
                   Add user
                </h2>
                <form className=" space-y-4 w-96">
                  <div>
                    <Input variant="flushed"
                      type="text"
                      placeholder="Enter Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 sm:py-3  mt-1 sm:text-xs bg-[#eceaea] dark:bg-opacity-10 dark:border-gray-50 border-gray-900 border-b text-sm"
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
                      className="w-full dark:bg-opacity-10 px-4 py-2 bg-[#eceaea] border-gray-900 dark:border-gray-50  sm:py-3 mt-1  text-sm sm:text-xs border-b"
                    />
                  </div>
                    <NativeSelect.Root  variant="flushed" size="xs" width="full" p="" >
                                  <NativeSelect.Field fontSize="sm" placeholder="select user type"
                                  value={formData.userType}
                                  name="userType"
                                  onChange={handleChange}
                                  h="2.9rem"
                                  px="0.5rem"
                                  className="dark:bg-opacity-10 border-b border-black dark:border-gray-200 bg-[#f0ebeb] dark:text-white"
                                  >
                                  <option value="Owner" className="dark:bg-[#363636]">owner</option>
                                  <option value="Staff" className="dark:bg-[#363636]">Staff</option>
                                  </NativeSelect.Field>
                                  <NativeSelect.Indicator />
                                </NativeSelect.Root>
                  <div>
                    <Input variant="flushed"
                      type="password"
                      placeholder='Enter Password'
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 dark:bg-opacity-10 sm:py-3 mt-1 text-sm sm:text-xs border-b dark:border-gray-50 bg-[#eceaea]  border-b-gray-900"
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
                      className="w-full px-4 py-2 bg-[#eceaea] dark:border-gray-50 dark:bg-opacity-10  border-b-gray-900 sm:py-3 mt-1 sm:text-xs border-b "/>
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
                      className="w-full bg-[#eceaea] dark:bg-opacity-10 dark:border-gray-50 border-gray-900 px-4 py-2 sm:py-3 mt-1 sm:text-xs border-b b text-sm"
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
                      className="w-full dark:border-gray-50 bg-[#eceaea] dark:bg-opacity-10 border-b-gray-900 px-4 py-2 sm:py-3 mt-1 sm:text-xs border-b text-sm"
                    />
                  </div>
                  <div>
                    <div className="flex mb-2 items-center mx-1">
                    <input type="file" onChange={handleImgChange} className="bg-[#f0ebeb] w-full border-b border-black dark:border-gray-200  text-sm py-2 px-2 dark:bg-opacity-10"/>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="w-full px-4 hover:font-semibold bg-yellow-500 text-sm py-2 font-semibold text-gray-900 sm:text-sm  rounded-sm focus:ring-opacity-50"
                    >
                      Add
                    </button>
                  </div>
                  <Toaster/> 
                </form>
              </div>
            </div>
          </div>
        );
  }

export default User