import React, { useContext } from 'react';
import logo from '../../images/profile.png';
import profile from '../../images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEnvelope, faBell, faUserFriends, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../App';
import {  useHistory } from 'react-router-dom';

const Header = () => {
    const [loggedInUser] = useContext(userContext);
    const history = useHistory();
    
    return (
        <div className="fixed top-0 w-full z-10">
            <div className="grid grid-cols-1 bg-gray-300 py-3 md:grid-cols-2 px-10 lg:px-36">
                <div className="flex justify-center align-items-center">
                    <div className="w-10 bg-white rounded-full"><img src={logo} alt="" /></div>
                    <input type="text" name="" id="" className="px-3 mx-5 w-3/4 rounded-md focus:outline-none" placeholder="Search" />
                </div>
                <div className="flex justify-center align-items-center mt-3 md:mt-0">
                    <button onClick={() => history.push('/')} className="p-1 bg-gray-500 rounded-3xl w-10 text-white text-xl"><FontAwesomeIcon icon={faHome} /></button>
                    <button onClick={() => history.push('/chats')} className="ml-6 p-1 bg-gray-500 rounded-3xl w-10 text-white text-xl"><FontAwesomeIcon icon={faEnvelope} /></button>
                    <button onClick={() => history.push('/friends')} className="ml-6 p-1 bg-gray-500 rounded-3xl w-10 text-white text-xl"><FontAwesomeIcon icon={faUserFriends} /></button>
                    <button onClick={() => history.push('/notifications')} className="ml-6 p-1 bg-gray-500 rounded-3xl w-10 text-white text-xl"><FontAwesomeIcon icon={faBell} /></button>
                    <button onClick={() => history.push('/preference')} className="ml-6 p-1 bg-gray-500 rounded-3xl w-10 text-white text-xl"><FontAwesomeIcon icon={faCaretDown} /></button>
                    <button onClick={() => history.push('/profile')} className="ml-6 bg-gray-200 rounded-full w-10"><img className="rounded-full" src={loggedInUser.photo || profile} alt="" /></button>
                </div>
            </div>
        </div>
    );
};

export default Header;