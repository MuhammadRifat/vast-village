import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import Loader from '../../Loader/Loader';
import FriendList from './FriendList/FriendList';

const Friends = ({Dots}) => {
    const [friends, setFriends] = useState([]);
    const [loggedInUser] = useContext(userContext);
    const {darkMode} = loggedInUser;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://vast-village-server.herokuapp.com/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loggedInUser.email})
        })
        .then(res => res.json())
        .then(data => {
            setFriends(data);
            setIsLoading(false);
        })
    }, [loggedInUser.email])

    const handleFriendRemove = (email, id) => {
        fetch('https://vast-village-server.herokuapp.com/deleteFriend', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailOne: loggedInUser.email, emailTwo: email})
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                const newFriends = friends.filter(friend => friend.id !== id);
                setFriends(newFriends);
            }
        })
    }
    
    return (
        <div className={`mt-3 grid grid-flow-row auto-rows-max rounded-t-lg rounded-b-lg ${darkMode ? " bg-gray-800" : " bg-gray-200"}`}>
        {isLoading && <Loader />}
        {!isLoading && !friends.length && <div className="text-red-900 text-center">No friends found.</div>}
                {
                   friends.map(friend => <FriendList friend={friend} handleFriendRemove={handleFriendRemove} Dots={false} key={friend.id}></FriendList>) 
                }
            </div>
    );
};

export default Friends;