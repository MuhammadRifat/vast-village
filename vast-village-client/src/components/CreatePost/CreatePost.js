import React, { useContext, useState } from 'react';
import image from '../../images/avater.png';
import Modal from 'react-modal';
import { userContext } from '../../App';
import Loader from '../Loader/Loader';

const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '1px 1px 10px gray',
    },
};

const CreatePost = () => {
    let subtitle;
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [post, setPost] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
                    <input onClick={openModal} type="text" className={`p-3 w-full rounded-2xl focus:outline-none cursor-pointer font-bold text-transparent ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} name="createPost" id="createPost" placeholder="Write a post" />
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="flex justify-between items-center border-b-2 pb-1">
                        <h2 className="font-bold text-xl text-gray-600" ref={(_subtitle) => (subtitle = _subtitle)}>Create a post</h2>
                        <button onClick={closeModal} className="text-red-500">Cancel</button>
                    </div>

                    <div className="my-3 flex items-center">
                        <div className="w-10 rounded-full mr-2">
                            <img className="rounded-full" src={loggedInUser.photo || image} alt="" />
                        </div>
                        <h3 className="font-bold text-gray-600">{loggedInUser.name}</h3>
                    </div>
                    <form onSubmit={handleNewPost}>
                        <textarea autoFocus onBlur={handleBlur} className="focus:outline-none" cols="60" rows="5" placeholder="Write text here.." required></textarea>

                        <div className="flex justify-end mt-3">
                            <button type="submit" className="font-bold rounded-xl bg-gray-500 text-white px-3 py-1">Post</button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default CreatePost;