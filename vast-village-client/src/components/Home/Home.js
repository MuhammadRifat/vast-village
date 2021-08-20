import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from './Main/Main';
import './Home.css';
import CreatePost from '../CreatePost/CreatePost';
import { userContext } from '../../App';
import FriendsHome from './FriendsHome/FriendsHome';
import PostSkeleton from '../Loader/PostSkeleton/PostSkeleton';
import FriendsSkeleton from '../Loader/FriendsSkeleton/FriendsSkeleton';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [isLoading, setIsLoading] = useState(true);
    const [requests, setRequests] = useState([]);

    // Load all friends posts
    useEffect(() => {
        setIsLoading(true);
        fetch('https://vast-village-server.herokuapp.com/posts', {
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
    }, [loggedInUser.email])

    // Load all friend requests
    useEffect(() => {
        setIsLoading(true);
        fetch('https://vast-village-server.herokuapp.com/friendRequests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setRequests(data);
                setIsLoading(false);
            })
    }, [loggedInUser.email])

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
                setIsLoading(false);
            })
    }, [loggedInUser.email])


    // Handle confirm button
    const handleConfirmFriend = (email) => {
        fetch('https://vast-village-server.herokuapp.com/confirmFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ toEmail: loggedInUser.email, fromEmail: email, photo: loggedInUser.photo, name: loggedInUser.name, date: new Date() })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const newUsers = requests.filter(user => user.email !== email);
                    setRequests(newUsers);
                }
            })
    }

    // Handle friend request delete button
    const handleRemoveRequest = (email) => {
        fetch('https://vast-village-server.herokuapp.com/deleteRequest', {
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
                <div className="hidden md:block md:w-1/4 h-full fixed left-2">
                    <h2 className={`text-2xl font-bold fixed w-1/4 p-1 border-b-2 ${darkMode ? "border-gray-800 text-gray-100" : " bg-gray-100 text-gray-600"}`}>Friends</h2>
                    <div className="mt-12 w-full hide-scrollbar">
                        {isLoading && <FriendsSkeleton />}
                        {
                            requests.map(friend => <FriendsHome friend={friend} request={true} handleConfirmFriend={handleConfirmFriend} handleRemoveRequest={handleRemoveRequest} key={friend.key} />)
                        }
                        {
                            friends.map(friend => <FriendsHome friend={friend} request={false} key={friend.key} />)
                        }
                    </div>
                </div>

                {/* Main part */}
                <div className="md:w-2/5 px-1 relative top-0">
                    <CreatePost />

                    {isLoading && <PostSkeleton />}
                    {!isLoading && !posts.length && <div className="text-red-900 text-center">No posts found.</div>}
                    {
                        posts?.map(post => <Main post={post} key={post.post_id}></Main>)
                    }
                </div>

                {/* Messaging part */}
                <div className="hidden md:block md:w-1/4 h-full fixed right-0 hide-scrollbar">
                    <h2 className={`text-2xl font-bold fixed w-1/4 p-1 border-b-2 ${darkMode ? "border-gray-800 text-gray-100" : " bg-gray-100 text-gray-600"}`}>Messaging</h2>
                    <div className="mt-10">
                        {/* {
                            posts?.map(friend => <Chat friend={friend} handleFriend={handleFriend} key={friend.id}></Chat>)
                        } */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;