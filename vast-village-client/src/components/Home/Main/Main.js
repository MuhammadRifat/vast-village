import React, { useContext, useState } from 'react';
import image from '../../../images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faThumbsUp, faCommentAlt, faShare } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../../App';
import { Link } from 'react-router-dom';

const Main = ({ post }) => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [postLength, setPostLength] = useState(140);
    const { post_id, author, authorPhoto, authorEmail, postBody, date, likes, comments, shares } = post;

    return (
        <div className={`p-2 mx-1 my-4 rounded-md shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
            <div className="flex justify-between">
                <div className="flex">
                    <div className="w-12 mr-2">
                        <Link to={`/profile/${authorEmail}`}><img className="rounded-full" src={authorPhoto || image} alt="" /></Link>
                    </div>
                    <div>
                        <Link to={`/profile/${authorEmail}`}><h3 className="font-bold">{author}</h3></Link>
                        <small>{new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                    </div>
                </div>
                <button>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </button>
            </div>
            <p className="text-justify mt-2">
                {postBody?.slice(0, postLength)}
                {postBody.length > 140 && postLength === 140 && <span>...<button onClick={() => setPostLength(postBody.length)} className="text-blue-500">See More</button></span>}
            </p>
            <div className={`flex justify-between text-sm mt-3 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                <span>{likes} Likes</span>
                <span>{comments} Comments</span>
                <span>{shares} Shares</span>
            </div>
            <div className={`grid grid-cols-3 mt-2 text-center border-t-2 border-b-2 text-md ${darkMode ? "text-gray-200 border-gray-600" : "text-gray-600 border-gray-300"}`}>
                <button className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} p-1`}><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                <button className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} p-1`}><FontAwesomeIcon icon={faCommentAlt} /> Comment</button>
                <button className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} p-1`}><FontAwesomeIcon icon={faShare} /> Share</button>
            </div>
            <div className="w-full mt-3 flex items-center">
                <div className="w-8 mr-2">
                    <img className="rounded-full" src={loggedInUser.photo || image} alt="" />
                </div>
                <input className={`w-full focus:outline-none rounded-xl px-4 py-2 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} type="text" name={`comment${post_id}`} id={`comment${post_id}`} placeholder="Write a comment" />
            </div>
        </div>
    );
};

export default Main;