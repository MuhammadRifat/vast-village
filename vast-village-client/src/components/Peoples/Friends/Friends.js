import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import FriendsSkeleton from '../../Loader/FriendsSkeleton/FriendsSkeleton';
import FriendList from './FriendList/FriendList';

const Friends = ({ email }) => {
    const [friends, setFriends] = useState([]);
    const [myFriends, setMyFriends] = useState([]);
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [isLoading, setIsLoading] = useState(true);

    const loadFriends = (inputEmail, isMe) => {
        setIsLoading(true);
        fetch('https://vast-village-server.herokuapp.com/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: inputEmail })
        })
            .then(res => res.json())
            .then(data => {
               if(isMe){
                   setMyFriends(data);
               } else {
                   setFriends(data);
               }
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if (loggedInUser.email === email) {
            loadFriends(email, false);
        } else {
            loadFriends(loggedInUser.email, true);
            loadFriends(email, false);
        }
    }, [email, loggedInUser.email])

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
        <div className={`my-3 grid grid-flow-row auto-rows-max rounded-t-lg rounded-b-lg ${darkMode ? " bg-gray-800 text-gray-100" : " bg-white text-gray-700"}`}>
            {isLoading && <FriendsSkeleton />}
            {!isLoading && !friends.length && <div className="text-red-900 text-center">No friends found.</div>}
            {
                !isLoading && !!friends.length && <div className="py-1 px-2 text-lg">Friends: ({friends.length})</div>
            }
            {
                friends?.map(friend => <FriendList friend={friend} myFriends={myFriends} handleFriendRemove={handleFriendRemove} dots={email === loggedInUser.email} key={friend.id}></FriendList>)
            }
        </div>
    );
};

export default Friends;