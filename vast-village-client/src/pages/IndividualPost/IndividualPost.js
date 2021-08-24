import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Main from '../../components/Home/Main/Main';
import PostSkeleton from '../../components/Loader/PostSkeleton/PostSkeleton';

const IndividualPost = () => {
    const { post_id } = useParams();
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load individual post by post_id from database
    useEffect(() => {
        setIsLoading(true);
        fetch(`https://vast-village-server.herokuapp.com/post/${post_id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data);
                setIsLoading(false);
            })
    }, [post_id])

    console.log(post);
    return (
        <>
            <Header />

            {/* Post main */}
            <div className="mt-28 md:mt-16 flex justify-center">
                <div className="w-full sm:w-4/5 md:w-2/3 lg:w-2/5">
                    {
                        isLoading && <PostSkeleton />
                    }
                    {!!post.length ? post?.map(pst => <Main post={pst} key={pst.post_id} />)
                    :
                    <div className="text-center text-red-600 mt-5">Post maybe deleted</div>}
                </div>
            </div>
        </>
    );
};

export default IndividualPost;