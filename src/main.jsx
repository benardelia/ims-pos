import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter,RouterProvider, Navigate } from "react-router";
import { Provider } from "@/components/ui/provider"
import Login from './routes/login';
import Home from './routes/Home';
import Dashboard from './routes/dashboard';
import Moon from './routes/moon';
import Sales from './routes/Sales';
import Products from './routes/Products';
import Shortage from './routes/Shortage';
import Dash from './routes/dash';
import Inventory from './routes/inventory';
import Reports from './routes/reports';
import Management from './routes/management';
import Admin from './routes/admin';
import NewInv from './routes/NewInv';

const session = localStorage.getItem("jwt_token");
 const router = createBrowserRouter ([
  {
    path: "/",
    Component: Home
  },
  {
    path: "login",
    Component: Login
  },
  {
    path: "/admin",
    Component: Admin,
    children: [
      {
        index: true,
        path: "dashboard",
        Component: Dash
      },
      {
        path:"inventory",
        Component: Inventory
      },
      {
        path: "reports",
        Component: Reports
      },
      {
        path: "management",
        Component: Management
      },
      {
        path: "newInv",
        Component: NewInv
      },
    ]
  },
  {
    path: "dashboard",
    element: <div>{(session !== "") ? <Dashboard/> : <Navigate to="/"/> }</div>,
    children: [
      {
        index: true,
        path: "home",
        Component: Moon
      },
      {
        path: "sales",
        Component: Sales
      },
      {
        path: "products",
        Component: Products
      },
      {
        path: "shortage",
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
  </StrictMode>
)
