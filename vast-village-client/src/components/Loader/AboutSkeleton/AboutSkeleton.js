import React from 'react';

const AboutSkeleton = () => {
    return (
        <>
            <div className="shadow-md rounded-md h-64 p-1 w-full mx-auto mt-2">
                <div className="flex-1 animate-pulse space-y-4 p-1">
                    <div className=" h-8 mt-2 bg-blue-200 rounded"></div>
                    <div className=" h-8 mt-2 bg-blue-200 rounded"></div>
                    <div className=" h-8 mt-2 bg-blue-200 rounded"></div>
                    <div className=" h-8 mt-2 bg-blue-200 rounded"></div>
                    <div className=" h-8 mt-2 bg-blue-200 rounded"></div>
                </div>
            </div>
            <div className="shadow-md rounded-md p-1 w-full mx-auto mt-4">
                <div className="flex-1 animate-pulse space-y-4 p-1">
                    <div className="h-20 bg-blue-200 rounded"></div>
                </div>
            </div>
        </>
    );
};

export default AboutSkeleton;