import React, { useEffect, useState } from 'react';
import Main from '../../Home/Main/Main';
import PostSkeleton from '../../Loader/PostSkeleton/PostSkeleton';

const Posts = ({email}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    // Load user all posts
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

    }, [email])

    return (
        <div>
            {isLoading && <PostSkeleton />}
            {!isLoading && !posts.length && <div className="text-red-900 text-center">No posts found.</div>}
            {
                posts?.map(post => <Main post={post} key={post.post_id}></Main>)
            }
        </div>
    );
};

export default Posts;