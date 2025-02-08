import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
// import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import Register from "./pages/Restaurant/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import UserLogin from "./pages/auth/UserLogin";
import Registration from "./pages/auth/Registration";
import RestaurantDetail from "./pages/Restaurant/RestaurantDetail";
import DishDetail from "./pages/Restaurant/DishDetail";
import Cart from "./pages/Restaurant/Cart";
import RestaurantDashboard from "./pages/Restaurant/RestaurantDashboard";
import Dish from "./pages/Restaurant/Dish";
import Orders from "./pages/Restaurant/Orders";
import AddDish from "./pages/Restaurant/AddDish";
import Logout from "./pages/auth/Logout";


function App() {
  const { access_token } = useSelector(state => state.auth);
  console.log("Access Token", access_token);
  
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
          <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
          <Route path="restaurant-register" element={ <Register  />}/> 
          <Route path='/detail/:id' element={<RestaurantDetail/>} />
          <Route path="/dishdetail/:slug" element={<DishDetail/>}/>
          <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />


          {/* Vendor Routes */}
          <Route path="/restaurant/dashboard/" element={<RestaurantDashboard/>} />
          <Route path="/restaurant/dishes/" element={<Dish/>} />
          <Route path="/restaurant/orders/" element={<Orders/>} />
          <Route path="/restaurant/add-dish/" element={<AddDish/>} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
