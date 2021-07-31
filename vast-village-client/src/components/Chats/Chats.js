import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import ChatBox from './ChatBox/ChatBox';
import ChatFriend from './ChatFriend/ChatFriend';

const Chats = () => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState({});

    // Load all friends
    useEffect(() => {
        setIsLoading(true);
        fetch('https://vast-village-server.herokuapp.com/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setFriends(data);
                setChat(data[0]);
                setIsLoading(false);
            })
    }, [loggedInUser.email])
    return (
        <>
            <Header />
            <div className={`mt-28 md:mt-16 flex flex-row justify-center w-full h-full ${darkMode ? "text-gray-100" : "text-gray-700"}`}>

                {/* chat friends */}
                <div className="px-2 w-1/5 md:w-1/4 h-full fixed left-0 lg:left-44">
                    <h2 className={`text-2xl font-bold fixed w-1/4 p-1 ${darkMode ? "border-gray-800 text-gray-100" : " bg-gray-100 text-gray-600"}`}>Chats</h2>
                    <div className="mt-12 hide-scrollbar">
                        {
                            friends.map(friend => <ChatFriend friend={friend} setChat={setChat} request={false} key={friend.key} />)
                        }
                    </div>
                </div>

                {/* chat box */}
                <div className="px-0 w-4/5 md:w-3/5 lg:w-2/5 relative left-12 top-0 md:left-16 lg:left-48">
                    {
                        isLoading && <Loader />
                    }
                    <div className={`h-screen ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                        <ChatBox chat={chat} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chats;