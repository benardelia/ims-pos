import { useState } from 'react';
import { NavLink, Link } from "react-router";
import { toaster, Toaster } from '../components/ui/toaster';
import axios from 'axios';


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
       await axios.post("http://192.168.245.111:8000/auth/users/", formData,
      {
        headers: {
          "Content-Type": "application/json",
        }
      },
      );
      toaster.create({
        title: "creating account!",
        type: "loading",
        duration: 3000
       })
        navigate('/login');
        setLoading(false);
    } catch (error) {
      if (error.response) {
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
    <div className="flex w-full bg-slate-100">
      <div className='sm:w-2/3 w-full flex h-auto mx-6 justify-center  bg-green-100'>
        <div className="w-full font-open sm:w-3/4 my-8 px-4 py-4 space-y-8 bg-white rounded-xl font-poppins shadow-xl">
          <h2 className="text-xl font-open text-center text-slate-800">
            Please Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-10 ">
            <div>
              <label
                htmlFor="username"
                className="block text-sm  sm:text-xs font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3 mt-1 sm:text-xs border border-gray-300 rounded-md
 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block sm:text-xs text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3 mt-1 text-sm sm:text-xs border border-gray-300 rounded-md
 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block sm:text-xs text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 sm:py-3 mt-1 text-sm sm:text-xs border border-gray-300 rounded-md
 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block sm:text-xs text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 mt-1 sm:text-xs border border-gray-300 rounded-md
 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              {(formData.password && confirmPassword) !== "" && formData.password !== confirmPassword ? <p className='text-xs mt-2 font-semibold  text-red-500 '>Passwords do not match..</p> :  ( (formData.password && confirmPassword) === "" ) ? <p>  </p> : <p className='text-green-700 text-xs mt-2 font-bold font-poppins'>Passwords match</p> }
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm  sm:text-xs font-medium text-gray-700"
              >
              First Name
              </label>
              <input
                type="text"
                id="username"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3 mt-1 sm:text-xs border border-gray-300 rounded-md
 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm  sm:text-xs font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="username"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 sm:py-3 mt-1 sm:text-xs border border-gray-300 rounded-md
 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
              />
            </div>
            
           
            
            <div>
              <div className="flex mb-2 items-center mx-1">
                <input type='checkbox' value={formData.terms} onChange={handleChange} className="focus: border border-slate-900 mr-2" /><p className="sm:text-xs text-sm">I agree with <Link className='underline'> terms and regulations</Link></p>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full px-4 hover:font-semibold mb-4 text-sm py-3 text-white bg-[#082d2e] sm:text-sm  rounded-lg focus:ring-opacity-50"
              >
                Register
              </button>
            </div>
            <Toaster/>
          </form>
          <p className="sm:text-sm text-center text-gray-700 ">
            Already have an account?{"  "}
            <Link to="/login" className="text-slate-800 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className='sm:w-1/2 h- bg-[#082d2e]'></div>
    </div>

  );
};

export default Register