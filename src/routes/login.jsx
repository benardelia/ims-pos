import { useState } from "react";
import { Avatar } from "../components/ui/avatar";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <div className='flex w-full '>
      <div className="flex py-auto w-full items-center justify-center min-h-screen bg-blue-50 dark:bg-slate-500">
        <div className=" px-8 py-12 bg-white dark:bg-slate-800 rounded-lg justify-center shadow-xl w-1/3 h-3/4 my-auto sm:h-4/5">
          <h2 className="text-xl  font-poppins text-center text-slate-800 dark:text-slate-50">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-14 my-8 sm:my-16 ">
            <div>
              <label htmlFor="email" className="block text-md sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 h-10 sm:h-10  text-md sm:text-sm border border-gray-300 rounded-lg
   focus:outline-none focus:ring-2 "
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 h-10 sm:h-10  text-md sm:text-sm border border-gray-300 rounded-lg
   focus:outline-none focus:ring-2 "
              />
            </div>
            <button
              type="submit"
              onClick={() => navigate('/dashboard/home')}
              className="w-full px-8 py-2 text-white bg-slate-700 text-sm sm:text-sm h-10 sm:h-10 rounded-md hover:bg-slate-800
   focus:outline-none focus:ring-2 focus:ring-slate-200 hover:font-bold focus:ring-opacity-50 font-semibold"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login