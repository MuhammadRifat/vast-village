import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import ConfirmationPopUp from '../../ConfirmationPopUp/ConfirmationPopUp';
import Toast from '../../ConfirmationPopUp/Toast/Toast';
import CreatePost from '../../CreatePost/CreatePost';
import Main from '../../Home/Main/Main';
import PostSkeleton from '../../Loader/PostSkeleton/PostSkeleton';
import EditPost from '../EditPost/EditPost';

const Posts = ({ email }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [loggedInUser] = useContext(userContext);
    const [isLoad, setIsLoad] = useState(1);
    const [isToast, setIsToast] = useState(false);
    const [isDisplay, setIsDisplay] = useState(false);
    const [id, setId] = useState(0);
    const [editDisplay, setEditDisplay] = useState(false);
    const [postData, setPostData] = useState({});

    // Load user's all posts
    useEffect(() => {
        setIsLoading(true);
        fetch('https://vast-village-server.herokuapp.com/getUserPosts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setIsLoading(false);
            })

    }, [email, isLoad])

    // handle edit
    const handleEdit = (post) => {
        setEditDisplay(true);
        setPostData(post);
    }

    // handle Delete
    const handleDelete = (post_id) => {
        setIsDisplay(true);
        setId(post_id);
        
    }

    const handleConfirmation = () => {
        setIsDisplay(false);

        const newPosts = posts.filter(post => post.post_id !== id);
        setPosts(newPosts);

        fetch(`https://vast-village-server.herokuapp.com/deletePost`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post_id: id })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsToast(true);
                }
            })
    }

    return (
        <>
            {loggedInUser.email === email && <CreatePost setIsLoad={setIsLoad} isLoad={isLoad} />}
            {editDisplay && <EditPost postData={postData} setEditDisplay={setEditDisplay} setPosts={setPosts} posts={posts} />}

            {isLoading && <PostSkeleton />}
            {!isLoading && !posts.length && <div className="text-red-900 text-center">No posts found.</div>}
            {
                posts?.map(post => <Main post={post} handleDelete={handleDelete} handleEdit={handleEdit} key={post.post_id}></Main>)
            }


            {isDisplay && <ConfirmationPopUp handleConfirmation={handleConfirmation} setIsDisplay={setIsDisplay} />}
            
            {isToast && <Toast message="Post successfully Deleted" setIsToast={setIsToast} />}
        </>
    );
};

export default Posts;