import React, { useContext, useState } from 'react';
import { userContext } from '../../../App';
import './ChatBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const ChatBox = ({ chat }) => {
    const { id, email, name, photo } = chat;
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [message, setMessage] = useState("");
    
    const handleSent = (e) => {
        e.preventDefault();

        console.log(message);
        setMessage("");
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }
    return (
        <div className="top-0 w-full h-full ">
            <div className="fixed shadow-md chat-box">
                <div className={`flex p-2 items-center`}>
                    <img className="w-12 rounded-full" src={photo} alt="" />
                    <h3 className="ml-4 text-xl font-bold">{name}</h3>
                </div>
            </div>

            <div className="fixed bottom-0 chat-box">
                <form onSubmit={handleSent} className="w-full flex rounded-b-md p-2 shadow-2xl">
                    <input onChange={handleChange} className={`w-full rounded-md focus:outline-none px-2 text-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} value={message} autocomplete="off" placeholder="Write a message" />
                    <button type="submit" className={`ml-2 px-3 focus:outline-none rounded-lg text-lg py-2 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}><FontAwesomeIcon icon={faPaperPlane} /></button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;