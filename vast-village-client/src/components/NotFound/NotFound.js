import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    }
    return (
        <div className="text-center">
            <h2 className="text-3xl mb-5">This page isn't available</h2>
            <h5>The link you followed may be broken, or the page may have been removed.</h5>

            <button onClick={goBack} className="hover:underline text-blue-700 mt-5">Go back to the previous page</button>
        </div>
    );
};

export default NotFound;