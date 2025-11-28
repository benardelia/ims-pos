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
import Jack from './routes/Jack';
import EditUser from './routes/EditUser';
import Pelu from './routes/Pelu'
import { SetContextLink } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import { ApolloProvider } from "@apollo/client/react"
import Raw from './routes/Raw';

const session = localStorage.getItem("jwt_token");

// HTTP link
const httpLink = new HttpLink({
  uri: "https://grandypos.duckdns.org/graphql",
});

const authLink = new SetContextLink(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      "Content-Type": "application/json",
      ...(session ? { Authorization: `Bearer ${session}` } : {}),
    },
  };
});

// Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


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
  path: "/admin/edit-user/:id",
  Component: EditUser
 },
  {
    path: "dashboard",
    Component : Dashboard,
    children: [
      {
        index: true,
        path: "home",
        Component: Jack
      },
      {
        path: "materials",
        Component: Raw
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
      <ApolloProvider client={client}>
        <RouterProvider router={router}/>
      </ApolloProvider>
      </Provider>  
  </StrictMode>
)
