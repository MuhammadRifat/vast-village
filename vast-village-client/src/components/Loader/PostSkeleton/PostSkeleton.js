import React from 'react';

const PostSkeleton = () => {
    return (
        <>
            <div className="shadow rounded-md p-4 w-full mx-auto mt-8">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-blue-200 h-12 w-12"></div>
                    <div className="h-10 bg-blue-200 rounded w-3/4"></div>
                </div>
                <div className="flex-1 animate-pulse space-y-4 py-1">
                    <div className="space-y-2">
                        <div className="h-40 bg-blue-200 rounded"></div>
                    </div>
                    <div className="h-8 bg-blue-200 rounded"></div>
                </div>
            </div>

            <div className="shadow rounded-md p-4 w-full mx-auto mt-8">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-blue-200 h-12 w-12"></div>
                    <div className="h-10 bg-blue-200 rounded w-3/4"></div>
                </div>
                <div className="flex-1 animate-pulse space-y-4 py-1">
                    <div className="space-y-2">
                        <div className="h-40 bg-blue-200 rounded"></div>
                    </div>
                    <div className="h-8 bg-blue-200 rounded"></div>
                </div>
            </div>
        </>
    );
};

export default PostSkeleton;