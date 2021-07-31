import React, { useContext } from 'react';
import { userContext } from '../../../App';

const ChatFriend = ({ friend, setChat }) => {
    const { name, photo } = friend;
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;

    return (
        <div onClick={() => setChat(friend)} className={`py-2 px-3 border-b-2 rounded-md flex justify-between w-full cursor-pointer ${darkMode ? "border-gray-700 bg-gray-800 text-gray-100" : "border-gray-300 bg-white text-gray-700"}`}>
            <div className="flex items-center w-60">
                <img className="w-16 rounded-full" src={photo} alt="" />
                <h3 className={`hidden md:block font-bold text-md ml-3`}>{name}</h3>
            </div>

        </div>
    );
};

export default ChatFriend;