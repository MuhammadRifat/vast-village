import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faBriefcase, faGlobe, faGraduationCap, faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../../App';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import AboutSkeleton from '../../Loader/AboutSkeleton/AboutSkeleton';

const About = ({ email }) => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [isDisplay, setIsDisplay] = useState({
        workplace: true,
        education: true,
        address: true,
        website: true,
        marital_status: true,
        about: true
    });
    const [userData, setUserData] = useState({});
    const [aboutData, setAboutData] = useState({
        workplace: '',
        education: '',
        address: '',
        website: '',
        marital_status: '',
        about: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    // Load user's data from the database
    useEffect(() => {
        setIsLoading(true);
        fetch(`https://vast-village-server.herokuapp.com/usersDetails/${email}`)
        .then(res => res.json())
        .then(data => {
            setAboutData(data[0]);
            setIsLoading(false);
        })
    }, [email])

    // const {workplace, education, address, website, marital_status, about} = aboutData;

    // Capturing data from input field
    const handleBlur = (e) => {
        const value = e.target.value.replaceAll("'", "''");
        setUserData({ email: loggedInUser.email, name: e.target.name, value: value });
    }

    // Handle save button to data edit
    const handleEdit = (e) => {
        e.preventDefault();
        const name = e.target.name;

        const newAbout = {...aboutData};
        newAbout[name] = userData.value;
        setAboutData(newAbout);
        
        // upload user's data into the database
        fetch('https://vast-village-server.herokuapp.com/addUserDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const newData = { ...isDisplay };
                    newData[name] = true;
                    setIsDisplay(newData);
                }
            })
    }

    if(isLoading){
        return <AboutSkeleton />
    }

    return (
        <>
            <div className={`p-2 mx-1 my-4 rounded-md shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>

                {/* Work place */}
                <form onSubmit={handleEdit}>
                    {isDisplay.workplace ?
                        <div className="flex justify-between mt-4">
                            <div>
                                <span className="text-xl mr-4"><FontAwesomeIcon icon={faBriefcase} /></span>
                                <span>{aboutData?.workplace || 'No workplaces to display'}</span>
                            </div>
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, workplace: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                        </div>
                        :
                        <>
                            <div className="mb-1 mt-4">
                                <input onBlur={handleBlur} name="workplace" type="text" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} defaultValue={aboutData?.workplace} placeholder="Add workplace" required />
                            </div>
                            {email === loggedInUser.email && <button name="workplace" onClick={handleEdit} className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, workplace: true })} className="text-blue-500 hover:underline">Cancel</button>}
                        </>
                    }
                </form>

                {/* Education */}
                <form onSubmit={handleEdit}>
                    {isDisplay.education ?
                        <div className="flex justify-between mt-4">
                            <div>
                                <span className="text-xl mr-4"><FontAwesomeIcon icon={faGraduationCap} /></span>
                                <span>{aboutData?.education || "No institutes to display"}</span>
                            </div>
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, education: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                        </div>
                        :
                        <>
                            <div className="mb-1 mt-4">
                                <input onBlur={handleBlur} name="education" type="text" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} defaultValue={aboutData?.education} placeholder="Add institute" required />
                            </div>
                            {email === loggedInUser.email && <button name="education" onClick={handleEdit} className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, education: true })} className="text-blue-500 hover:underline">Cancel</button>}
                        </>
                    }
                </form>

                {/* Address */}
                <form onSubmit={handleEdit}>
                    {isDisplay.address ?
                        <div className="flex justify-between mt-4">
                            <div>
                                <span className="text-xl mr-4"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                                <span>{aboutData?.address || "No address to display"}</span>
                            </div>
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, address: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                        </div>
                        :
                        <>
                            <div className="mb-1 mt-4">
                                <input onBlur={handleBlur} name="address" type="text" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} defaultValue={aboutData?.address} placeholder="Add address" required />
                            </div>
                            {email === loggedInUser.email && <button name="address" onClick={handleEdit} className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, address: true })} className="text-blue-500 hover:underline">Cancel</button>}
                        </>
                    }
                </form>

                {/* Email */}
                <div className="flex justify-between mt-4">
                    <div>
                        <span className="text-xl mr-4"><FontAwesomeIcon icon={faAt} /></span>
                        <a href={`mailto:${email}`} target="_blank" className="text-blue-500 hover:underline">{email}</a>
                    </div>
                </div>

                {/* Website */}
                <form onSubmit={handleEdit}>
                    {isDisplay.website ?
                        <div className="flex justify-between mt-4">
                            <div>
                                <span className="text-xl mr-4"><FontAwesomeIcon icon={faGlobe} /></span>
                                <a href={`${aboutData?.website}`} target="_blank" className="text-blue-500 hover:underline">{aboutData?.website || "No website to display"}</a>
                            </div>
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, website: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                        </div>
                        :
                        <>
                            <div className="mb-1 mt-4">
                                <input onBlur={handleBlur} name="website" type="text" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} defaultValue={aboutData?.website} placeholder="Add website link" required />
                            </div>
                            {email === loggedInUser.email && <button name="website" onClick={handleEdit} className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, website: true })} className="text-blue-500 hover:underline">Cancel</button>}
                        </>
                    }
                </form>

                {/* Marital Status */}
                <form onSubmit={handleEdit}>
                    {isDisplay.marital_status ?
                        <div className="flex justify-between mt-4">
                            <div>
                                <span className="text-xl mr-4"><FontAwesomeIcon icon={faHeart} /></span>
                                <span>{aboutData?.marital_status || "No marital status to display"}</span>
                            </div>
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, marital_status: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                        </div>
                        :
                        <>
                            <div className="mb-1 mt-4">
                                <input onBlur={handleBlur} name="marital_status" type="text" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} defaultValue={aboutData?.marital_status} placeholder="Add marital status" required />
                            </div>
                            {email === loggedInUser.email && <button name="marital_status" onClick={handleEdit} className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, marital_status: true })} className="text-blue-500 hover:underline">Cancel</button>}
                        </>
                    }
                </form>
            </div>

            {/* About you */}
            <div className={`p-2 mx-1 my-4 rounded-md shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
                <div className="flex justify-between">
                    <h3 className="text-lg font-bold">About you</h3>
                    {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, about: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                </div>

                {isDisplay.about ?
                    <p>
                        {aboutData?.about || "No text to display"}
                    </p>
                    :
                    <form onSubmit={handleEdit}>
                        <div className="mb-1 mt-4">
                            <textarea type="text" name="about" onBlur={handleBlur} rows="3" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} defaultValue={aboutData?.about} placeholder="Write about yourself" required />
                        </div>
                        {email === loggedInUser.email && <button onClick={handleEdit} name="about" className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                        {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, about: true })} className="text-blue-500 hover:underline">Cancel</button>}
                    </form>
                }
            </div>
        </>
    );
};

export default About;