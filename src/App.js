import React from 'react';
import './App.css';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Cartpage from './pages/Cartpage';
import Checkout from './pages/Checkoutpage';
import Productdetailpage from './pages/Productdetailpage';
import Signuppage from './pages/Signuppage';

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
    element: <Signuppage></Signuppage>,
  },
  { 
    //TODO: cart not working plz check PS: fixed
    path: '/cart',  
    element: <Cartpage></Cartpage>,
  },
  { 
    path: '/checkout',  
    element: <Checkout></Checkout>,
  },
  { 
    // path: '/productdetail',  
    path: '/product-detail/:id',
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
