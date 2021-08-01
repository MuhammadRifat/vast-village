import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import './ChatBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Message from './Message/Message';

const ChatBox = ({ chat }) => {
    const { email, name, photo } = chat;
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [message, setMessage] = useState("");
    const [isMessage, setIsMessage] = useState("");
    const [chats, setChats] = useState([]);

    useEffect(() => {
        fetch('https://vast-village-server.herokuapp.com/chats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender_email: loggedInUser.email, receiver_email: email })
        })
            .then(res => res.json())
            .then(data => {
                setChats(data);
            })
    }, [email, loggedInUser.email, isMessage])

    const handleSent = (e) => {
        e.preventDefault();

        const newMessage = {
            sender_email: loggedInUser.email,
            receiver_email: email,
            message: message.replaceAll("'", "''"),
            status: 'unseen',
            date: new Date()
        }

        fetch('https://vast-village-server.herokuapp.com/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsMessage(message);
                    setMessage("");
                }
            })
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }
    return (
        <div className="top-0 w-full h-full ">
            <div className={`fixed shadow-md chat-box ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                <div className={`flex p-2 items-center`}>
                    <img className="w-12 rounded-full" src={photo} alt="" />
                    <h3 className="ml-4 text-xl font-bold">{name}</h3>
                </div>
            </div>
            <div className="h-96 overflow-y-scroll pt-16 pb-2 rounded-b-md px-2">
                {
                    chats?.map(message => <Message message={message} key={message.id} />)
                }
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