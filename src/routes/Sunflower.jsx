import { BsCartFill, BsPhoneFill } from "react-icons/bs"
import logo from "./asset/pelu-2.png"
import back from "./asset/cow.jpg"
import { GiSunRadiations, GiThreeLeaves } from "react-icons/gi"
import { FiSun } from "react-icons/fi"
import { IoSunnyOutline } from "react-icons/io5"
import { PiChefHatThin } from "react-icons/pi"
import door from "./asset/pelu-1.png"
import { FaFacebookF, FaInstagram, FaLocationPin, FaPhone, FaWhatsapp } from "react-icons/fa6"
import { MdLocationPin } from "react-icons/md"
import { BiPhone } from "react-icons/bi"
export default function Sunflower () {
    return (
        <div className="w-full relative min-h-svh overflow-y-auto">
            <div className="bg-white drop-shadow-lg z-50 shadow-green-900 fixed w-full top-0 p-1 flex items-center justify-around">
                <img src={logo} className=" h-16"/>
                <div className="flex space-x-8">
                    <a className="font-open text-lg font-bold text-gray-800 active:text-yellow-600">Home</a>
                    <a className="font-open text-lg font-bold text-gray-800 active:text-yellow-600">Products</a>
                    <a className="font-open text-lg font-bold text-gray-800 active:text-yellow-600">Recipes</a>
                    <a className="font-open text-lg font-bold text-gray-800 active:text-yellow-600">About Us</a>
                    <a href="#contacts" className="font-open text-lg font-bold text-gray-800 active:text-yellow-600">Contacts</a>
                </div>
                <BsCartFill className=""/>
            </div>
        <div className="w-full max-h-lvh flex justify-center">
            <img src={back} className="w-full h-full"/>
            <div className=" w-2/3 absolute  py-36 place-items-center flex flex-col justify-self-center">
            <h1 className="text-6xl text-center text-white font-light font-plus">Pelu Sunflower Oil: Nurturing Goodness from the Heart of the Sun.</h1>
            <p className="font-medium py-4 text-lg font-open text-white text-center">Pure sunflower oil from the sunny lands of Dodoma.</p>
             <button className="w-1/3 text-sm  font-semibold text-white bg-orange-500 rounded-full p-2">explore our products</button>
            </div>
        </div>
            <div className="bg-yellow-200 flex-row space-x-16 flex justify-center place-items-center p-12">
                <div className="bg-white shadow-xl hover:size-56 drop-shadow-xl shadow-yellow-800 rounded-xl flex flex-col py-4 justify-evenly place-items-center size-56">
                   <IoSunnyOutline className="text-6xl font-extralight"/>
                   <div className="flex flex-col">
                   <h4 className="font-roboto font-medium">Sun-kissed Goodness</h4>
                   <p className="font-plus font-medium text-xs">healthy grown sunflowers</p>
                   </div>
                </div>
                <div className="bg-white shadow-xl hover:size-56 drop-shadow-xl shadow-yellow-800 rounded-xl flex flex-col py-4 justify-evenly place-items-center size-56">
                   <PiChefHatThin className="text-6xl font-extralight"/>
                   <div className="flex place-items-center flex-col">
                   <h4 className="font-roboto font-medium">Versatile & Delicious</h4>
                   <p className="font-plus font-medium text-center text-xs">cooking oil for delicious meals everyday</p>
                   </div>
                </div>
                <div className="bg-white shadow-xl hover:size-56 drop-shadow-xl shadow-yellow-800 rounded-xl flex flex-col p-4 justify-evenly place-items-center size-56">
                   <GiThreeLeaves className="text-6xl font-extralight"/>
                   <div className="flex flex-col place-items-center">
                   <h4 className="font-roboto font-medium">Naturally Healthy</h4>
                   <p className="font-plus text-center font-medium text-xs">naturally grown for your the best health</p>
                   </div>
                </div>
            </div>
            <div id="contacts" className="bg-green-900 h-60 p-4 flex items-center justify-between">
            <div className="flex items-center">
             <img src={door} className="h-24 bg-green-400 rounded-xl"/>
             <div className="ml-4">
                <h2 className="text-white font-plus font-medium">Pelu Sunflower Oil,</h2>
                <p className="text-white font-plus font-medium">P.O BOX 34567,</p>
                <p className="text-white font-plus font-medium">Dodoma.</p>
                <div className="flex items-center">
                    <MdLocationPin className=" text-red-400"/>
                    <p className="text-white font-medium">Mbande Junction, Kongwa.</p>
                </div>
             </div>
            </div>
              <div className="">
                <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-yellow-400">
                      <FaFacebookF className=""/>
                    </div>
                    <div className="p-2 rounded-full bg-yellow-400">
                      <FaWhatsapp className=""/>
                    </div>
                    <div className="p-2 rounded-full bg-yellow-400">
                        <FaInstagram className=""/>
                    </div>
                </div>
                <div className="flex mt-4 items-center">
                    <FaPhone className="text-white mr-3"/>
                    <p className="font-plus text-white font-semibold">0755-991530</p>
                </div>
             </div>             
            </div>



        </div>
    )
}