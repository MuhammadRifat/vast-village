import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';

const FriendsHome = ({ friend, request, handleConfirmFriend, handleRemoveRequest }) => {
    const { email, name, photo } = friend;
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;

    return (
        <div className={`py-2 px-3 border-b-2 rounded-md flex justify-between w-full ${darkMode ? "border-gray-700 bg-gray-800 text-gray-100" : "border-gray-300 bg-white text-gray-700"}`}>
            {/* Photo and Name */}
            <Link to={`/profile/${email}`}>
                <div className="flex items-center w-60">
                    <img className="w-16 rounded-full" src={photo} alt="" />
                    <h3 className={`font-bold text-md ml-3`}>{name}</h3>
                </div>
            </Link>

            {/* Buttons */}
            <div className="flex items-center text-right">
                <div>
                    {!request && <button className={`px-3 py-1 rounded-2xl bg-transparent border-2 mr-3 ${darkMode ? "border-gray-600 hover:bg-gray-700" : "border-gray-400 hover:bg-gray-300"}`}>Message</button>}
                    {request &&
                        <div>
                            <button onClick={() => handleConfirmFriend(email)} className={`px-3 py-1 rounded-2xl border-2 mr-3 ${darkMode ? "bg-gray-300 text-black hover:bg-gray-400" : "text-white bg-gray-500 hover:bg-gray-400"}`}>Confirm</button>
                            <button onClick={() => handleRemoveRequest(email)} className={`px-3 py-1 mt-2 rounded-2xl bg-transparent border-2 mr-3 ${darkMode ? "border-gray-600 hover:bg-gray-700" : "border-gray-400 hover:bg-gray-300"}`}>Remove</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default FriendsHome;