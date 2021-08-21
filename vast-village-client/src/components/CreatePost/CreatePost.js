import React, { useContext, useState } from 'react';
import image from '../../images/avater.png';
import { userContext } from '../../App';
import Loader from '../Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const CreatePost = () => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [isOpen, setIsOpen] = useState(false);
    const [post, setPost] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleBlur = (e) => {
        setPost(e.target.value);
    }

    const handleNewPost = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const newPost = {
            postBody: post.replaceAll("'", "''"),
            author: loggedInUser.name,
            authorEmail: loggedInUser.email,
            authorPhoto: loggedInUser.photo,
            date: new Date(),
            likes: 0,
            comments: 0,
            shares: 0
        };

        fetch('https://vast-village-server.herokuapp.com/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsLoading(false);
                    setIsSuccess(true);
                }
            })

        setIsOpen(false);
    }

    return (
        <div>
            {isLoading &&
                <Loader />
            }

            {isSuccess &&
                <span className="flex justify-center text-green-700 font-sm">Successfully Uploaded</span>
            }

            <div className={`mx-1 mt-3 rounded-md shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h3 className={`text-lg font-bold w-full border-b-2 rounded-t-md py-1 px-2 ${darkMode ? "text-gray-200 border-gray-600" : "text-gray-600"}`}>Create Post</h3>
                <div className="p-3 flex items-center">
                    <div className="w-10 rounded-full mr-2">
                        <img className="rounded-full" src={loggedInUser.photo || image} alt="" />
                    </div>
                    <input onClick={() => setIsOpen(true)} type="text" className={`p-3 w-full rounded-2xl focus:outline-none cursor-pointer font-bold text-transparent ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} name="createPost" id="createPost" placeholder="Write a post" />
                </div>

                {/* Modal */}
                {isOpen && <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center border-b-2 pb-1">
                                    <h2 className="font-bold text-xl text-gray-600">Create a post</h2>
                                    <button onClick={() => setIsOpen(false)} className="text-xl"><FontAwesomeIcon icon={faTimes} /></button>
                                </div>

                                <div className="my-3 flex items-center">
                                    <div className="w-10 rounded-full mr-2">
                                        <img className="rounded-full" src={loggedInUser.photo || image} alt="" />
                                    </div>
                                    <h3 className="font-bold text-gray-600">{loggedInUser.name}</h3>
                                </div>
                                <form onSubmit={handleNewPost}>
                                    <textarea autoFocus onBlur={handleBlur} className="focus:outline-none w-full" rows="5" placeholder="Write text here.." required></textarea>

                                    <div className="flex justify-end mt-3 mr-3">
                                        <button type="submit" className="font-bold rounded-xl bg-gray-500 text-white px-3 py-1">Post</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    );
};

export default CreatePost;