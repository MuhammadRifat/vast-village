import React, { useContext, useState } from 'react';
import image from '../../../images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faThumbsUp, faCommentAlt, faShare } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../../App';

const Main = ({post}) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [postLength, setPostLength] = useState(140);
    const {id, name, postBody, date, photo, likes, comments, shares} = post;

    return (
        <div className="p-2 bg-white mx-1 my-4 rounded-md shadow-md">
            <div className="flex justify-between">
                <div className="flex">
                    <div className="w-12 mr-2">
                        <img src={photo || image} alt="" />
                    </div>
                    <div>
                        <h3 className="font-bold">{name}</h3>
                        <small>{date}</small>
                    </div>
                </div>
                <button>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </button>
            </div>
            <p className="text-justify mt-2">
                {postBody.slice(0, postLength)}
                {postLength === 140 && <span>...<button onClick={() => setPostLength(postBody.length)} className="text-blue-700">See More</button></span>}
            </p>
            <div className="flex justify-between text-gray-500 text-sm mt-3">
                <span>{likes} Likes</span>
                <span>{comments.length} Comments</span>
                <span>{shares} Shares</span>
            </div>
            <div className="grid grid-cols-3 mt-2 text-center border-t-2 border-b-2 text-gray-600 text-md">
                <button className="hover:bg-gray-200 p-1"><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                <button className="hover:bg-gray-200 p-1"><FontAwesomeIcon icon={faCommentAlt} /> Comment</button>
                <button className="hover:bg-gray-200 p-1"><FontAwesomeIcon icon={faShare} /> Share</button>
            </div>
            <div className="w-full mt-3 flex items-center">
                <div className="w-8 mr-2">
                    <img src={loggedInUser.photo || image} alt="" />
                </div>
                <input className="w-full focus:outline-none bg-gray-200 rounded-xl px-4 py-2" type="text" name="" id="" placeholder="Write a comment" />
            </div>
        </div>
    );
};

export default Main;