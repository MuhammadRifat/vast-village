import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Chats from "./components/Chats/Chats";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Notification from "./components/Notification/Notification";
import Peoples from "./components/Peoples/Peoples";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/Profile/Profile";
import IndividualPost from "./pages/IndividualPost/IndividualPost";

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

  // Load darkMode data from localStorage
  function getMode() {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    return savedMode || false;
  }

  if(loggedInUser.darkMode){
    document.body.style = 'background: #111827';
  } else {
    document.body.style = 'background: #F3F4F6';
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
          <PrivateRoute path="/profile/:email">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/chats">
            <Chats />
          </PrivateRoute>
          <PrivateRoute path="/peoples">
            <Peoples />
          </PrivateRoute>
          <PrivateRoute path="/notifications">
            <Notification />
          </PrivateRoute>
          <PrivateRoute path="/post/:post_id">
            <IndividualPost />
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
