import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource-variable/nunito-sans';
import '@fontsource-variable/roboto-condensed';
import '@fontsource-variable/roboto';
import '@fontsource-variable/plus-jakarta-sans';
import { BrowserRouter, createBrowserRouter,RouterProvider, Navigate, useNavigate } from "react-router";
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
import AddCustomer from './routes/AddCustomer';
import Error from './routes/error';
import Edit from './routes/Edit';
import Register from './routes/Register';
import Items from './routes/Items';
import User from './routes/User';
import { Prod } from './routes/prod';
import Crew from './routes/crew';
import Customers from './routes/customers';
import Pending from './routes/Pending';

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
    path: "register",
    Component: Register
  },
  {
    path: "/admin",
    element: <Admin/>,
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
      
    ]
  },
  {
    path: "/orders/:id",
    Component: Items
  },
  {
    path: "/admins/newInv",
    Component: NewInv
  },
  {
    path: "/admins/edit/:id",
    Component: Edit
  },
  {
    path: "/admin/view/:id",
    Component: Crew
  },
  {
    path: "/admin/customers",
    Component: Customers
  },
  {
     path: "/admins/add-user",
     Component: User
  },
  {
     path: "/admin/add-customer",
     Component: AddCustomer
  },
  {
     path: "/admin/pending-orders",
     Component: Pending
  },
  {
    path: "/dashboard/product/:id",
    Component: Prod
 },
  {
    path: "dashboard",
    element:<Dashboard/> ,
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
