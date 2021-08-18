import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AllPeoples from './AllPeoples/AllPeoples';
import Friends from './Friends/Friends';
import NotFound from '../NotFound/NotFound';
import FriendRequests from './FriendRequests/FriendRequests';

const Peoples = () => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;

    const routes = [
        {
            path: "/peoples",
            exact: true,
            sidebar: () => "",
            main: () => <AllPeoples />
        },
        {
            path: "/peoples/friends",
            sidebar: () => "",
            main: () => <Friends email={loggedInUser.email} /> || <NotFound />
        },
        {
            path: "/peoples/friendrequests",
            sidebar: () => "",
            main: () => <FriendRequests /> || <NotFound />
        }
    ];

    return (
        <>
            <Header />
            <div className={`mt-20 md:mt-16 flex flex-col md:flex-row justify-center w-full h-full`}>

                {/* Menu part */}
                <div className="px-8 md:p-0 md:block md:w-1/4 h-full md:fixed left-8">
                    <div className="mt-10">
                        <Link to="/peoples"><button className={`px-4 py-2 w-full rounded-lg font-bold text-lg mt-1 ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : " bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>Peoples</button></Link>
                        <Link to="/peoples/friends"><button className={`px-4 py-2 w-full rounded-lg font-bold text-lg mt-1 ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : " bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>All Friends</button></Link>
                        <Link to="/peoples/friendrequests"><button className={`px-4 py-2 w-full rounded-lg font-bold text-lg mt-1 ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : " bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>Friend Requests</button></Link>
                    </div>
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.sidebar />}
                            />
                        ))}
                    </Switch>
                </div>

                {/* Main part */}
                <div className="md:w-2/5 my-3 p-3 md:p-0 md:relative md:top-0">
                    <Switch>
                        {routes.map((route, index) => (
                            // Render more <Route>s with the same paths as
                            // above, but different components this time.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.main />}
                            />
                        ))}
                    </Switch>
                </div>

            </div>
        </>
    );
};

export default Peoples;