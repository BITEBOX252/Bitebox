// import { TextField, Button, Box, Alert, Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { NavLink, useNavigate, Link } from 'react-router-dom';
// import { useLoginUserMutation } from '../../services/userAuthApi';
// import { getToken, storeToken } from '../../services/LocalStorageService';
// import { useDispatch } from 'react-redux';
// import { setUserToken } from '../../features/authSlice';

// const UserLogin = () => {
//     const [serverError, setServerError] = useState({});
//     const [formError, setFormError] = useState({ email: '', password: '' });
//     const navigate = useNavigate();
//     const [loginUser, { isLoading }] = useLoginUserMutation();
//     const dispatch = useDispatch();
    
//     const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

//     useEffect(() => {
//         let isMounted = true;

//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 if (isMounted) {
//                     setCoordinates({
//                         latitude: position.coords.latitude,
//                         longitude: position.coords.longitude,
//                     });
//                 }
//             },
//             (error) => {
//                 console.error("Geolocation error:", error);
//             }
//         );

//         return () => {
//             isMounted = false;
//         };
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setFormError({ email: '', password: '' });
//         setServerError({}); 

//         const data = new FormData(e.currentTarget);
//         const actualData = {
//             email: data.get('email'),
//             password: data.get('password'),
//             latitude: coordinates.latitude,
//             longitude: coordinates.longitude,
//         };

//         if (!actualData.email) {
//             setFormError((prev) => ({ ...prev, email: 'Email is required' }));
//             return;
//         }
//         if (!actualData.password) {
//             setFormError((prev) => ({ ...prev, password: 'Password is required' }));
//             return;
//         }

//         const res = await loginUser(actualData);
//         if (res.error) {
//             setServerError(res.error.data.errors || {});
//         }
//         if (res.data) {
//             storeToken(res.data.token);
//             const { access_token } = getToken();
//             dispatch(setUserToken({ access_token }));
//             navigate('/dashboard');
//         }
//     };

//     const { access_token } = getToken();
//     useEffect(() => {
//         dispatch(setUserToken({ access_token }));
//     }, [dispatch, access_token]);

//     return (
//         <section>
//             <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
//                 <div className="container">
//                     <section>
//                         <div className="row d-flex justify-content-center">
//                             <div className="col-xl-5 col-md-8">
//                                 <div className="card rounded-5">
//                                     <div className="card-body p-4">
//                                         <h3 className="text-center">Login</h3>
//                                         <br />
//                                         <form onSubmit={handleSubmit}>
//                                             {/* Email input */}
//                                             <div className="form-outline mb-4">
//                                                 <label className="form-label" htmlFor="email">
//                                                     Email Address
//                                                 </label>
//                                                 <TextField
//                                                     margin='normal'
//                                                     required
//                                                     fullWidth
//                                                     id='email'
//                                                     name='email'
//                                                     label='Email Address'
//                                                     error={!!formError.email}
//                                                     helperText={formError.email}
//                                                 />
//                                                 {serverError.email && (
//                                                     <Typography style={{ color: 'red', fontSize: '12px', paddingLeft: 10 }}>
//                                                         {serverError.email[0]}
//                                                     </Typography>
//                                                 )}
//                                             </div>

//                                             {/* Password input */}
//                                             <div className="form-outline mb-4">
//                                                 <label className="form-label" htmlFor="password">
//                                                     Password
//                                                 </label>
//                                                 <TextField
//                                                     margin='normal'
//                                                     required
//                                                     fullWidth
//                                                     id='password'
//                                                     name='password'
//                                                     label='Password'
//                                                     type='password'
//                                                     error={!!formError.password}
//                                                     helperText={formError.password}
//                                                 />
//                                                 {serverError.password && (
//                                                     <Typography style={{ color: 'red', fontSize: '12px', paddingLeft: 10 }}>
//                                                         {serverError.password[0]}
//                                                     </Typography>
//                                                 )}
//                                             </div>

//                                             <button className='btn btn-primary w-100' type="submit" disabled={isLoading}>
//                                                 <span className="mr-2">Sign In </span>
//                                                 <i className="fas fa-sign-in-alt" />
//                                             </button>

//                                             <div className="text-center">
//                                                 <p className='mt-4'>
//                                                     Don't have an account? <Link to="/register">Register</Link>
//                                                 </p>
//                                                 <p className='mt-0'>
//                                                     <Link to="/forgot-password/" className='text-danger'>Forgot Password?</Link>
//                                                 </p>
//                                             </div>
//                                         </form>

//                                         {serverError.non_field_errors && (
//                                             <Alert severity="error">{serverError.non_field_errors[0]}</Alert>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </main>
//         </section>
//     );
// };

// export default UserLogin;


// import { TextField, Button, Alert, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';


// const Login = () => {
  
