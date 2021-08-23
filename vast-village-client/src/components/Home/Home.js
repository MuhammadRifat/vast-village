import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from './Main/Main';
import './Home.css';
import CreatePost from '../CreatePost/CreatePost';
import { userContext } from '../../App';
import FriendsHome from './FriendsHome/FriendsHome';
import PostSkeleton from '../Loader/PostSkeleton/PostSkeleton';
import FriendsSkeleton from '../Loader/FriendsSkeleton/FriendsSkeleton';
import Toast from '../ConfirmationPopUp/Toast/Toast';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [isLoading, setIsLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [isToast, setIsToast] = useState(false);

    // Load data from database
    useEffect(() => {
        // Load all friends posts
        loadData('posts', setPosts);

        // Load all friend requests
        loadData('friendRequests', setRequests);

        // Load all friends
        loadData('friends', setFriends);
    }, [loggedInUser.email])

    // loader function
    const loadData = (route, stateFunction) => {
        fetch(`https://vast-village-server.herokuapp.com/${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                stateFunction(data);
                setIsLoading(false);
            })
    }

    // Handle confirm button
    const handleConfirmFriend = (email) => {
        const newUsers = requests.filter(user => user.email !== email);
        setRequests(newUsers);

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
                    setIsToast(true);
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
                    {
                        posts?.map(post => <Main post={post} key={post.post_id}></Main>)
                    }

                    {/* {!isLoading && !posts.length && <div className="text-red-600 text-center">No posts found.</div>} */}
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

            {isToast && <Toast message="Successfully Confirmed" setIsToast={setIsToast} />}
        </>
    );
};

export default Home;