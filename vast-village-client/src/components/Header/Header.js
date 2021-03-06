import React, { useContext, useEffect, useState } from 'react';
import logo from '../../images/profile.png';
import profile from '../../images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEnvelope, faBell, faUserFriends, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../App';
import { Link, useHistory } from 'react-router-dom';
import Switch from "react-switch";
import { checkEmail } from '../CheckEmail/CheckEmail';
import SearchData from './SearchData/SearchData';
import ConfirmationPopUp from '../ConfirmationPopUp/ConfirmationPopUp';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const history = useHistory();
    const [dropdown, setDropdown] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [focus, setFocus] = useState(false);
    const [unSeenNotifications, setUnSeenNotifications] = useState(0);
    const [unSeenFriendRequests, setUnSeenFriendRequests] = useState(0);
    const [isDisplay, setIsDisplay] = useState(false);

    // Get user data who logged in and check email from database.
    useEffect(() => {
        checkEmail(loggedInUser, setLoggedInUser);
    }, [])

    useEffect(() => {
        //find total notifications from database
        loadCount('totalNotifications', unSeenNotifications, setUnSeenNotifications)

        //find total friend requests from database
        loadCount('totalFriendRequests', unSeenFriendRequests, setUnSeenFriendRequests);
    }, [loggedInUser.email])

    const loadCount = (route, state, stateFunction) => {
        if (state === 0) {
            fetch(`https://vast-village-server.herokuapp.com/${route}/${loggedInUser.email}`)
                .then(res => res.json())
                .then(data => {
                    stateFunction(data);
                })
        }
    }

    // Handle logout button
    const handleLogout = () => {
        setIsDisplay(true);
    }

    // handle confirmation
    const handleConfirmation = () => {
        setLoggedInUser({ email: "", darkMode });
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    // Search friend by name
    const handleSearch = (e) => {
        const value = e.target.value.trim().toLowerCase();

        fetch(`https://vast-village-server.herokuapp.com/searchFriend/${value}`)
            .then(res => res.json())
            .then(data => {
                setSearchData(data);
            })
    }

    // Handle navbar peoples
    const handlePeoples = () => {
        history.push('/peoples');
        setUnSeenFriendRequests(0);
    }

    // Handle navbar notifications
    const handleNotifications = () => {
        history.push('/notifications');
        setUnSeenNotifications(0);
    }

    return (
        <>
            <div className="fixed top-0 w-full z-10">
                <div className={`grid grid-cols-1 py-3 md:grid-cols-2 sm:px-10 lg:px-36 ${darkMode ? "bg-gray-800" : "bg-gray-300"}`}>

                    {/* logo and search box */}
                    <div className="flex justify-center align-items-center">
                        <div className="w-10 bg-white rounded-full">
                            <Link to="/"><img src={logo} alt="" /></Link>
                        </div>
                        <div className="relative w-3/4">
                            <input type="text" name="search" id="search" onChange={handleSearch} onClick={() => setFocus(!focus)} autoComplete="off" className={`px-3 py-2 mx-3 sm:mx-5 w-full rounded-md focus:outline-none ${darkMode ? "bg-gray-600 text-white" : "bg-gray-50 text-black"}`} placeholder="Search" />
                            {
                                focus &&
                                <div className={`${darkMode ? "bg-gray-700" : "bg-white shadow-2xl"} absolute z-10 rounded-t-lg w-full left-3 sm:left-5 mt-1`}>
                                    {searchData?.map(data => <SearchData friend={data} key={data.id} />)}
                                </div>
                            }
                        </div>
                    </div >

                    {/* Navigation */}
                    <div className="flex justify-center align-items-center mt-3 md:mt-0" onClick={() => setFocus(false)}>
                        <button onClick={() => history.push('/')} className="p-1 bg-gray-500 rounded-3xl w-10 h-10 text-white text-xl"><FontAwesomeIcon icon={faHome} /></button>
                        <button onClick={() => history.push('/chats')} className="ml-2 sm:ml-6 p-1 bg-gray-500 rounded-3xl w-10 h-10 text-white text-xl"><FontAwesomeIcon icon={faEnvelope} /></button>
                        <button onClick={handlePeoples} className="ml-2 sm:ml-6 p-1 bg-gray-500 rounded-3xl w-10 h-10 text-white text-xl relative"><FontAwesomeIcon icon={faUserFriends} />{!!unSeenFriendRequests && <span className="block absolute top-0 right-0 rounded-full w-auto h-auto px-1 bg-red-500 text-center text-sm font-bold">{unSeenFriendRequests}</span>}</button>
                        <button onClick={handleNotifications} className="block ml-2 sm:ml-6 p-1 bg-gray-500 rounded-3xl w-10 h-10 text-white text-xl relative"><FontAwesomeIcon icon={faBell} />{!!unSeenNotifications && <span className="block absolute top-0 right-0 rounded-full w-auto h-auto px-1 bg-red-500 text-center text-sm font-bold">{unSeenNotifications}</span>}</button>
                        <div>
                            <button onClick={() => setDropdown(!dropdown)} className="ml-2 sm:ml-6 z-0 p-1 bg-gray-500 rounded-3xl w-10 h-10 text-white text-xl"><FontAwesomeIcon icon={faCaretDown} /></button>
                            {dropdown && <div className={`absolute w-32 mt-1 rounded-md shadow-lg grid grid-rows-2 ${darkMode ? "bg-gray-300" : "bg-white"}`}>
                                <button className=" p-1 hover:bg-gray-200 rounded-t-md border-b-2">
                                    <Switch onChange={() => setLoggedInUser({ ...loggedInUser, darkMode: !loggedInUser.darkMode })} checked={loggedInUser.darkMode} checkedIcon={false} uncheckedIcon={false} />
                                </button>
                                <button onClick={handleLogout} className="p-1 hover:bg-gray-200 rounded-b-md">Log out</button>
                            </div>}
                        </div>
                        <button onClick={() => history.push(`/profile/${loggedInUser.email}`)} className="ml-2 sm:ml-6 bg-gray-200 rounded-full w-10"><img className="rounded-full w-10" src={loggedInUser.photo || profile} alt="" /></button>
                    </div >
                </div >
            </div>
            {isDisplay && <ConfirmationPopUp handleConfirmation={handleConfirmation} setIsDisplay={setIsDisplay} text="Logout" />}
        </>
    );
};

export default Header;