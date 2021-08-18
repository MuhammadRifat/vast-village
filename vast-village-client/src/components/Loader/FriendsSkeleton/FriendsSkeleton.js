import React from 'react';

const FriendsSkeleton = () => {
    return (
        <>
            <div className="shadow rounded-md p-4 w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-blue-200 h-14 w-14"></div>
                    <div className="h-14 bg-blue-200 rounded w-4/5"></div>
                </div>
            </div>
            <div className="shadow rounded-md p-4 w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-blue-200 h-14 w-14"></div>
                    <div className="h-14 bg-blue-200 rounded w-4/5"></div>
                </div>
            </div>
            <div className="shadow rounded-md p-4 w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-blue-200 h-14 w-14"></div>
                    <div className="h-14 bg-blue-200 rounded w-4/5"></div>
                </div>
            </div>
            <div className="shadow rounded-md p-4 w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-blue-200 h-14 w-14"></div>
                    <div className="h-14 bg-blue-200 rounded w-4/5"></div>
                </div>
            </div>
            <div className="shadow rounded-md p-4 w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-blue-200 h-14 w-14"></div>
                    <div className="h-14 bg-blue-200 rounded w-4/5"></div>
                </div>
            </div>
        </>
    );
};

export default FriendsSkeleton;