import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const FriendList = ({ friend, handleFriendRemove }) => {
    const { id, email, name, photo } = friend;
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setDropdown(false);
        }, 5000)
    }, [dropdown])

    return (
        <div className={`py-2 px-4 border-b-2 flex justify-between items-center ${darkMode ? "border-gray-700  text-gray-100" : "border-gray-300  text-gray-700"}`}>
            <Link to={`/profile/${email}`}>
                <div className="flex items-center">
                    <img className="w-16 rounded-full" src={photo} alt="" />
                    <h3 className={`font-bold text-md ml-3`}>{name}</h3>
                </div>
            </Link>

            <div className="flex items-center">
                <button className={`px-4 py-1 rounded-2xl bg-transparent border-2 mr-3 ${darkMode ? "border-gray-600 hover:bg-gray-700" : "border-gray-400 hover:bg-gray-300"}`}>Message</button>

                <div className="relative">
                    <button onClick={() => setDropdown(!dropdown)}><FontAwesomeIcon icon={faEllipsisH} /></button>
                    {dropdown && <div className={`absolute w-24 mt-1 rounded-md shadow-lg grid grid-rows-1 ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}>
                        <button onClick={() => handleFriendRemove(email, id)} className=" p-1 rounded-t-md"><FontAwesomeIcon icon={faTrashAlt} /> Remove</button>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default FriendList;