import React, { useState } from 'react';
import image from '../../images/avater.png';
import Modal from 'react-modal';

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

const CreatePost = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

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

    const name= "Rifat Mia";
    return (
        <div className="bg-white mx-1 mt-3 rounded-md shadow-md">
            <h3 className="text-lg font-bold text-gray-600 w-full border-b-2 rounded-t-md py-1 px-2">Create Post</h3>
            <div className="p-3 flex items-center">
                <div className="w-10 rounded-full mr-2">
                    <img src={image} alt="" />
                </div>
                <input onClick={openModal} type="text" className="bg-gray-200 p-3 w-full rounded-2xl focus:outline-none cursor-pointer font-bold text-transparent" name="createPost" id="createPost" placeholder="Write a post" />
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
                        <img src={image} alt="" />
                    </div>
                    <h3 className="font-bold text-gray-600">{name}</h3>
                </div>
                <div>
                    <textarea autoFocus className="focus:outline-none" cols="60" rows="5" placeholder="Write text here.."></textarea>
                </div>
                <div className="flex justify-end mt-3">
                    <button className="font-bold rounded-xl bg-gray-500 text-white px-3 py-1">Post</button>
                </div>
            </Modal>
        </div>
    );
};

export default CreatePost;