//   return (
//     <section className="flex justify-center items-center min-h-screen bg-gray-100">
//       <main className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <Typography variant="h5" component="h3" className="text-center mb-6">
//           Login
//         </Typography>
//         <form >
//           {/* Email input */}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
//               Email Address
//             </label>
//             <TextField
//               fullWidth
//               margin="normal"
//               required
//               id="email"
//               name="email"
//               label="Email Address"
              
//               className="bg-gray-50"
//             />
            
//           </div>

//           {/* Password input */}
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <TextField
//               fullWidth
//               margin="normal"
//               required
//               id="password"
//               name="password"
//               label="Password"
//               type="password"
             
//               className="bg-gray-50"
//             />
           
//           </div>

//           <button
//             type="submit"
          
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center mt-4"
//           >
//             <span className="mr-2">Sign In</span>
//             <i className="fas fa-sign-in-alt" />
//           </button>

//           <div className="text-center mt-4">
//             <p>
//               Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
//             </p>
//             <p className="mt-0">
//               <Link to="/forgot-password/" className="text-red-500">Forgot Password?</Link>
//             </p>
//           </div>
//         </form>

        
//       </main>
//     </section>
//   );
// };

// export default Login;





import { TextField, Button, Box, Alert, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/userAuthApi';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../features/authSlice';
import Swal from 'sweetalert2';


const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});
const inputTest = (data) => {
    data = data.trim();
    data = data.replace(/\\/g, '');
    data = data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    return data;
};

const regEmailTest = (data) => {
    const email = inputTest(data);
    return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const regPasswordTest = (data) => {
    return data.length >= 6;
};

const UserLogin = () => {

    const [showPasswords, setShowPasswords] = useState(false);
    const [serverError, setServerError] = useState({});
    const [formError, setFormError] = useState({});
    const navigate = useNavigate();
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const dispatch = useDispatch();

    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
    const togglePasswordVisibility = () => {
        setShowPasswords(!showPasswords);
      };
    useEffect(() => {
        let isMounted = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (isMounted) {
                    setCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
            }
        );

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormError({});
        setServerError({});

        const data = new FormData(e.currentTarget);
        const sanitizedEmail = inputTest(data.get('email'));
        const password = data.get('password');

        let errors = {};

        // Email validation
        if (!sanitizedEmail) {
            errors.email = 'Email is required';
        } else if (!regEmailTest(sanitizedEmail)) {
            errors.email = 'Invalid email format';
        }

        // Password validation
        if (!password) {
            errors.password = 'Password is required';
        } else if (!regPasswordTest(password)) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return;
        }

        const actualData = {
            email: sanitizedEmail,
            password,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
        };

        const res = await loginUser(actualData);
        if (res.error) {
            setServerError(res.error.data.errors || {});
        }
        if (res.data) {
            storeToken(res.data.token);
            const { access_token } = getToken();
            dispatch(setUserToken({ access_token }));
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            });
            navigate('/');
        }
    };

    const { access_token } = getToken();
    useEffect(() => {
        dispatch(setUserToken({ access_token }));
    }, [dispatch, access_token]);

    return (
        <section>
            <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    <section>
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Login</h3>
                                        <br />
                                        <form onSubmit={handleSubmit}>
                                            {/* Email input */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="email">
                                                    Email Address
                                                </label>
                                                <TextField
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    id='email'
                                                    name='email'
                                                    label='Email Address'
                                                    error={!!formError.email}
                                                    helperText={formError.email}
                                                />
                                                {serverError.email && (
                                                    <Typography style={{ color: 'red', fontSize: '12px', paddingLeft: 10 }}>
                                                        {serverError.email[0]}
                                                    </Typography>
                                                )}
                                            </div>

                                            {/* Password input */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="password">
                                                    Password
                                                </label>
                                                <TextField
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    id='password'
                                                    name='password'
                                                    label='Password'
                                                    type={showPasswords ? 'text' : 'password'}
                                                    error={!!formError.password}
                                                    helperText={formError.password}
                                                />
                                                {serverError.password && (
                                                    <Typography style={{ color: 'red', fontSize: '12px', paddingLeft: 10 }}>
                                                        {serverError.password[0]}
                                                    </Typography>
                                                )}
                                            </div>
                                            <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="checkbox"
            checked={showPasswords}
            onChange={togglePasswordVisibility}
          />{' '}
          Show Password
        </label>
      </div>
                                            <button className='btn btn-primary w-100' type="submit" disabled={isLoading}>
                                                <span className="mr-2">Sign In </span>
                                                <i className="fas fa-sign-in-alt" />
                                            </button>

                                            <div className="text-center">
                                                <p className='mt-4'>
                                                    Don't have an account? <Link to="/register">Register</Link>
                                                </p>
                                                <p className='mt-0'>
                                                    <Link to="/sendpasswordresetemail" className='text-danger'>Forgot Password?</Link>
                                                </p>
                                            </div>
                                        </form>

                                        {serverError.non_field_errors && (
                                            <Alert severity="error">{serverError.non_field_errors[0]}</Alert>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    );
};

export default UserLogin;
