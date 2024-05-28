import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import ProductList from './features/ProductList/ProductList';
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
  {  //just for testing
    path: '/cart',  
    element: <Cartpage></Cartpage>,
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
