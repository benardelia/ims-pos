import { Input, NativeSelect } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router";
import { Toaster, toaster } from "../components/ui/toaster";
import { BsArrowLeft } from "react-icons/bs";


  function User () {
       const [formData, setFormData] = useState({
          username: "",
          email: "",
          userType: "",
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
             await axiosAuthInstance.post("/core/users/", JSON.stringify(formData));
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
              navigate("/admin/management");
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
          <div className="flex relative h-dvh overflow-y-auto w-full">
            <div className=' h-dvh overflow-y-auto py-6 w-full flex justify-center dark:bg-black bg-[#e6e7e7]'>
                <Link to="/admin/management" className="absolute left-12 top-4"><BsArrowLeft/></Link>
              <div className="w-auto font-open px-16 pb-12 space-y-1 shadow-xl rounded-xl bg-white dark:bg-opacity-10">
                <h2 className=" font-open text-center mt-8 text-slate-900 dark:text-gray-50">
                   Add user
                </h2>
                <form onSubmit={handleSubmit} className=" space-y-8 w-96">
                  <div>
                    <Input variant="flushed"
                      type="text"
                      placeholder="Enter Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 sm:py-3  mt-1 sm:text-xs bg-[#eceaea] dark:bg-opacity-10 text-gray-100 border-gray-900 border-b text-sm"
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
                      className="w-full dark:bg-opacity-10 px-4 py-2 bg-[#eceaea] text-gray-100 border-gray-900  sm:py-3 mt-1  text-sm sm:text-xs border-b"
                    />
                  </div>
                    <NativeSelect.Root  variant="flushed" size="sm" width="full" p="" >
                                  <NativeSelect.Field placeholder="select user type"
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
                      className="w-full px-4 py-2 dark:bg-opacity-10 sm:py-3 mt-1 text-sm sm:text-xs border-b bg-[#eceaea]  border-b-gray-900"
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
                      className="w-full px-4 py-2 bg-[#eceaea] dark:bg-opacity-10 text-gray-100 border-b-gray-900 sm:py-3 mt-1 sm:text-xs border-b "/>
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
                      className="w-full bg-[#eceaea] dark:bg-opacity-10 text-gray-100 border-gray-900 px-4 py-2 sm:py-3 mt-1 sm:text-xs border-b b text-sm"
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
                      className="w-full bg-[#eceaea] dark:bg-opacity-10 text-gray-100 border-b-gray-900 px-4 py-2 sm:py-3 mt-1 sm:text-xs border-b text-sm"
                    />
                  </div>
                
                  <div>
                    <div className="flex mb-2 items-center mx-1">
                      <p className="sm:text-xs text-sm text-gray-100">I agree with <Link className='underline'> terms and regulations</Link></p>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 hover:font-semibold bg-custom text-sm py-2 font-semibold text-gray-900 sm:text-sm  rounded-sm focus:ring-opacity-50"
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


  export default User;