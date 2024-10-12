import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartID from "../plugins/CartID";
import { getToken } from "../../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";
import { setUserToken } from "../../features/authSlice";
import { setUserInfo } from "../../features/userSlice";
import { useDispatch } from "react-redux";

function Cart() {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const CartId = CartID();
  let { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);

  const fetchCartData = (cart_id, user_id) => {
    const url = user_id ? `http://127.0.0.1:8000/api/store/cart-list/${cart_id}/${user_id}/` : `http://127.0.0.1:8000/api/store/cart-list/${cart_id}/`;
    axios.get(url)
      .then((res) => {
        console.log(res);
        setCart(res?.data);
      })
      .catch((error) => console.error("Error fetching cart data:", error));
  };

  useEffect(() => {
    if (CartId) {
      if (data) {
        fetchCartData(CartId, data?.id);
      } else {
        fetchCartData(CartId, null);
      }
    }

    dispatch(setUserToken({ access_token: access_token }));
    if (data && isSuccess) {
      console.log("Data is this", data);
      dispatch(setUserInfo({ email: data.email, name: data.name }));
    }
    console.log("Access Token is this", data);
  }, [CartId, data, isSuccess, access_token, dispatch]);

  return <div>Cart</div>;
}

export default Cart;

