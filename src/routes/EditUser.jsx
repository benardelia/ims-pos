import { Input, NativeSelect } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Toaster, toaster } from "../components/ui/toaster";
import { BsArrowLeft } from "react-icons/bs";
import axiosInstance from "./axiosInstance";
import axiosAuthInstance from "./axiosAuthInstatnce";
import axios from "axios";

  

  function EditUser () {
     const { id } = useParams()        
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
        useEffect(()=> {
          axiosInstance.get(`/core/user/${id}`)
        .then(res=> {
            setFormData({
          username: res.data.username,
          email: res.data.email,
          image: res.data.image,
          userType: res.data.user_type,
          first_name: res.data.first_name,
          last_name: res.data.last_name
        })
        })
        },[])
        
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
            const res = await axios.put("http://127.0.0.1:8000/auth/users/", data, {
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
              <div className="w-1/3 font-roboto px-8 pb-12 space-y-1 shadow-xl rounded-xl bg-white dark:bg-opacity-10">
                <h2 className="font-roboto text-center my-8 text-slate-900 dark:text-gray-50">
                   Edit user
                </h2>
                <form className=" space-y-4 w-full">
                  <div>
                    <Input variant="outline"
                      type="text"
                      placeholder="Enter Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="bg-[#f5f4f4] dark:bg-opacity-10 dark:text-gray-50 text-xs px-4"
                    />
                  </div>
                  <div>
                    <Input variant="outline"
                      type="email"
                      id="email"
                      placeholder="Enter e-mail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-[#f5f4f4] dark:bg-opacity-10 dark:text-gray-50 text-xs px-4"
                        />
                  </div>
                    <NativeSelect.Root  variant="outline" size="xs" width="full" p="" >
                                  <NativeSelect.Field fontSize="sm" placeholder="select user type"
                                  value={formData.userType}
                                  name="userType"
                                  onChange={handleChange}
                                  h="2.9rem"
                                  px="0.5rem"
                                  className="bg-[#f5f4f4] dark:bg-opacity-10 dark:text-gray-50 text-xs px-4"
                                  >
                                  <option value="Owner" className="dark:bg-[#363636]">owner</option>
                                  <option value="Staff" className="dark:bg-[#363636]">Staff</option>
                                  </NativeSelect.Field>
                                  <NativeSelect.Indicator />
                                </NativeSelect.Root>
                  <div>
                    <Input variant="outline"
                      type="password"
                      placeholder='Enter Password'
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="bg-[#f5f4f4] dark:bg-opacity-10 dark:text-gray-50 text-xs px-4"
                    />
                  </div>
                  <div>
                    <Input variant="outline"
                      type="password"
                      placeholder='Confirm Password'
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                      required
                      className="bg-[#f5f4f4] dark:bg-opacity-10 dark:text-gray-50 text-xs px-4"/>
                    {(formData.password && confirmPassword) !== "" && formData.password !== confirmPassword ? <p className='text-xs mt-2 font-semibold  dark:text-red-400 text-red-600 '>Passwords do not match..</p> :  ( (formData.password && confirmPassword) === "" ) ? <p>  </p> : <p className='text-green-500 text-xs mt-2 font-bold font-poppins'>Passwords match</p> }
                  </div>
                  <div>
                    <Input variant="outline"
                      type="text"
                      id="username"
                      placeholder="Enter First Name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="bg-[#f5f4f4] dark:bg-opacity-10 dark:text-gray-50 text-xs px-4"
                      />
                  </div>
                  <div>
                    <Input variant="outline"
                      type="text"
                      placeholder="Enter Last Name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                     className="bg-[#f5f4f4] dark:bg-opacity-10 dark:text-gray-50 text-xs px-4"
                     />
                  </div>
                  <div>
                    <div className="flex mb-2 items-center mx-1">
                    <input type="file" onChange={handleImgChange} className="bg-[#f5f4f4] dark:bg-opacity-10 dark:text-gray-50 text-xs w-full p-4"/>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="w-full px-4 hover:font-semibold bg-yellow-500 text-sm py-2 font-semibold text-gray-900 sm:text-sm  rounded-sm focus:ring-opacity-50"
                    >
                      Update user
                    </button>
                  </div>
                  <Toaster/> 
                </form>
              </div>
            </div>
          </div>
        );
  }

export default EditUser