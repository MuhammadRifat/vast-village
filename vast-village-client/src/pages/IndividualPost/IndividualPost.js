import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Main from '../../components/Home/Main/Main';
import PostSkeleton from '../../components/Loader/PostSkeleton/PostSkeleton';

const IndividualPost = () => {
    const { post_id } = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Load individual post by post_id from database
    useEffect(() => {
        setIsLoading(true);
        fetch(`https://vast-village-server.herokuapp.com/post/${post_id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data[0]);
                setIsLoading(false);
            })
    }, [post_id])

    return (
        <>
            <Header />

            {/* Post main */}
            <div className="mt-28 md:mt-16 flex justify-center">
                <div className="w-full sm:w-4/5 md:w-2/3 lg:w-2/5">
                    {
                        isLoading && <PostSkeleton />
                    }
                    <Main post={post} />
                </div>
            </div>
        </>
    );
};

export default IndividualPost;