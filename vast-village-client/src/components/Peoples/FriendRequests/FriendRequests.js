import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import Loader from '../../Loader/Loader';
import PeopleGrid from '../AllPeoples/PeopleGrid/PeopleGrid';
import RequestGrid from './RequestGrid/RequestGrid';

const FriendRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loggedInUser] = useContext(userContext);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/friendRequests', {
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

    const handleConfirmFriend = (email) => {
        fetch('http://localhost:5000/confirmFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ toEmail: loggedInUser.email, fromEmail: email, date: new Date() })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const newUsers = requests.filter(user => user.email !== email);
                    setRequests(newUsers);
                }
            })
    }

    const handleRemoveRequest = (email) => {
        fetch('http://localhost:5000/deleteRequest', {
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {isLoading && <Loader />}
        {!isLoading && !requests.length && <div className="text-red-900 text-center">No friend requests found.</div>}
            {
                requests?.map(request => <RequestGrid request={request} handleConfirmFriend={handleConfirmFriend} handleRemoveRequest={handleRemoveRequest} key={request.id}></RequestGrid>)
            }
        </div>
    );
};

export default FriendRequests;