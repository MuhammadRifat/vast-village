import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import { checkEmail } from '../CheckEmail/CheckEmail';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import FriendGrid from './FriendGrid/FriendGrid';

const Friends = () => {
    const [loggedInUser] = useContext(userContext);
    const {darkMode} = loggedInUser;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
    }, [])

    return (
        <>
            <Header />
            <div className={`mt-28 md:mt-16 flex flex-col md:flex-row justify-center w-full h-full ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>

               {/* Menu part */}
               <div className="hidden md:block md:w-1/4 h-full fixed left-8">
                    <h2 className={`text-2xl font-bold fixed w-1/4 p-1 border-b-2 ${darkMode ? "border-gray-800 text-gray-100" : " bg-gray-100 text-gray-600"}`}>Friends</h2>
                    <div className="mt-10">
                        <button className={`px-4 py-2 w-full rounded-lg font-bold text-lg mt-1 ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : " bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>All Friends</button>
                        <button className={`px-4 py-2 w-full rounded-lg font-bold text-lg mt-1 ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : " bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>Friend Requests</button>
                        <button className={`px-4 py-2 w-full rounded-lg font-bold text-lg mt-1 ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : " bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>Contact</button>
                    </div>
                </div>

                {/* Main part */}
                <div className="md:w-2/5 my-3 grid grid-cols-2 lg:grid-cols-3 gap-3 relative top-0">
                    {!users.length && <Loader />}
                    {
                        users?.map(user => <FriendGrid user={user} key={user.id}></FriendGrid>)
                    }
                </div>

            </div>
        </>
    );
};

export default Friends;