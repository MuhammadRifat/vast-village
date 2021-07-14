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
        confirmPassword: '',
        emailValid: true,
        passwordValid: true,
        confirmPasswordValid: true,
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
    const handleSubmit = (event) => {
        if (!newUser && user.email && user.password) {
            setIsLoading(true);
            handleLogIn(user.email, user.password)
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
        if (newUser && user.email && user.password && user.confirmPassword) {
            setIsLoading(true);
            if (user.password.length === user.confirmPassword.length) {
                handleSignUp(user.name, user.email, user.confirmPassword)
                    .then(res => {
                        if (res.email) {
                            handleLogInUser(res, false);
                            const userDetail = { ...user };
                            userDetail.error = "";
                            setUser(userDetail);
                            setIsLoading(false);
                        }
                        else {
                            const newUser = {
                                error: res
                            }
                            setLoggedInUser(newUser);
                            const userDetail = { ...user };
                            userDetail.error = "";
                            setUser(userDetail);
                            setIsLoading(false);
                        }
                    })
            }
            else {
                const userDetail = { ...user };
                userDetail.error = "Confirm password do not match";
                setUser(userDetail);
                setIsLoading(false);
            }
        }
        event.preventDefault();
    }

    // For accessing user information from input and validating data
    const handleBlur = (event) => {
        let isValid = true;
        if (event.target.name === 'email') {
            isValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            isValid = event.target.value.length >= 8 && /\d{1}/.test(event.target.value);
        }
        if (isValid) {
            const newUser = { ...user };
            newUser[event.target.name] = event.target.value;
            newUser[event.target.name + "Valid"] = true;
            setUser(newUser);
        }
        else {
            const newUser = { ...user };
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
        fetch('http://localhost:5000/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...newUser, date: new Date()})
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
        })

        setCookie("email", res.email, 7);
        setLoggedInUser({...newUser, darkMode: loggedInUser.darkMode});
        isReplace && history.replace(from);
    }

    //set Cookie
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
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
            <div className="flex justify-center">
                <div className="mt-4 w-4/5 lg:w-1/3 md:w-1/2">

                    <img src={logo} alt="" />
                    <div className="rounded-md p-4 mt-8 box">
                        <div className="bg-white rounded-md mb-5">
                            <h4 className="font-bold text-2xl">{newUser ? 'Create an account' : 'Log In'}</h4>
                            {
                                user.error &&
                                <h6 className="text-red-500 text-center mt-3">{user.error}</h6>
                            }
                            {
                                loggedInUser.error &&
                                <h6 className="text-red-500 text-center mt-3">{loggedInUser.error}</h6>
                            }
                            {
                                loggedInUser.email &&
                                <h6 className="text-green-500 text-center mt-3">Sign up successful</h6>
                            }
                            <form className="login-form" onSubmit={handleSubmit}>
                                {
                                    isLoading &&
                                    <Loader />
                                }
                                {
                                    newUser &&
                                    <input type="text" onBlur={handleBlur} name="name" placeholder="Name" required />
                                }
                                <br />
                                <input type="text" onBlur={handleBlur} name="email" placeholder="Email" required />
                                <br />
                                {
                                    !user.emailValid &&
                                    <span className="text-red-500">Enter a valid email</span>
                                }
                                <input type="password" onBlur={handleBlur} name="password" placeholder="Password" required /><br />
                                {
                                    !user.passwordValid &&
                                    <span className="text-red-500">Enter a valid password (at least 8 character and number)</span>
                                }
                                {
                                    newUser && <input type="password" onBlur={handleBlur} name="confirmPassword" placeholder="Confirm password" required />
                                }
                                <br />
                                <input id="submit-btn" type="submit" value={newUser ? "Create an account" : "Login"} />
                            </form>
                            <h6 className="mt-3 text-center">
                                {
                                    newUser ?
                                        <span>Already have an account?<button className="create-btn focus:outline-none" onClick={() => handleLogInOrCreate()}>Login</button></span>
                                        :
                                        <span>Don't have an account? <button className="create-btn focus:outline-none" onClick={() => handleLogInOrCreate()}>Create an account</button></span>
                                }
                            </h6>
                        </div>
                        <hr />
                        <h5 className="text-center text-lg">Or</h5>
                        <hr />
                        <div className="text-center social-btn mt-3">
                            <button onClick={googleSignIn}><FontAwesomeIcon icon={faGoogle} size="lg" /> Continue With Google</button><br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;