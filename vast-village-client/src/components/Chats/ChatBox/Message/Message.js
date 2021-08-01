import React, { useContext } from 'react';
import { userContext } from '../../../../App';

const Message = ({ message }) => {
    const { sender_email } = message
    const [loggedInUser] = useContext(userContext);
    console.log(message);
    return (
        <div>
            {
                sender_email === loggedInUser.email ?
                    <p className={`mt-2 text-right`}>
                        <span className={`px-2 py-1 rounded-xl bg-green-800 text-white`}>{message.message}</span>
                    </p>
                    :
                    <p className={`mt-2`}>
                        <span className={`px-2 py-1 rounded-xl ${loggedInUser.darkMode ? "bg-gray-700" : "bg-gray-200"}`}>{message.message}</span>
                    </p>
            }
        </div>
    );
};

export default Message;