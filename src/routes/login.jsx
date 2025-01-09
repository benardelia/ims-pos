import { useState } from "react";
import { Avatar } from "../components/ui/avatar";
import { useNavigate } from "react-router";


    const users = [
    {
        id:0,
        name: "Nassir Amir",
        pass: "1234"
    },
    {
    id:1,
    name: "Benaugust",
    pass: "2345"
    },
    {
    id:2,
    name: "Goodluck John",
    pass: "3456"
    } 
]


  function UserList ({users, onTouch}) {
    return (
      <div className="h-80 rounded-lg w-1/2 items-center mx-8 bg-inherit">
            {users.map(user =>
        <div key={user.id} 
         className="m-2  px-6 w-96 py-4 border text-slate-50
         items-center border-slate-100 rounded-lg
         hover:bg-slate-600 hover:text-gray-800
         hover:border-gray-900 flex "
         onClick={()=>{onTouch(user)}}
         >
        <Avatar name={user.name}/>
        <h className="ml-6 font-semibold text-white">{user.name}</h>
       </div>
         )}
            </div>
    )
  }
   const Number = ({value}) => {
    return (
      <button className="text-gray-100 text-lg size-14 p-3 bg-gray-700 shadow-sm rounded-md">{value}</button>
    );
   }
   const Show = ({user,numbers}) => {
   
    return (
      <div className="flex flex-col">
      <h className="font-semibold text-gray-100">{user.name}</h>
      </div>
    )
   }
 const Login = () => {
  const [keeper, setKeeper] = useState(users[0]);
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <div className="bg-gray-900 w-full h-svh">
        <div className="bg-inherit flex py-48 w-screen">
              <UserList users={users}
                        onTouch={user => setKeeper(user) }
                        />
                        <div className="w-1/2 flex flex-col">
                           <Show user={keeper}/>
                           <input type="password" value={pass} onChange={(e)=> setPass(e.target.value)} 
                           className="bg-gray-800 pl-4 text-gray-100 text-lg rounded-md h-14 w-3/4"/>
                        </div>
                        {
                          (keeper.pass === pass && 
                            navigate("/dashboard/home"))
                        }
      </div>
    </div>
  );
};
export default Login