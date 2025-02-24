import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter,RouterProvider, Routes, Route } from "react-router";
import { Provider } from "@/components/ui/provider"
import Login from './routes/login';
import Home from './routes/Home';
import Dashboard from './routes/dashboard';
import Moon from './routes/moon';
import Sales from './routes/Sales';
import Products from './routes/Products';
import Shortage from './routes/Shortage';



 const router = createBrowserRouter ([
  {
    path: "/",
    Component: Home
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        imdex: true,
        path: "/dashboard/home",
        Component: Moon
      },
      {
        path: "/dashboard/sales",
        Component: Sales
      },
      {
        path: "/dashboard/products",
        Component: Products
      },
      {
        path: "/dashboard/shortage",
        Component: Shortage
      },
    ],
  },
 ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider>
       <RouterProvider router={router}/>
      </Provider>  
  </StrictMode>,
)
