import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../animations/animation_llb906fs.json';

function LoadingRecipe() {
    return (
        <div className="flex justify-center items-center h-auto w-auto bg-white">
            <Lottie animationData={animationData} style={{ width: 200, height: 200 }} />
        </div>
    );
}

export default LoadingRecipe;
