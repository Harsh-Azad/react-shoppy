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
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage.js';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin.js';
import AdminHome from './pages/AdminHome.js';
import AdminProductdetailpage from './pages/AdminProductDetailPage.js';
import AdminProductFormPage from './pages/AdminProductFormPage.js';
import AdminOrdersPage from './pages/AdminOrdersPage.js';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected>
      <Home></Home>
    </Protected>,
  },
  {
    path: '/admin',
    element: <ProtectedAdmin>
      <AdminHome></AdminHome>
    </ProtectedAdmin>,
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
    // path: '/productdetail',  
    path: '/admin/product-form',
    element: <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>,
  },
  { 
    // path: '/productdetail',  
    path: '/admin/orders',
    element: <ProtectedAdmin>
      <AdminOrdersPage></AdminOrdersPage>
    </ProtectedAdmin>,
  },
  { 
    // path: '/productdetail',  
    path: '/admin/product-form/edit/:id',
    element: <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>,
  },
  { 
    // path: '/productdetail',  
    path: '/admin/product-detail/:id',
    element: <ProtectedAdmin>
      <AdminProductdetailpage></AdminProductdetailpage>
    </ProtectedAdmin>,
  },
  {
    //TODO: orders is not working when I place an order and try to check my orders
    //posibbly because ordre is initiallized empty. so Order now is sending it to successful order
    //but order array is not being populated by that click it only gets populated when we refresh the page
    //i.e sign in again
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
  
  },
  {
    path: '/profile',
    element: 
    <Protected>
      <UserProfilePage></UserProfilePage>
    </Protected>
    
  },
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  }
]);


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch, user])
  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
