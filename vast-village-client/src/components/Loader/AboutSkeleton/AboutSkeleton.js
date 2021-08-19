import React from 'react';

const AboutSkeleton = () => {
    return (
        <>
            <div class="shadow rounded-md p-1 w-full mx-auto mt-2">
                <div class="flex-1 animate-pulse space-y-4 py-1">
                    <div class="h-64 bg-blue-200 rounded"></div>
                </div>
            </div>
            <div class="shadow rounded-md p-1 w-full mx-auto mt-2">
                <div class="flex-1 animate-pulse space-y-4 py-1">
                    <div class="h-14 bg-blue-200 rounded"></div>
                </div>
            </div>
        </>
    );
};

export default AboutSkeleton;