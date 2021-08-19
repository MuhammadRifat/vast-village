import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faBriefcase, faGlobe, faGraduationCap, faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../../App';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

const About = ({ email }) => {
    const [loggedInUser] = useContext(userContext);
    const { darkMode } = loggedInUser;
    const [isDisplay, setIsDisplay] = useState({
        workPlace: true,
        education: true,
        address: true,
        website: true,
        maritalStatus: true,
        about: true
    });

    const handleEdit = () => {

    }
    return (
        <>
            <div className={`p-2 mx-1 my-4 rounded-md shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
                {/* Work place */}
                <div>
                    {isDisplay.workPlace ?
                        <div className="flex justify-between mt-4">
                            <div>
                                <span className="text-xl mr-4"><FontAwesomeIcon icon={faBriefcase} /></span>
                                <span>No workplaces to display</span>
                            </div>
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, workPlace: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                        </div>
                        :
                        <>
                            <div className="mb-1 mt-4">
                                <input type="text" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} placeholder="Add workplace" required />
                            </div>
                            {email === loggedInUser.email && <button onClick={handleEdit} className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, workPlace: true })} className="text-blue-500 hover:underline">Cancel</button>}
                        </>
                    }
                </div>

                {/* Education */}
                <div>
                    {isDisplay.education ?
                        <div className="flex justify-between mt-4">
                            <div>
                                <span className="text-xl mr-4"><FontAwesomeIcon icon={faGraduationCap} /></span>
                                <span>No institutes to display</span>
                            </div>
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, education: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                        </div>
                        :
                        <>
                            <div className="mb-1 mt-4">
                                <input type="text" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} placeholder="Add institute" required />
                            </div>
                            {email === loggedInUser.email && <button onClick={handleEdit} className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, education: true })} className="text-blue-500 hover:underline">Cancel</button>}
                        </>
                    }
                </div>

                {/* Address */}
                <div>
                    {isDisplay.address ?
                        <div className="flex justify-between mt-4">
                            <div>
                                <span className="text-xl mr-4"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                                <span>No address to display</span>
                            </div>
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, address: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                        </div>
                        :
                        <>
                            <div className="mb-1 mt-4">
                                <input type="text" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} placeholder="Add address" required />
                            </div>
                            {email === loggedInUser.email && <button onClick={handleEdit} className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, address: true })} className="text-blue-500 hover:underline">Cancel</button>}
                        </>
                    }
                </div>

                {/* Email */}
                <div className="flex justify-between mt-4">
                    <div>
                        <span className="text-xl mr-4"><FontAwesomeIcon icon={faAt} /></span>
                        <a href={`mailto:${email}`} target="_blank" className="text-blue-500 hover:underline">{email}</a>
                    </div>
                </div>

                {/* Website */}
                <div>
                    {isDisplay.website ?
                        <div className="flex justify-between mt-4">
                            <div>
                                <span className="text-xl mr-4"><FontAwesomeIcon icon={faGraduationCap} /></span>
                                <span>No institutes to display</span>
                            </div>
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, website: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                        </div>
                        :
                        <>
                            <div className="mb-1 mt-4">
                                <input type="text" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} placeholder="Add website link" required />
                            </div>
                            {email === loggedInUser.email && <button onClick={handleEdit} className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, website: true })} className="text-blue-500 hover:underline">Cancel</button>}
                        </>
                    }
                </div>

                {/* Marital Status */}
                <div>
                    {isDisplay.maritalStatus ?
                        <div className="flex justify-between mt-4">
                            <div>
                                <span className="text-xl mr-4"><FontAwesomeIcon icon={faGraduationCap} /></span>
                                <span>No marital status to display</span>
                            </div>
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, maritalStatus: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                        </div>
                        :
                        <>
                            <div className="mb-1 mt-4">
                                <input type="text" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} placeholder="Add marital status" required />
                            </div>
                            {email === loggedInUser.email && <button onClick={handleEdit} className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                            {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, maritalStatus: true })} className="text-blue-500 hover:underline">Cancel</button>}
                        </>
                    }
                </div>
            </div>

            <div className={`p-2 mx-1 my-4 rounded-md shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
                <div className="flex justify-between">
                    <h3 className="text-lg font-bold">About you</h3>
                    {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, about: false })} className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /> Edit</button>}
                </div>

                {isDisplay.about ?
                    <p>
                        No text to display
                    </p>
                    :
                    <>
                        <div className="mb-1 mt-4">
                            <textarea type="text" rows="3" className={`w-full px-3 py-2 focus:outline-none rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} placeholder="Write about yourself" required />
                        </div>
                        {email === loggedInUser.email && <button onClick={handleEdit} className="mr-1 text-blue-500 border-blue-500 border-2 px-2 rounded-xl">Save</button>}
                        {email === loggedInUser.email && <button onClick={() => setIsDisplay({ ...isDisplay, about: true })} className="text-blue-500 hover:underline">Cancel</button>}
                    </>
                }
            </div>
        </>
    );
};

export default About;