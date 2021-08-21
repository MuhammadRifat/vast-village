import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Toast = ({message, setIsToast}) => {
    const [isDisplay, setIsDisplay] = useState(true);

    setTimeout(() => {
        setIsDisplay(false);
        setIsToast(false);
    }, 3000)
    
    return (
        isDisplay &&
        <div className={`absolute bottom-5 right-3 flex w-64 py-2 h-auto px-2 shadow-lg bg-gray-500 rounded-lg bg-green-500 text-white`}>
            <div style={{ width: '90%' }}>{message}</div>
            <button onClick={() => setIsDisplay(false)}><FontAwesomeIcon icon={faTimes} /></button>
        </div>
    );
};

export default Toast;