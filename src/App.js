import React from 'react';
import './App.css';
import ProductList from './features/ProductList/components/ProductList';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import Signup from './features/auth/components/Signup';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Cartpage from './pages/Cartpage';
import Checkout from './pages/Checkoutpage';
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
    //TODO: cart not working plz check
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
