import React from "react";

const Categories = () => {
    return (
        <div className="w-full h-[15vh] bg-green-200 flex overflow-x-auto space-x-4 p-4 items-center">
            {/* Placeholder categories */}
            <div className="min-w-[120px] h-full bg-green-400 rounded flex items-center justify-center">
                Electronics
            </div>
            <div className="min-w-[120px] h-full bg-green-500 rounded flex items-center justify-center">
                Footwear
            </div>
            <div className="min-w-[120px] h-full bg-green-600 rounded flex items-center justify-center">
                Clothing
            </div>
            <div className="min-w-[120px] h-full bg-green-700 rounded flex items-center justify-center">
                Accessories
            </div>
        </div>
    );
};

export default Categories;