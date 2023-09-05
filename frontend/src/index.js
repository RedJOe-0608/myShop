import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import store from './store';
import App from './App';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PrivateRoute from './components/PrivateRoute';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import ProfilePage from './pages/ProfilePage';
import AdminRoute from './components/AdminRoute';
import AdminOrderListPage from './pages/AdminOrderListPage';
import AdminProductListPage from './pages/AdminProductListPage';
import AdminProductEditPage from './pages/AdminProductEditPage';
import AdminUserListPage from './pages/AdminUserListPage';
import AdminUserEditScreen from './pages/AdminUserEditScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    //This is like a layout component that wraps everything.
    <Route path='/' element={<App />}>
      <Route index element={<HomePage />} />
      <Route path='/product/:id'  element={<ProductPage />} />
      <Route path='/cart'  element={<CartPage />} />
      <Route path='/login'  element={<LoginPage />} />
      <Route path='/register'  element={<RegisterPage />} />

      {/* private routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping'  element={<ShippingPage />} />
        <Route path='/payment'  element={<PaymentPage />} />
        <Route path='/placeorder'  element={<PlaceOrderPage />} />
        <Route path='/orders/:id'  element={<OrderPage />} />
        <Route path='/profile'  element={<ProfilePage />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
      <Route path='/admin/orderlist'  element={<AdminOrderListPage />} />
      <Route path='/admin/productlist'  element={<AdminProductListPage />} />
      <Route path='/admin/product/:id/edit'  element={<AdminProductEditPage />} />
      <Route path='/admin/userlist'  element={<AdminUserListPage />} />
      <Route path='/admin/user/:id/edit'  element={<AdminUserEditScreen />} />


      </Route>
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider >
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

