// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// // import LoginReg from "./pages/auth/LoginReg";
// import ResetPassword from "./pages/auth/ResetPassword";
// import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
// import Contact from "./pages/Contact";
// import Dashboard from "./pages/Dashboard";
// import Home from "./pages/Home";
// // import Layout from "./pages/Layout";
// import { useSelector } from "react-redux";
// import Register from "./pages/Restaurant/Register";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
// import UserLogin from "./pages/auth/UserLogin";
// import Registration from "./pages/auth/Registration";
// import RestaurantDetail from "./pages/Restaurant/RestaurantDetail";
// import DishDetail from "./pages/Restaurant/DishDetail";
// import Cart from "./pages/Restaurant/Cart";
// import RestaurantDashboard from "./pages/Restaurant/RestaurantDashboard";
// import Dish from "./pages/Restaurant/Dish";
// import Orders from "./pages/Restaurant/Orders";
// import AddDish from "./pages/Restaurant/AddDish";
// import Logout from "./pages/auth/Logout";
// import UpdateDish from "./pages/Restaurant/UpdateDish";


// function App() {
//   const { access_token } = useSelector(state => state.auth);
//   console.log("Access Token", access_token);
  
//   return (
//     <>
//       <BrowserRouter>
//         <Navbar/>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="/register" element={<Registration />} />
//           <Route path="/login" element={<UserLogin />} />
//           <Route path="/logout" element={<Logout />} />
//           <Route path="/sendpasswordresetemail" element={<SendPasswordResetEmail />} />
//           <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
//           <Route path="/restaurant-register" element={ <Register  />}/> 
//           <Route path='/detail/:id' element={<RestaurantDetail/>} />
//           <Route path="/dishdetail/:slug" element={<DishDetail/>}/>
//           <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
//           <Route path='/cart' element={<Cart/>} />
//           <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />


//           {/* Vendor Routes */}
//           <Route path="/restaurant/dashboard/" element={<RestaurantDashboard/>} />
//           <Route path="/restaurant/dishes/" element={<Dish/>} />
//           <Route path="/restaurant/orders/" element={<Orders/>} />
//           <Route path="/restaurant/add-dish/" element={<AddDish/>} />
//           <Route path="/restaurant/dish/update/:did/" element={<UpdateDish/>} />

//         </Routes>
//         <Footer/>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;



import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";  // Import the PrivateRoute component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Registration from "./pages/auth/Registration";
import UserLogin from "./pages/auth/UserLogin";
import Logout from "./pages/auth/Logout";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Dashboard from "./pages/Dashboard";
import RestaurantDetail from "./pages/Restaurant/RestaurantDetail";
import DishDetail from "./pages/Restaurant/DishDetail";
import Cart from "./pages/Restaurant/Cart";
import RestaurantDashboard from "./pages/Restaurant/RestaurantDashboard";
import Dish from "./pages/Restaurant/Dish";
import Orders from "./pages/Restaurant/Orders";
import AddDish from "./pages/Restaurant/AddDish";
import UpdateDish from "./pages/Restaurant/UpdateDish";
import Register from "./pages/Restaurant/Register";
import RestaurantSettings from "./pages/Restaurant/RestaurantSettings";
import RestaurantStore from "./pages/Restaurant/RestaurantStore";
import Checkout from "./pages/Restaurant/Checkout";
import Search from "./pages/Restaurant/Search";
import { cartContext } from "./pages/plugins/Context";
import { useState,useEffect } from "react";
import CartID from "./pages/plugins/CartID"
import { getToken } from "./services/LocalStorageService";
import { useGetLoggedUserQuery } from "./services/userAuthApi";
import axios from "axios";
import Account from "./pages/Customer/Account";
import COrders from "./pages/Customer/COrders";
import COrderDetail from "./pages/Customer/COrderDetail";
import CNotifications from "./pages/Customer/CNotifications";
import Settings from "./pages/Customer/Settings";
import Notifications from "./pages/Restaurant/Notifications";
import Earnings from "./pages/Restaurant/Earnings";
import OrderDetail from "./pages/Restaurant/OrderDetail";

function App() {
  const { access_token } = useSelector(state => state.auth);
  const CartId = CartID();
    // let { access_token } = getToken();
    const { data, isSuccess } = useGetLoggedUserQuery(access_token);
//   console.log("Access Token", access_token);
const [count,setCount]=useState(0)
const [cartCount,setCartCount]=useState()

useEffect(()=>{
  const url = data ? `http://127.0.0.1:8000/api/store/cart-list/${CartId}/${data.id}/` : `http://127.0.0.1:8000/api/store/cart-list/${CartId}/`;
    axios.get(url)
      .then((res) => {
        console.log(res);
        setCartCount(res?.data.length);
      })
      .catch((error) => console.error("Error fetching cart data:", error));
})
  
  return (
    <>
    <cartContext.Provider value={[cartCount,setCartCount]}>

      <BrowserRouter>
        <Navbar/>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/sendpasswordresetemail" element={<SendPasswordResetEmail />} />
          <Route path="/api/user/reset/:id/:token" element={<ResetPassword />} />
          <Route path="/restaurant-register" element={<Register />} />
          <Route path="/detail/:id" element={<RestaurantDetail />} />
          <Route path="/dishdetail/:slug" element={<DishDetail />} />
          <Route path="/search/" element={<Search />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
          {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> */}
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="/checkout/:order_oid/" element={<PrivateRoute element={<Checkout />} />} />
         <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
        


          {/* Vendor Protected Routes */}
          <Route path="/restaurant/dashboard" element={<PrivateRoute element={<RestaurantDashboard />} />} />
          <Route path="/restaurant/dishes" element={<PrivateRoute element={<Dish />} />} />
          <Route path="/restaurant/earnings" element={<PrivateRoute element={<Earnings />} />} />
          <Route path="/restaurant/orders" element={<PrivateRoute element={<Orders />} />} />
          <Route path="/restaurant/orders/:order_id" element={<PrivateRoute element={<OrderDetail />} />} />
          <Route path="/restaurant/dishes" element={<PrivateRoute element={<Dish />} />} />
          <Route path="/restaurant/notifications/" element={<PrivateRoute element={<Notifications />} />} />
          <Route path="/restaurant/add-dish" element={<PrivateRoute element={<AddDish />} />} />
          <Route path="/restaurant/settings" element={<PrivateRoute element={<RestaurantSettings />} />} />
          <Route path="/restaurant/store/:slug/" element={<PrivateRoute element={<RestaurantStore />} />} />
          <Route path="/restaurant/dish/update/:did" element={<PrivateRoute element={<UpdateDish />} />} />


          <Route path="/customer/account/" element={<PrivateRoute element={<Account />} />} />
          <Route path="/customer/settings/" element={<PrivateRoute element={<Settings />} />} />
          <Route path="/customer/orders/" element={<PrivateRoute element={<COrders />} />} />
          <Route path="/customer/notifications/" element={<PrivateRoute element={<CNotifications />} />} />
          <Route path="/customer/orders/:order_oid/" element={<PrivateRoute element={<COrderDetail />} />} />




          {/* 404 Error Page */}
          <Route path="*" element={<h1>Error 404 - Page Not Found!</h1>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </cartContext.Provider>
    </>
  );
}

export default App;
