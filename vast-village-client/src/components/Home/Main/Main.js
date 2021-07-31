import React, { useContext, useEffect, useState } from 'react';
import image from '../../../images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faThumbsUp, faCommentAlt, faShare } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../../App';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Comments from './Comments/Comments';

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '1px 1px 10px gray',
    },
};

const Main = ({ post }) => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [isLike, setIsLike] = useState(false);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [isComments, setIsComments] = useState(false);
    const [postLength, setPostLength] = useState(140);
    const { post_id, author, authorphoto, authoremail, postbody, date, shares } = post;
    const [modalIsOpen, setIsOpen] = useState(false);
    let subtitle;

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

        fetch(`https://vast-village-server.herokuapp.com/likes/${post_id}`)
            .then(res => res.json())
            .then(data => setLikes(data))
    }, [post_id])

    useEffect(() => {
        fetch(`https://vast-village-server.herokuapp.com/comments/${post_id}`)
            .then(res => res.json())
            .then(data => setComments(data))
    }, [post_id, comment])

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


    const handleComment = (id, email) => {
        const newComment = comment.replaceAll("'", "''");
        
        fetch('https://vast-village-server.herokuapp.com/addComment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post_id: id, email: email, comment: newComment, date: new Date() })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setComment("");
                }
            })
    }

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const handleShare = (id) => {

    }

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'gray';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className={`p-2 mx-1 my-4 rounded-md shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
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
                <button>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </button>
            </div>
            <p className="text-left mt-2 px-1">
                {postbody?.slice(0, postLength)}
                {postbody?.length > 140 && postLength === 140 && <span>...<button onClick={() => setPostLength(postbody.length)} className="text-blue-500">See More</button></span>}
            </p>
            <div className={`flex justify-between text-sm mt-3 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                <button onClick={likes.length ? openModal : ""} className="hover:underline hover:text-blue-700">{likes.length} Likes</button>
                <button onClick={comments.length && (() => setIsComments(!isComments))} className="hover:underline hover:text-blue-700">{comments.length} Comments</button>
                <span>{shares} Shares</span>
            </div>
            <div className={`grid grid-cols-3 mt-2 text-center border-t-2 border-b-2 text-md ${darkMode ? "text-gray-200 border-gray-600" : "text-gray-600 border-gray-300"}`}>
                <button onClick={() => handleLike(post_id, loggedInUser.email)} className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} p-1 ${isLike && "text-green-600"}`}><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
                <button className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} p-1`}><FontAwesomeIcon icon={faCommentAlt} /> Comment</button>
                <button onClick={() => handleShare(post_id)} className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} p-1`}><FontAwesomeIcon icon={faShare} /> Share</button>
            </div>
            <div className="w-full mt-3 flex items-center">
                <div className="w-8 mr-2">
                    <img className="rounded-full" src={loggedInUser.photo || image} alt="" />
                </div>
                <input onChange={handleChange} autocomplete="off" className={`w-4/5 focus:outline-none rounded-xl px-4 py-2 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} type="text" name={`comment${post_id}`} id={`comment${post_id}`} value={comment} placeholder="Write a comment" />
                <button onClick={() => handleComment(post_id, loggedInUser.email)} type="reset" className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} p-1 rounded-xl ml-2 px-3 font-bold py-2`}>Add</button>
            </div>

            <div className="mt-2">
                {
                    isComments &&
                    comments.map(comment => <Comments cmnt={comment} key={comment.id} />)
                }
            </div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="flex justify-between items-center border-b-2 pb-1">
                    <h2 className="font-bold text-xl text-gray-600" ref={(_subtitle) => (subtitle = _subtitle)}>Likes ({likes.length})</h2>
                    <button onClick={closeModal} className="text-gray-600 text-xl">X</button>
                </div>

                {
                    likes.map(like => {
                        return (
                            <Link to={`/profile/${like.email}`}>
                                <div className="w-80 flex items-center p-2">
                                    <div className="w-8 rounded-full mr-2">
                                        <img className="rounded-full" src={like.photo} alt="" />
                                    </div>
                                    <h3 className="font-bold text-gray-600">{like.name}</h3>
                                </div>
                            </Link>
                        )
                    })
                }
            </Modal>
        </div>
    );
};

export default Main;