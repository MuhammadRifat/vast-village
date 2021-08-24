import React, { useContext, useState } from 'react';
import { userContext } from '../../../App';
import Toast from '../../ConfirmationPopUp/Toast/Toast';
import image from '../../../images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EditPost = ({ postData, setEditDisplay, setPosts, posts }) => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [post, setPost] = useState('');
    const [isToast, setIsToast] = useState(false);

    const handleBlur = (e) => {
        setPost(e.target.value);
    }

    const handleEditPost = (e) => {
        e.preventDefault();
        const newPosts = posts.filter(post => post.post_id !== postData.post_id);

        setPosts([{ ...postData, postbody: post }].concat(newPosts));

        fetch('https://vast-village-server.herokuapp.com/updatePost', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postBody: post.replaceAll("'", "''"), post_id: postData.post_id })
        })
            .then(res => res.json())
            .then(data => {

                console.log(data);
                if (data) {
                    setIsToast(true);
                }
            })
        setEditDisplay(false);
    }

    return (
        <>
            <div className={`mx-1 mt-3 rounded-md shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>

                {/* Modal */}
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


                        <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className={`flex justify-between items-center border-b-2 pb-1 ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
                                    <h2 className="font-bold text-xl">Edit post</h2>
                                    <button onClick={() => setEditDisplay(false)} className="text-xl"><FontAwesomeIcon icon={faTimes} /></button>
                                </div>

                                <div className="my-3 flex items-center">
                                    <div className="w-10 rounded-full mr-2">
                                        <img className="rounded-full" src={loggedInUser.photo || image} alt="" />
                                    </div>
                                    <h3 className="font-bold">{loggedInUser.name}</h3>
                                </div>
                                <form onSubmit={handleEditPost}>
                                    <textarea onBlur={handleBlur} className={`focus:outline-none w-full rounded-md p-2 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`} rows="5" defaultValue={postData.postbody} placeholder="Write text here.." required></textarea>

                                    <div className="flex justify-end mt-3 mr-3">
                                        <button type="submit" className="font-bold rounded-xl bg-gray-500 text-white px-3 py-1">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {isToast && <Toast message="Post successfully Edited" setIsToast={setIsToast} />}
        </>
    );
};

export default EditPost;