import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import { userContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Loader from '../Loader/Loader';
import { firebaseConfigFrameWork, handleGoogleSignIn, handleLogIn, handleSignUp } from './LoginManager';
import logo from '../../images/default-monochrome.svg';

const Login = () => {
    // access firebase config
    firebaseConfigFrameWork();
    const [newUser, setNewUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        setPassword: '',
        emailValid: true,
        passwordValid: true,
        setPasswordValid: true,
        error: ''
    });
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    // For using sign in with google
    const googleSignIn = () => {
        setIsLoading(true);
        handleGoogleSignIn()
            .then(res => {
                if (res.email) {
                    handleLogInUser(res, true);
                }
                else {
                    const newUser = {
                        error: res
                    }
                    setLoggedInUser(newUser);
                    setIsLoading(false);
                }
            })
    }

    // For using login and signup
    // const handleSubmit = (event) => {
    //     if (!newUser && user.email && user.password) {
    //         setIsLoading(true);
    //         handleLogIn(user.email, user.password)
    //             .then(res => {
    //                 if (res.email) {
    //                     handleLogInUser(res, true);
    //                 }
    //                 else {
    //                     const newUser = {
    //                         error: res
    //                     }
    //                     setLoggedInUser(newUser);
    //                     setIsLoading(false);
    //                 }
    //             })
    //     }
    //     if (newUser && user.email && user.password && user.confirmPassword) {
    //         setIsLoading(true);
    //         if (user.password.length === user.confirmPassword.length) {
    //             handleSignUp(user.name, user.email, user.confirmPassword)
    //                 .then(res => {
    //                     if (res.email) {
    //                         handleLogInUser(res, false);
    //                         const userDetail = { ...user };
    //                         userDetail.error = "";
    //                         setUser(userDetail);
    //                         setIsLoading(false);
    //                     }
    //                     else {
    //                         const newUser = {
    //                             error: res
    //                         }
    //                         setLoggedInUser(newUser);
    //                         const userDetail = { ...user };
    //                         userDetail.error = "";
    //                         setUser(userDetail);
    //                         setIsLoading(false);
    //                     }
    //                 })
    //         }
    //         else {
    //             const userDetail = { ...user };
    //             userDetail.error = "Confirm password do not match";
    //             setUser(userDetail);
    //             setIsLoading(false);
    //         }
    //     }
    //     event.preventDefault();
    // }

    // user login
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        fetch('https://vast-village-server.herokuapp.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, password: user.password})
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCookie("email", data.email, 7);
                    setLoggedInUser({ ...data, darkMode: loggedInUser.darkMode });
                    history.replace(from);
                    setIsLoading(false);
                } else{
                    setUser({...user, error: "Email or Password do not match!"})
                    setIsLoading(false);
                }
            })
    }

    // For accessing user information from input and validating data

    // For validating set password for signing up
    const handleChange = (event) => {
        let isValid = true;
        
        if (event.target.name === 'email') {
            isValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            isValid = event.target.value.length >= 8 && /\d{1}/.test(event.target.value);
        }
        if (event.target.name === 'setPassword') {
            isValid = event.target.value.length >= 8 && /\d{1}/.test(event.target.value);
        }
        if (isValid) {
            const newUser = { ...user };
            newUser[event.target.name] = event.target.value;
            newUser[event.target.name + "Valid"] = true;
            setUser(newUser);
        } else {
            const newUser = { ...user };
            newUser[event.target.name] = "";
            newUser[event.target.name + "Valid"] = false;
            setUser(newUser);
        }
    }

    // For using to reduce repetition code
    const handleLogInUser = (res, isReplace) => {
        const newUser = {
            name: res.displayName || user.name,
            email: res.email,
            photo: res.photoURL || "https://i.ibb.co/CzkSST0/avater.png",
            error: ''
        }

        fetch('https://vast-village-server.herokuapp.com/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...newUser, password: user.setPassword, date: new Date() })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
            })

        setCookie("email", res.email, 7);
        setLoggedInUser({ ...newUser, darkMode: loggedInUser.darkMode });
        isReplace && history.replace(from);
    }

    //set Cookie
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // Conditionally showing log in and create new account button
    const handleLogInOrCreate = () => {
        setNewUser(!newUser);
        const newLoggedInUser = { ...loggedInUser };
        newLoggedInUser.error = '';
        setLoggedInUser(newLoggedInUser);
        const userDetail = { ...user };
        userDetail.error = '';
        setUser(userDetail);
    }
    return (
        <>
            <h4 className="text-red-700 text-xl text-center">This site is under development</h4>
            <div className="flex justify-center p-3">
                <div className="mt-8 w-full lg:w-1/3 md:w-1/2 bg-white rounded-lg p-3 box">

                    <img src={logo} alt="" />
                    <div className="rounded-md p-4 mt-8">
                        <div className="rounded-md mb-5">
                            <h4 className="font-bold text-2xl">{newUser ? 'Create an account' : 'Log In'}</h4>
                            {
                                user.error &&
                                <h6 className="text-red-500 text-center mt-3">{user.error}</h6>
                            }
                            {
                                loggedInUser.error &&
                                <h6 className="text-red-500 text-center mt-3">{loggedInUser.error}</h6>
                            }

                            <form className="login-form" onSubmit={handleSubmit}>
                                {
                                    isLoading &&
                                    <Loader />
                                }
                                {/* {
                                    newUser &&
                                    <input type="text" onChange={handleChange} name="name" placeholder="Name" disabled required />
                                } */}
                                {
                                    !newUser &&
                                    <input type="text" onChange={handleChange} name="email" placeholder="Email" required />
                                }
                                {
                                    !user.emailValid && !newUser &&
                                    <span className="text-red-500">Enter a valid email</span>
                                }
                                {!newUser && <input type="password" onChange={handleChange} name="password" placeholder="Password" required />}

                                {
                                    !user.passwordValid && !newUser &&
                                    <span className="text-red-500">Enter a valid password</span>
                                }
                                {
                                    newUser && <input type="password" onChange={handleChange} name="setPassword" placeholder="Password" required />
                                }
                                {
                                    !user.setPasswordValid && newUser &&
                                    <span className="text-red-500">Enter at least 8 character and number</span>
                                }
                                <br />
                                {!newUser && <input id="submit-btn" type="submit" value="Login" className={`px-3 py-2 rounded-lg text-lg text-white ${user.email && user.password ? "login-submit-btn" : "bg-gray-500 cursor-not-allowed"}`} disabled={!user.email && !user.password && "disabled"} />}
                            </form>
                            <h6 className="mt-3 text-center">
                                {
                                    newUser ?
                                        // <span>Already have an account?<button className="create-btn focus:outline-none" onClick={() => handleLogInOrCreate()}>Login</button></span>
                                        ""
                                        :
                                        <span>Don't have an account? <button className="create-btn focus:outline-none" onClick={() => handleLogInOrCreate()}>Create an account</button></span>
                                }
                            </h6>
                        </div>
                        <hr />
                        <h5 className="text-center text-lg font-bold">{newUser ? "Set password and click Continue With Google" : "Or"}</h5>
                        <hr />

                        <div className="text-center mt-3">
                            {
                                newUser ?
                                    <button className={`px-3 py-2 rounded-lg text-lg text-white ${user.setPassword ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"}`} onClick={googleSignIn} disabled={!user.setPassword && "disabled"}><FontAwesomeIcon icon={faGoogle} size="lg" /> Continue With Google</button>

                                    :
                                    <button className="px-3 py-2 rounded-lg text-lg bg-blue-500 text-white" onClick={googleSignIn}><FontAwesomeIcon icon={faGoogle} size="lg" /> Continue With Google</button>

                            }
                        </div>
                        {
                            newUser && <div className="text-center mt-3">Already have an account? <button className="create-btn focus:outline-none" onClick={() => handleLogInOrCreate()}>Login</button></div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;