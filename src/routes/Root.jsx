import { Input } from "@chakra-ui/react"
import { Button } from "../components/ui/button"
import { Link, Outlet, useLoaderData } from "react-router"


function Root() {
    return (
      <div className="w-full flex min-h-screen">
        <div className="w-1/4 h-dvh bg-gray-900 rounded-lg py-4">

        </div>
        <div className="w-3/4 min-h-screen">
        </div>
      </div>
    )
  }
  
  export default Root
  