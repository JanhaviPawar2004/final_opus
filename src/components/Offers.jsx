import React from "react";

const Offers = () => {
    return (
        <div className="w-full h-[25vh] bg-yellow-200 flex overflow-x-auto space-x-4 p-4">
            {/* Placeholder offers */}
            <div className="min-w-[300px] bg-yellow-400 rounded flex-shrink-0 flex items-center justify-center">
                Offer 1
            </div>
            <div className="min-w-[300px] bg-yellow-500 rounded flex-shrink-0 flex items-center justify-center">
                Offer 2
            </div>
            <div className="min-w-[300px] bg-yellow-600 rounded flex-shrink-0 flex items-center justify-center">
                Offer 3
            </div>
        </div>
    );
};

export default Offers;