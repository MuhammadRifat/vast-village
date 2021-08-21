import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import Toast from '../../ConfirmationPopUp/Toast/Toast';
import PeopleGridSkeleton from '../../Loader/PeopleGridSkeleton/PeopleGridSkeleton';
import RequestGrid from './RequestGrid/RequestGrid';

const FriendRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loggedInUser] = useContext(userContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isToast, setIsToast] = useState(false);

    // Load all friend requests
    useEffect(() => {
        setIsLoading(true);
        fetch('https://vast-village-server.herokuapp.com/friendRequests', {
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

    // handle confirm friend
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
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {isLoading && <PeopleGridSkeleton />}
                {
                    requests?.map(request => <RequestGrid request={request} handleConfirmFriend={handleConfirmFriend} handleRemoveRequest={handleRemoveRequest} key={request.id}></RequestGrid>)
                }
            </div>

            {!isLoading && !requests.length && <div className="text-red-900 text-center">No friend requests found.</div>}
            {isToast && <Toast message="Successfully Confirmed" setIsToast={setIsToast} />}
        </>
    );
};

export default FriendRequests;