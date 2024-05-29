import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import ProductList from './features/ProductList/components/ProductList';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import Signup from './features/auth/components/Signup';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from './features/cart/Cart';
import Cartpage from './pages/Cartpage';
import Checkout from './pages/Checkoutpage';
import Productdetail from './features/ProductList/components/Productdetail';
import Productdetailpage from './pages/Productdetailpage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/login',
    element: <Loginpage></Loginpage>,
  },
  {
    path: '/signup',
    element: <Signup></Signup>,
  },
  { 
    path: '/cart',  
    element: <Cartpage></Cartpage>,
  },
  { 
    path: '/checkout',  
    element: <Checkout></Checkout>,
  },
  { 
    path: '/productdetail',  
    element: <Productdetailpage></Productdetailpage>,
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
