import React, { useEffect, useState } from 'react';
import Friends from '../Friends/Friends';
import Chats from '../Chats/Chats';
import Header from '../Header/Header';
import Main from './Main/Main';
import './Home.css';
import CreatePost from '../CreatePost/CreatePost';
import Loader from '../Loader/Loader';

const Home = () => {
    const [posts, setPosts] = useState([]);

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
    // const posts = [
    //     {
    //         "id": 1,
    //         "name": "Muhammad",
    //         "postBody": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nulla fugiat nihil libero ipsa fugit pariatur. Nihil sunt blanditiis maxime quam consectetur laudantium odio cum explicabo vel assumenda? Veritatis, sit?",
    //         "date": "july 12",
    //         "photo": "",
    //         "likes": 20,
    //         "shares": 10,
    //         "comments": [
    //             {
    //                 "id": 1
    //             },
    //             {
    //                 "id": 2
    //             }
    //         ]
    //     },
    //     {
    //         "id": 2,
    //         "name": "Rifat Mia",
    //         "postBody": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nulla fugiat nihil libero ipsa fugit pariatur. Nihil sunt blanditiis maxime quam consectetur laudantium odio cum explicabo vel assumenda? Veritatis, sit?. kdjf kjdf kadf ka jkadf kjafd;asf kadfs jkdasfkj kajsfdkfsdaj sadfkj lkfsjfajk fdjkafkj",
    //         "date": "july 13",
    //         "photo": "",
    //         "likes": 20,
    //         "shares": 10,
    //         "comments": [
    //             {
    //                 "id": 1
    //             },
    //             {
    //                 "id": 2
    //             }
    //         ]
    //     },
    //     {
    //         "id": 3,
    //         "name": "Mr Riyad",
    //         "postBody": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nulla fugiat nihil libero ipsa fugit pariatur. Nihil sunt blanditiis maxime quam consectetur laudantium odio cum explicabo vel assumenda? Veritatis, sit?. kdjf kjdf kadf ka jkadf kjafd;asf kadfs jkdasfkj kajsfdkfsdaj sadfkj lkfsjfajk fdjkafkj",
    //         "date": "july 13",
    //         "photo": "",
    //         "likes": 20,
    //         "shares": 10,
    //         "comments": [
    //             {
    //                 "id": 1
    //             },
    //             {
    //                 "id": 2
    //             }
    //         ]
    //     },
    //     {
    //         "id": 4,
    //         "name": "Mr Rakib",
    //         "postBody": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nulla fugiat nihil libero ipsa fugit pariatur. Nihil sunt blanditiis maxime quam consectetur laudantium odio cum explicabo vel assumenda? Veritatis, sit?. kdjf kjdf kadf ka jkadf kjafd;asf kadfs jkdasfkj kajsfdkfsdaj sadfkj lkfsjfajk fdjkafkj",
    //         "date": "july 13",
    //         "photo": "",
    //         "likes": 20,
    //         "shares": 10,
    //         "comments": [
    //             {
    //                 "id": 1
    //             },
    //             {
    //                 "id": 2
    //             }
    //         ]
    //     },
    //     {
    //         "id": 5,
    //         "name": "Mr Hridoy",
    //         "postBody": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nulla fugiat nihil libero ipsa fugit pariatur. Nihil sunt blanditiis maxime quam consectetur laudantium odio cum explicabo vel assumenda? Veritatis, sit?. kdjf kjdf kadf ka jkadf kjafd;asf kadfs jkdasfkj kajsfdkfsdaj sadfkj lkfsjfajk fdjkafkj",
    //         "date": "july 13",
    //         "photo": "",
    //         "likes": 20,
    //         "shares": 10,
    //         "comments": [
    //             {
    //                 "id": 1
    //             },
    //             {
    //                 "id": 2
    //             }
    //         ]
    //     }
    // ];

    if(!posts.length) {
        return <Loader />
    }

    return (
        <>
            <Header />
            <div className="mt-28 md:mt-16 flex flex-col md:flex-row justify-center w-full h-full bg-gray-100 border-2">
                
                {/* Friends part */}
                <div className="hidden md:block md:w-1/4 h-full fixed left-8 hide-scrollbar">
                    <h2 className="text-2xl font-bold fixed bg-gray-100 w-1/4 p-1 border-b-2 text-gray-600">Friends</h2>
                    <div className="mt-10">
                        {/* {
                            posts?.map(friend => <Friends friend={friend} handleFriend={handleFriend} key={friend.id}></Friends>)
                        } */}
                    </div>
                </div>

                {/* Main part */}
                <div className="md:w-2/5 relative top-0">
                    <CreatePost />
                    {
                        posts?.map(post => <Main post={post} key={post.id}></Main>)
                    }
                </div>

                {/* Messaging part */}
                <div className="hidden md:block md:w-1/4 h-full fixed right-0 hide-scrollbar">
                    <h2 className="text-2xl font-bold fixed bg-gray-100 w-1/4 p-1 border-b-2 text-gray-600">Messaging</h2>
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