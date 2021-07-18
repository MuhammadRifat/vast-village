import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from './Main/Main';
import './Home.css';
import CreatePost from '../CreatePost/CreatePost';
import Loader from '../Loader/Loader';
import { userContext } from '../../App';
import FriendsHome from './FriendsHome/FriendsHome';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [isLoading, setIsLoading] = useState(false);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setIsLoading(false);
            })
    }, [])

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/friendRequests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setRequests(data);
                setIsLoading(false);
            })
    }, [])

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setFriends(data);
                setIsLoading(false);
            })
    }, [])

    const handleConfirmFriend = (email) => {
        fetch('http://localhost:5000/confirmFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ toEmail: loggedInUser.email, fromEmail: email, date: new Date() })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const newUsers = requests.filter(user => user.email !== email);
                    setRequests(newUsers);
                }
            })
    }

    const handleRemoveRequest = (email) => {
        fetch('http://localhost:5000/deleteRequest', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ toEmail: loggedInUser.email, fromEmail: email })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const newUsers = requests.filter(user => user.email !== email);
                    setRequests(newUsers);
                }
            })
    }

    return (
        <>
            <Header />
            <div className={`mt-28 md:mt-16 flex flex-col md:flex-row justify-center w-full h-full`}>

                {/* Friends part */}
                <div className="hidden md:block md:w-1/4 h-full fixed left-2 hide-scrollbar">
                    <h2 className={`text-2xl font-bold fixed w-1/4 p-1 border-b-2 ${darkMode ? "border-gray-800 text-gray-100" : " bg-gray-100 text-gray-600"}`}>Friends</h2>
                    <div className="mt-12">
                        {
                            requests.map(friend => <FriendsHome friend={friend} request={true} handleConfirmFriend={handleConfirmFriend} handleRemoveRequest={handleRemoveRequest} key={friend.key} />)
                        }
                        {
                            friends.map(friend => <FriendsHome friend={friend} request={false} key={friend.key} />)
                        }
                    </div>
                </div>

                {/* Main part */}
                <div className="md:w-2/5 relative top-0">
                    <CreatePost />

                    {isLoading && <Loader />}
                    {!isLoading && !posts.length && <div className="text-red-900 text-center">Posts not found</div>}
                    {
                        posts?.map(post => <Main post={post} key={post.post_id}></Main>)
                    }
                </div>

                {/* Messaging part */}
                <div className="hidden md:block md:w-1/4 h-full fixed right-0 hide-scrollbar">
                    <h2 className={`text-2xl font-bold fixed w-1/4 p-1 border-b-2 ${darkMode ? "border-gray-800 text-gray-100" : " bg-gray-100 text-gray-600"}`}>Messaging</h2>
                    <div className="mt-10">
                        {/* {
                            posts?.map(friend => <Chats friend={friend} handleFriend={handleFriend} key={friend.id}></Chats>)
                        } */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;