import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import PeopleGrid from './PeopleGrid/PeopleGrid';
import PeopleGridSkeleton from '../../Loader/PeopleGridSkeleton/PeopleGridSkeleton';

const AllPeoples = () => {
    const [loggedInUser] = useContext(userContext);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const handleAddFriend = (email) => {
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
                    const newUsers = users.filter(user => user.email !== email);
                    setUsers(newUsers);
                }
            })
    }
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {isLoading && <PeopleGridSkeleton />}
            {!isLoading && !users.length && <div className="text-red-800 text-center">No peoples found.</div>}
            {
                users?.map(user => <PeopleGrid user={user} handleAddFriend={handleAddFriend} key={user.id}></PeopleGrid>)
            }
        </div>
    );
};

export default AllPeoples;