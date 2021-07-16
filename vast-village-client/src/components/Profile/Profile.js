import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../../App';
import CreatePost from '../CreatePost/CreatePost';
import Header from '../Header/Header';
import Main from '../Home/Main/Main';
import Loader from '../Loader/Loader';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loggedInUser] = useContext(userContext);
    const [posts, setPosts] = useState([])
    const {email} = useParams();
    const [user, setUser] = useState({});
    const {id, name, photo} = user;
    const {darkMode} = loggedInUser;

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5000/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
            setIsLoading(false);
        })
    }, [email])

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/getUserPosts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then(data => {
            setPosts(data);
            setIsLoading(false);
        })

    }, [email])
    
    return (
        <>
            <Header />
            <div className={`mt-28 md:mt-16 flex flex-col md:flex-row justify-center w-full h-full ${darkMode ? "text-gray-100" : "text-gray-700"}`}>

                {/* Friends part */}
                <div className="hidden md:block md:w-1/4 h-full fixed left-2 lg:left-44">
                    <div className={`mt-6 py-2 border-2 rounded-lg flex justify-center ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
                       <div className="text-center">
                           <img className="w-24 rounded-full ml-7" src={photo} alt="" />
                           <h3 className="font-bold mt-2 text-lg">{name}</h3>
                        </div>
                    </div>
                </div>

                {/* Main part */}
                <div className="md:w-3/5 mt-4 lg:w-2/5 relative top-0 md:left-16 lg:left-48">
                    <CreatePost />

                    {isLoading && <Loader />}
                    {!isLoading && !posts.length && <div className="text-red-900 text-center">Posts not found</div>}
                    {
                        posts?.map(post => <Main post={post} key={post.post_id}></Main>)
                    }
                </div>
            </div>
        </>
    );
};

export default Profile;