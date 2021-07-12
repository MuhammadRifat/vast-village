import React from 'react';
import Header from '../Header/Header';
import Main from './Main/Main';

const Home = () => {
    const posts = [
        {
            "id": 1,
            "name": "Rifat Mia",
            "postBody": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nulla fugiat nihil libero ipsa fugit pariatur. Nihil sunt blanditiis maxime quam consectetur laudantium odio cum explicabo vel assumenda? Veritatis, sit?",
            "date": "july 12",
            "photo": "",
            "likes": 20,
            "shares": 10,
            "comments": [
                {
                    "id": 1
                },
                {
                    "id": 2
                }
            ]
        },
        {
            "id": 2,
            "name": "Rifat Mia",
            "postBody": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nulla fugiat nihil libero ipsa fugit pariatur. Nihil sunt blanditiis maxime quam consectetur laudantium odio cum explicabo vel assumenda? Veritatis, sit?. kdjf kjdf kadf ka jkadf kjafd;asf kadfs jkdasfkj kajsfdkfsdaj sadfkj lkfsjfajk fdjkafkj",
            "date": "july 13",
            "photo": "",
            "likes": 20,
            "shares": 10,
            "comments": [
                {
                    "id": 1
                },
                {
                    "id": 2
                }
            ]
        },
        {
            "id": 3,
            "name": "Mr Riyad",
            "postBody": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nulla fugiat nihil libero ipsa fugit pariatur. Nihil sunt blanditiis maxime quam consectetur laudantium odio cum explicabo vel assumenda? Veritatis, sit?. kdjf kjdf kadf ka jkadf kjafd;asf kadfs jkdasfkj kajsfdkfsdaj sadfkj lkfsjfajk fdjkafkj",
            "date": "july 13",
            "photo": "",
            "likes": 20,
            "shares": 10,
            "comments": [
                {
                    "id": 1
                },
                {
                    "id": 2
                }
            ]
        },
        {
            "id": 4,
            "name": "Mr Rakib",
            "postBody": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nulla fugiat nihil libero ipsa fugit pariatur. Nihil sunt blanditiis maxime quam consectetur laudantium odio cum explicabo vel assumenda? Veritatis, sit?. kdjf kjdf kadf ka jkadf kjafd;asf kadfs jkdasfkj kajsfdkfsdaj sadfkj lkfsjfajk fdjkafkj",
            "date": "july 13",
            "photo": "",
            "likes": 20,
            "shares": 10,
            "comments": [
                {
                    "id": 1
                },
                {
                    "id": 2
                }
            ]
        },
        {
            "id": 5,
            "name": "Mr Hridoy",
            "postBody": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure nulla fugiat nihil libero ipsa fugit pariatur. Nihil sunt blanditiis maxime quam consectetur laudantium odio cum explicabo vel assumenda? Veritatis, sit?. kdjf kjdf kadf ka jkadf kjafd;asf kadfs jkdasfkj kajsfdkfsdaj sadfkj lkfsjfajk fdjkafkj",
            "date": "july 13",
            "photo": "",
            "likes": 20,
            "shares": 10,
            "comments": [
                {
                    "id": 1
                },
                {
                    "id": 2
                }
            ]
        },
    ];
    return (
        <>
            <Header />
            <div className="mt-28 md:mt-16 flex flex-col md:flex-row justify-center bg-gray-100">
                <div className="hidden md:block md:w-1/4">
                    1
                </div>
                <div className="md:w-2/5">
                    {
                        posts.map(post => <Main post={post} key={post.id}></Main>)
                    }
                </div>
                <div className="hidden md:block md:w-1/4">
                    3
                </div>
            </div>
        </>
    );
};

export default Home;