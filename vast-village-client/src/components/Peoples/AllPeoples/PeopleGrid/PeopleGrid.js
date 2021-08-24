import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../../App';
import image from '../../../../images/avater.png';

const PeopleGrid = ({ user, handleAddFriend }) => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [isSend, setIsSend] = useState(false);

    const { email, name, photo } = user;

    return (
        <div className={`p-3 rounded-lg text-center shadow-md hover:shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <Link to={`/profile/${email}`}>
                <div className="flex justify-center">
                    <img className="w-24 rounded-full" src={photo || image} alt="" />
                </div>
                <h3 className={`mt-1 font-bold ${darkMode ? "text-white" : "text-gray-700"}`}>{name}</h3>
            </Link>
            <button onClick={() => handleAddFriend(email, setIsSend)} className={`mt-4 px-8 py-1 rounded-xl ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-200 text-black"}`} disabled={isSend && "disabled"} style={isSend ? { cursor: 'context-menu', backgroundColor: 'gray' } : {}}>{isSend ? "Sent" : "Add Friend"}</button>
        </div>
    );
};

export default PeopleGrid;