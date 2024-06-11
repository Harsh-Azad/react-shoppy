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
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage.js';
import UserOrdersPage from './pages/UserOrdersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected>
      <Home></Home>
    </Protected>,
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
    element: <Protected>
      <Cartpage></Cartpage>
    </Protected>,
  },
  { 
    path: '/checkout',  
    element: <Protected>
      <Checkout></Checkout>
    </Protected>,
  },
  { 
    // path: '/productdetail',  
    path: '/product-detail/:id',
    element: <Protected>
      <Productdetailpage></Productdetailpage>
    </Protected>,
  },
  {
    path: '/orders',
    element: <Protected>
      <UserOrdersPage></UserOrdersPage>
    </Protected>
    
  },
  {
    path: '/order-success/:id',
    element: <Protected>
      <OrderSuccessPage></OrderSuccessPage>
    </Protected>
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>
  
  }
]);


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch, user])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
