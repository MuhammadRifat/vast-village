import React from 'react';
import image from '../../images/avater.png';

const Chats = ({friend, handleFriend}) => {
    const {id, name, photo} = friend;

    return (
        <div onClick={() => handleFriend(id)} className="flex items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer">
            <div className="w-12 rounded-full">
                <img src={photo || image} alt="" />
            </div>
            <h3 className="font-bold text-gray-700 ml-2">{name}</h3>
        </div>
    );
};

export default Chats;