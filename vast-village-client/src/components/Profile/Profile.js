import React, { useContext, useEffect } from 'react';
import { userContext } from '../../App';
import { checkEmail } from '../CheckEmail/CheckEmail';
import Header from '../Header/Header';

const Profile = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    return (
        <>
        <Header />
            Profile
        </>
    );
};

export default Profile;