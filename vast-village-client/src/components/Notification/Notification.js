import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import Header from '../Header/Header';
import FriendsSkeleton from '../Loader/FriendsSkeleton/FriendsSkeleton';
import NotificationList from './NotificationList/NotificationList';

const Notification = () => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load all notifications from the database
    useEffect(() => {
        setIsLoading(true);
        fetch(`https://vast-village-server.herokuapp.com/notifications/${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => {
                setNotifications(data);
                setIsLoading(false);
                if (data.length) {
                    fetch(`https://vast-village-server.herokuapp.com/updateNotifications/${loggedInUser.email}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data) {

                            }
                        })
                }
            })
    }, [loggedInUser.email]);

    // Delete notification
    const handleDeleteNotification = (id) => {
        const updateData = notifications.filter(notification => notification.id !== id);
        setNotifications(updateData);

        fetch(`https://vast-village-server.herokuapp.com/deleteNotification`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                
            }
        })
    }

    return (
        <>
            <Header />

            {/* Notification Main part    */}
            <section className="mt-28 md:mt-16 flex justify-center px-1 py-2">
                <div className={`w-full sm:w-5/6 md:w-2/3 lg:w-2/5 rounded-md ${darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"}`}>
                    {isLoading && <FriendsSkeleton />}
                    {
                        notifications?.map(notification => <NotificationList notification={notification} handleDeleteNotification={handleDeleteNotification} key={notification.id} />)
                    }
                </div>
            </section>
        </>
    );
};

export default Notification;