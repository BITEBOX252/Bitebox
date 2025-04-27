// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const PrivateRoute = ({ element }) => {
//     const { access_token } = useSelector(state => state.auth);

//     return access_token ? element : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element }) => {
  const access_token = useSelector(state => state.auth.access_token) || localStorage.getItem("access_token");

  return access_token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

