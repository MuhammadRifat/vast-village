import React, { useContext } from 'react';
import { userContext } from '../../../../App';

const Message = ({ msg, photo }) => {
    const { sender_email, message } = msg;
    const [loggedInUser] = useContext(userContext);
    return (
        <div>
            {
                sender_email === loggedInUser.email ?
                    <p className={`mt-2 text-right`}>
                        <span className={`px-2 py-1 inline-block rounded-xl bg-green-800 text-white`}>{message}</span>
                    </p>
                    :
                    <p className={`mt-2 flex items-center`}>
                        <img className="w-6 rounded-full mr-2" src={photo} alt="" />
                        <span className={`px-2 inline-block py-1 rounded-xl ${loggedInUser.darkMode ? "bg-gray-700" : "bg-gray-200"}`}>{message}</span>
                    </p>
            }
        </div>
    );
};

export default Message;