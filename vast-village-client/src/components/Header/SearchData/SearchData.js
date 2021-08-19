import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';

// For searching friends (search box)
const SearchData = ({ friend }) => {
    const [loggedInUser] = useContext(userContext);
    const { email, name, photo } = friend;
    return (
        <Link to={`/profile/${email}`}>
            <div className={`py-2 px-4 border-b-2 flex justify-between items-center ${loggedInUser.darkMode ? "border-gray-600  text-gray-100" : "border-gray-300  text-gray-700"}`}>

                <div className="flex items-center">
                    <img className="w-16 rounded-full" src={photo} alt="" />
                    <h3 className={`font-bold text-md ml-3`}>{name}</h3>
                </div>
            </div>

        </Link>
    );
};

export default SearchData;