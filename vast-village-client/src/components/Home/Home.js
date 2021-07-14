import React, { useContext, useEffect, useState } from 'react';
import Friend from '../Friend/Friend';
import Chats from '../Chats/Chats';
import Header from '../Header/Header';
import Main from './Main/Main';
import './Home.css';
import CreatePost from '../CreatePost/CreatePost';
import Loader from '../Loader/Loader';
import { userContext } from '../../App';
import { checkEmail } from '../CheckEmail/CheckEmail';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const {darkMode} = loggedInUser;

    useEffect( () => {
        fetch('http://localhost:5000/posts')
        .then(res => res.json())
        .then(data => {
            setPosts(data);
        })
    }, [])

    const handleFriend = (id) => {
        console.log(id);
    }

    return (
        <>
            <Header />
            <div className={`mt-28 md:mt-16 flex flex-col md:flex-row justify-center w-full h-full ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                
                {/* Friends part */}
                <div className="hidden md:block md:w-1/4 h-full fixed left-8 hide-scrollbar">
                    <h2 className={`text-2xl font-bold fixed w-1/4 p-1 border-b-2 ${darkMode ? "border-gray-800 text-gray-100" : " bg-gray-100 text-gray-600"}`}>Friends</h2>
                    <div className="mt-10">
                        {/* {
                            posts?.map(friend => <Friends friend={friend} handleFriend={handleFriend} key={friend.id}></Friends>)
                        } */}
                    </div>
                </div>

                {/* Main part */}
                <div className="md:w-2/5 relative top-0">
                    {!posts.length && <Loader />}
                    <CreatePost />
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