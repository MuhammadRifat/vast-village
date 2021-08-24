import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import PeopleGrid from './PeopleGrid/PeopleGrid';
import PeopleGridSkeleton from '../../Loader/PeopleGridSkeleton/PeopleGridSkeleton';
import Toast from '../../ConfirmationPopUp/Toast/Toast';

const AllPeoples = () => {
    const [loggedInUser] = useContext(userContext);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isToast, setIsToast] = useState(false);

    // load all users from the database
    useEffect(() => {
        setIsLoading(true);
        fetch('https://vast-village-server.herokuapp.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setIsLoading(false);
            })
    }, [loggedInUser.email])

    // handle addFriend btn
    const handleAddFriend = (email, setIsSend) => {
        // const newUsers = users.filter(user => user.email !== email);
        // setUsers(newUsers);
        setIsSend(true);

        fetch('https://vast-village-server.herokuapp.com/addFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fromEmail: loggedInUser.email, toEmail: email, date: new Date() })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsToast(true);
                }
            })
    }
    return (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {isLoading && <PeopleGridSkeleton />}
                {
                    users?.map(user => <PeopleGrid user={user} handleAddFriend={handleAddFriend} key={user.id}></PeopleGrid>)
                }
            </div>

            {!isLoading && !users.length && <div className="text-red-600 text-center">No peoples found.</div>}
            {isToast && <Toast message="Friend request sent" setIsToast={setIsToast} />}
        </>
    );
};

export default AllPeoples;