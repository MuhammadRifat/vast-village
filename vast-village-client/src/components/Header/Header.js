import React from 'react';
import logo from '../../images/profile.png';
import profile from '../../images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEnvelope, faBell, faUserFriends, faCaretDown } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <div className="fixed top-0 w-full">
            <div className="grid grid-cols-1 bg-gray-300 py-3 md:grid-cols-2 px-10 lg:px-36">
                <div className="flex justify-center align-items-center">
                    <img src={logo} alt="" width="40" />
                    <input type="text" name="" id="" className="px-3 mx-5 w-3/4 rounded-md" placeholder="Search" />
                </div>
                <div className="flex justify-center align-items-center mt-3 md:mt-0">
                    <button className="p-1 bg-gray-500 rounded-3xl w-10 text-white text-xl"><FontAwesomeIcon icon={faHome} /></button>
                    <button className="ml-6 p-1 bg-gray-500 rounded-3xl w-10 text-white text-xl"><FontAwesomeIcon icon={faEnvelope} /></button>
                    <button className="ml-6 p-1 bg-gray-500 rounded-3xl w-10 text-white text-xl"><FontAwesomeIcon icon={faUserFriends} /></button>
                    <button className="ml-6 p-1 bg-gray-500 rounded-3xl w-10 text-white text-xl"><FontAwesomeIcon icon={faBell} /></button>
                    <button className="ml-6 p-1 bg-gray-500 rounded-3xl w-10 text-white text-xl"><FontAwesomeIcon icon={faCaretDown} /></button>
                    <button className="ml-6 bg-gray-200 rounded-3xl w-10"><img src={profile} alt="" /></button>
                </div>
            </div>
        </div>
    );
};

export default Header;