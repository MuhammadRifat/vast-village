import React, { useContext, useEffect, useState } from 'react';
import { Link, Route, Switch, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import CreatePost from '../CreatePost/CreatePost';
import Header from '../Header/Header';
import ProfileSkeleton from '../Loader/ProfileSkeleton/ProfileSkeleton';
import NotFound from '../NotFound/NotFound';
import Friends from '../Peoples/Friends/Friends';
import About from './About/About';
import Posts from './Posts/Posts';
import './Profile.css';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loggedInUser] = useContext(userContext);
    const { email } = useParams();
    const [user, setUser] = useState({});
    const { name, photo } = user;
    const { darkMode } = loggedInUser;

    // load individual user data by email
    useEffect(() => {
        setIsLoading(true);
        fetch(`https://vast-village-server.herokuapp.com/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setIsLoading(false);
            })
    }, [email])

    const routes = [
        {
            path: `/profile/${email}`,
            exact: true,
            sidebar: () => "",
            main: () => <Posts email={email} /> || <NotFound />
        },
        {
            path: `/profile/${email}/about`,
            sidebar: () => "",
            main: () => <About email={email} /> || <NotFound />
        },
        {
            path: `/profile/${email}/friends`,
            sidebar: () => "",
            main: () => <Friends email={email} /> || <NotFound />
        }
    ];

    return (
        <>
            <Header />
            <div className={`mt-28 md:mt-16 flex flex-col md:flex-row justify-center w-full h-full ${darkMode ? "text-gray-100" : "text-gray-700"}`}>

                {/* Profile part */}
                <div className="px-3 md:w-1/4 h-full md:fixed left-2 lg:left-44">
                {isLoading ? <ProfileSkeleton /> : <div className={`mt-6 pt-2 border-2 rounded-lg ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
                        
                        <div className="flex justify-center">
                            <img className="w-24 rounded-full" src={photo} alt="" />
                        </div>
                        <h3 className="font-bold mt-2 text-lg text-center">{name}</h3>

                        {/* Change profile picture or Add Friend */}
                        {
                            loggedInUser.email === email ? <div className="file-input">
                                <input type="file" id="file" className="file" />
                                <label for="file">Change Profile Picture</label>
                            </div>
                                :
                                <div className="text-center mt-2"><button className={`px-4 py-1 rounded-2xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>Add Friend</button></div>
                        }

                        {/* Profile navigation like posts, about, friends */}
                        <div className={`mt-4 border-t-2 text-center ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                            <Link to={`/profile/${email}`}><button className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} px-2 py-1`}>Posts</button></Link>
                            <Link to={`/profile/${email}/about`}><button className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} px-2 py-1`}>About</button></Link>
                            <Link to={`/profile/${email}/friends`}><button className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} px-2 py-1`}>Friends</button></Link>
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
                    </div>}
                </div>

                {/* Main part */}
                <div className="px-1 md:w-3/5 mt-3 lg:w-2/5 md:relative top-0 md:left-16 lg:left-48">
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

export default Profile;