import React from 'react';

const AboutSkeleton = () => {
    return (
        <>
            <div class="shadow-md rounded-md h-64 p-1 w-full mx-auto mt-2">
                <div class="flex-1 animate-pulse space-y-4 p-1">
                    <div class=" h-8 mt-2 bg-blue-200 rounded"></div>
                    <div class=" h-8 mt-2 bg-blue-200 rounded"></div>
                    <div class=" h-8 mt-2 bg-blue-200 rounded"></div>
                    <div class=" h-8 mt-2 bg-blue-200 rounded"></div>
                    <div class=" h-8 mt-2 bg-blue-200 rounded"></div>
                </div>
            </div>
            <div class="shadow-md rounded-md p-1 w-full mx-auto mt-4">
                <div class="flex-1 animate-pulse space-y-4 p-1">
                    <div class="h-20 bg-blue-200 rounded"></div>
                </div>
            </div>
        </>
    );
};

export default AboutSkeleton;