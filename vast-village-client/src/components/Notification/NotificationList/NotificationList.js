import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import defaultPhoto from '../../../images/avater.png';

const NotificationList = ({ notification, handleDeleteNotification }) => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;

    const { id, sender_email, post_id, notification_body, status, sender_photo, date } = notification;

    return (
        <div className={`py-2 px-2 border-b-2 flex justify-between items-center ${status === 'unseen' ? darkMode ? "bg-green-800" : "bg-green-100" : ""} ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
            <div style={{ width: '93%' }}>
                <Link to={post_id ? `/post/${post_id}` : `/profile/${sender_email}`}>
                    <div className="flex items-center">
                        <img className="w-10 rounded-full" src={sender_photo || defaultPhoto} alt="" />
                        <div className="ml-3">
                            <small>{new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                            <p className={`font-medium`}>{notification_body}</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div>
                <button onClick={(e) => handleDeleteNotification(id)} className={`rounded-full px-2 py-1 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
        </div>
    );
};

export default NotificationList;