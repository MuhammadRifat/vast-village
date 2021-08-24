import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Comments = ({ cmnt, authoremail, setComments, comments, setIsDeleteToast }) => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const { id, name, email, photo, comment, date } = cmnt;
    const [isManage, setIsManage] = useState(false);

    const hoverStyle = darkMode ? "hover:bg-gray-500 rounded-md" : "hover:bg-gray-200 rounded-md";

    // Handle Delete comment
    const handleDelete = (id) => {
        const newComments = comments.filter(comment => comment.id !== id);
        setComments(newComments);

        fetch(`https://vast-village-server.herokuapp.com/deleteComment`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsDeleteToast(true);
                }
            })

        setIsManage(false);
    }

    // Handle Edit comment
    const handleEdit = () => {

    }
    return (
        <>
            <div className={`px-2 py-1 flex w-auto ${loggedInUser.darkMode ? "text-white" : "text-gray-700"}`}>
                <Link to={`/profile/${email}`}>
                    <div className="w-8 h-8">
                        <img className="w-8 h-8 rounded-full" src={photo} alt="" />
                    </div>
                </Link>
                <div className={`ml-3 py-1 px-2 rounded-lg ${loggedInUser.darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <div className="flex items-center">
                        <Link to={`/profile/${email}`}><h4 className="font-bold">{name}</h4></Link>
                        <small className="ml-4">{new Date(date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</small>

                        {/* Three dots menu */}
                        {!!(email === loggedInUser.email | authoremail === loggedInUser.email) &&
                            <div>
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button onClick={() => setIsManage(!isManage)} className={`rounded-full px-2 py-1 ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}>
                                            <FontAwesomeIcon icon={faEllipsisH} />
                                        </button>
                                    </div>


                                    {isManage && <div className={`origin-top-right absolute z-10 right-0 w-36 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${darkMode ? "bg-gray-600" : "bg-white"}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                        <div role="none">
                                            <button onClick={() => handleDelete(id)} className={`block w-full text-left px-3 py-2 text-sm font-bold ${hoverStyle}`}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                                        </div>
                                    </div>}
                                </div>

                            </div>}
                    </div>
                    <div>
                        {comment}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Comments;