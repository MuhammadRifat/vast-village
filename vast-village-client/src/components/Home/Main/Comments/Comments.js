import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../../App';

const Comments = ({ cmnt }) => {
    const [loggedInUser] = useContext(userContext);
    const { name, email, photo, comment, date } = cmnt;
    
    return (
        <div className={`px-2 py-1 flex w-full ${loggedInUser.darkMode ? "text-white" : "text-gray-700"}`}>
            <Link to={`/profile/${email}`}>
                <div className="w-8 h-8">
                    <img className="w-8 h-8 rounded-full" src={photo} alt="" />
                </div>
            </Link>
            <div className={`ml-3 py-1 px-2 rounded-lg ${loggedInUser.darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <div className="flex items-center">
                    <Link to={`/profile/${email}`}><h4 className="font-bold">{name}</h4></Link>
                    <small className="ml-4">{new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                </div>
                <div>
                    {comment}
                </div>
            </div>
        </div>
    );
};

export default Comments;