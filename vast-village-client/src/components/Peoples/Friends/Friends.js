import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import FriendsSkeleton from '../../Loader/FriendsSkeleton/FriendsSkeleton';
import FriendList from './FriendList/FriendList';

const Friends = ({ Dots, email }) => {
    const [friends, setFriends] = useState([]);
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://vast-village-server.herokuapp.com/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
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
            body: JSON.stringify({ emailOne: loggedInUser.email, emailTwo: email })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const newFriends = friends.filter(friend => friend.id !== id);
                    setFriends(newFriends);
                }
            })
    }

    return (
        <div className={`my-3 grid grid-flow-row auto-rows-max rounded-t-lg rounded-b-lg ${darkMode ? " bg-gray-800 text-gray-100" : " bg-gray-200 text-gray-700"}`}>
            {isLoading && <FriendsSkeleton />}
            {!isLoading && !friends.length && <div className="text-red-900 text-center">No friends found.</div>}
            {
                !isLoading && !!friends.length && <div className="py-1 px-2 text-lg">Friends: ({friends.length})</div>
            }
            {
                friends?.map(friend => <FriendList friend={friend} handleFriendRemove={handleFriendRemove} Dots={false} key={friend.id}></FriendList>)
            }
        </div>
    );
};

export default Friends;