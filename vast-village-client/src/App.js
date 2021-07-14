import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Friends from "./components/Friends/Friends";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/Profile/Profile";

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({ email: getCookie("email"), darkMode: getMode() });

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return {};
  }

  // Dark mode data store in localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(loggedInUser.darkMode));
  }, [loggedInUser.darkMode]);

  // Load data from localStorage
  function getMode() {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    return savedMode || false;
  }

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/chats">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/friends">
            <Friends />
          </PrivateRoute>
          <PrivateRoute path="/notifications">
            <Home />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
