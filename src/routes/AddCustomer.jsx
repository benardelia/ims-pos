import { Input, NativeSelect } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router";
import { Toaster, toaster } from "../components/ui/toaster";
import { BsArrowLeft } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";


  function AddCustomer () {
       const [formData, setFormData] = useState({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          address: "",
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
             await axiosInstance.post("/store/customers/", JSON.stringify(formData));
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
              <div className="w-auto font-roboto px-16 pb-12 space-y-1 place-items-center shadow-xl rounded-xl bg-white dark:bg-opacity-10">
                <h2 className=" font-roboto text-center mt-8 text-slate-900 dark:text-gray-50">
                   Add Customer
                </h2>
                {loading &&
                <div className="p-4 bg-opacity-15 absolute top-4 left-1/2 rounded-xl"><p className="flex text-sm items-center"><CgSpinner className="animate-spin"/> Posting </p></div>
  }
                <form onSubmit={handleSubmit} className=" space-y-6 w-96">
               
                  
                  <div>
                    <Input variant="flushed"
                      type="text"
                      id="username"
                      placeholder="Enter First Name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#eceaea] dark:bg-opacity-10 text-gray-100 dark:border-gray-50 border-gray-900 px-4 py-2 sm:py-3 mt-1 sm:text-xs border-b b text-sm"
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
                      className="w-full dark:border-gray-50 bg-[#eceaea] dark:bg-opacity-10 text-gray-100 border-b-gray-900 px-4 py-2 sm:py-3 mt-1 sm:text-xs border-b text-sm"
                    />
                  </div>
                  
                  <div>
                    <Input variant="flushed"
                      type="text"
                      placeholder="Enter Phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full dark:border-gray-50 bg-[#eceaea] dark:bg-opacity-10 text-gray-100 border-b-gray-900 px-4 py-2 sm:py-3 mt-1 sm:text-xs border-b text-sm"
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
                      className="w-full dark:bg-opacity-10 px-4 py-2 bg-[#eceaea] text-gray-100 border-gray-900 dark:border-gray-50  sm:py-3 mt-1  text-sm sm:text-xs border-b"
                    />
                  </div>
                  <div>
                    <Input variant="flushed"
                      type="text"
                      placeholder="Enter Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full dark:border-gray-50 bg-[#eceaea] dark:bg-opacity-10 text-gray-100 border-b-gray-900 px-4 py-2 sm:py-3 mt-1 sm:text-xs border-b text-sm"
                    />
                  </div>
                  <div>
                    <div className="flex mb-2 items-center mx-1">
                    
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 hover:font-semibold bg-[#f7d518] text-sm py-2 font-semibold text-gray-900 sm:text-sm  rounded-sm focus:ring-opacity-50"
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


  export default AddCustomer;