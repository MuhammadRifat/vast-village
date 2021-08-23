import React, { useContext, useEffect, useState } from 'react';
import image from '../../../images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faThumbsUp, faCommentAlt, faShare, faTimes, faEdit, faCopy } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../../App';
import { Link } from 'react-router-dom';
import Comments from './Comments/Comments';
import Toast from '../../ConfirmationPopUp/Toast/Toast';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const Main = ({ post, handleEdit, handleDelete }) => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [isLike, setIsLike] = useState(false);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [isComments, setIsComments] = useState(false);
    const [postLength, setPostLength] = useState(140);
    const { post_id, author, authorphoto, authoremail, postbody, date, shares } = post;
    const [isOpen, setIsOpen] = useState(false);
    const [isToast, setIsToast] = useState(false);
    const [isManage, setIsManage] = useState(false);

    const hoverStyle = darkMode ? "hover:bg-gray-600 rounded-md" : "hover:bg-gray-200 rounded-md";

    // check is like any post
    useEffect(() => {
        fetch('https://vast-village-server.herokuapp.com/isLike', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post_id: post_id, email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setIsLike(data);
            })
    }, [loggedInUser.email, post_id])

    useEffect(() => {
        // Load all likes from the database
        loadLikesAndComments('likes', setLikes);

        // Load all comments from the database
        loadLikesAndComments('comments', setComments)

    }, [post_id])

    // loader function
    const loadLikesAndComments = (route, stateFunction) => {
        fetch(`https://vast-village-server.herokuapp.com/${route}/${post_id}`)
            .then(res => res.json())
            .then(data => stateFunction(data))
    }

    // Handle like
    const handleLike = (id, email) => {

        if (isLike) {
            const newLikes = likes.filter(like => like.email !== email)
            setLikes(newLikes);
        } else {
            const newLikes = [...likes, loggedInUser];
            setLikes(newLikes);
        }

        setIsLike(!isLike);
        fetch('https://vast-village-server.herokuapp.com/handleLike', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post_id: id, email: loggedInUser.email, date: new Date(), isLike: isLike })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
            })
    }

    // upload comment in database
    const handleComment = (e, id, email) => {
        e.preventDefault();
        const newComment = comment.replaceAll("'", "''");

        const commentData = { post_id: id, email: email, receiver_email: authoremail, photo: loggedInUser.photo, name: loggedInUser.name, comment: newComment, date: new Date() };
        setComments([{ ...commentData, id: comments.length + 1 }].concat(comments));
        setComment("");

        fetch('https://vast-village-server.herokuapp.com/addComment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsToast(true);
                }
            })
    }

    // getting comment
    const handleChange = (e) => {
        setComment(e.target.value);
    }


    // Handle share btn
    const handleShare = (id) => {

    }

    return (
        <div className={`p-2 mx-1 my-4 rounded-md shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"}`}>

            {/* Post Header (user photo, post uploaded date)*/}
            <div className="flex justify-between">
                <div className="flex">
                    <div className="w-12 mr-2">
                        <Link to={`/profile/${authoremail}`}><img className="rounded-full" src={authorphoto || image} alt="" /></Link>
                    </div>
                    <div>
                        <Link to={`/profile/${authoremail}`}><h3 className="font-bold">{author}</h3></Link>
                        <small>{new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                    </div>
                </div>

                {/* Three dots menu */}
                <div>
                    <div className="relative inline-block text-left">
                        <div>
                            <button onClick={() => setIsManage(!isManage)} className={`rounded-full px-2 py-1 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </button>
                        </div>

                        {isManage &&
                            <div className={`origin-top-right absolute right-0 mt-1 w-36 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${darkMode ? "bg-gray-700" : "bg-white"}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                {authoremail === loggedInUser.email &&
                                    <div role="none">
                                        <button onClick={() => handleEdit(post)} className={`block w-full text-left px-3 py-2 text-sm font-bold ${hoverStyle}`} ><FontAwesomeIcon icon={faEdit} /> Edit</button>
                                        <button onClick={() => handleDelete(post_id)} className={`block w-full text-left px-3 py-2 text-sm font-bold ${hoverStyle}`}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                                    </div>}
                                <div>
                                    <button onClick={() => setIsManage(false)} className={`block w-full text-left px-3 py-2 text-sm font-bold ${hoverStyle}`}><FontAwesomeIcon icon={faCopy} /> Copy link</button>
                                </div>
                            </div>}
                    </div>

                </div>
            </div>

            {/* Post body */}
            <p className="text-left mt-2 px-1">
                {postbody?.slice(0, postLength)}
                {postbody?.length > 140 && postLength === 140 && <span>...<button onClick={() => setPostLength(postbody.length)} className="text-blue-500">See More</button></span>}
            </p>

            {/* Display all likes, comments, shares */}
            <div className={`flex justify-between text-sm mt-3 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                <button onClick={likes.length ? () => setIsOpen(true) : ""} className="hover:underline hover:text-blue-700">{likes.length} Likes</button>
                <button onClick={comments.length && (() => setIsComments(!isComments))} className="hover:underline hover:text-blue-700">{comments.length} Comments</button>
                <span>{shares} Shares</span>
            </div>

            {/* Like, comment, share button */}
            <div className={`grid grid-cols-3 mt-2 text-center border-t-2 border-b-2 text-md ${darkMode ? "text-gray-200 border-gray-600" : "text-gray-600 border-gray-300"}`}>
                <button onClick={() => handleLike(post_id, loggedInUser.email)} className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} p-1 ${isLike && "text-green-600"}`}><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                <button className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} p-1`}><FontAwesomeIcon icon={faCommentAlt} /> Comment</button>
                <button onClick={() => handleShare(post_id)} className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} p-1`}><FontAwesomeIcon icon={faShare} /> Share</button>
            </div>

            {/* Write Comment */}
            <form onSubmit={(e) => handleComment(e, post_id, loggedInUser.email)} className="w-full mt-3 flex items-center">
                <div className="w-8 mr-2">
                    <img className="rounded-full" src={loggedInUser.photo || image} alt="" />
                </div>
                <input onChange={handleChange} autocomplete="off" className={`w-4/5 focus:outline-none rounded-xl px-4 py-2 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} type="text" name={`comment${post_id}`} id={`comment${post_id}`} value={comment} placeholder="Write a comment" required />
                <button type="submit" className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} p-1 rounded-xl ml-2 px-3 font-bold py-2`}>Add</button>
            </form>

            {/* All comments */}
            <div className="mt-2">
                {
                    isComments &&
                    comments.map(comment => <Comments cmnt={comment} key={comment.id} />)
                }
            </div>

            {/* Modal */}
            {isOpen && <div className="fixed bottom-50 z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-3 py-3 sm:p-4 sm:pb-4">
                            <div className="flex justify-between items-center border-b-2 pb-1">
                                <h2 className="font-bold text-xl text-gray-600">Likes ({likes.length})</h2>
                                <button onClick={() => setIsOpen(false)} className="text-xl"><FontAwesomeIcon icon={faTimes} /></button>
                            </div>
                            {
                                likes.map(like => {
                                    return (
                                        <Link to={`/profile/${like.email}`}>
                                            <div className="w-80 flex items-center p-2">
                                                <div className="w-10 rounded-full mr-2">
                                                    <img className="rounded-full" src={like.photo} alt="" />
                                                </div>
                                                <h3 className="font-bold text-gray-600">{like.name}</h3>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>}

            {isToast && <Toast message="Comment Added" setIsToast={setIsToast} />}
        </div>
    );
};

export default Main;