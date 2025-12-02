import React from 'react';

const SimpleCardSkeleton = () => {
    return (
        <div className="flex-1 flex items-center justify-between bg-white rounded-xl shadow-sm overflow-hidden mx-1 h-16 max-h-16 cursor-default border border-gray-100 animate-pulse">
            {/* Bagian ikon kiri (Skeleton) */}
            <div className="flex items-center justify-center w-14 h-full bg-gray-200">
                {/* Ikon Placeholder */}
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            </div>

            {/* Bagian teks (Skeleton) */}
            <div className="flex-1 px-4 py-3 flex flex-col justify-center gap-2">
                {/* Judul Placeholder */}
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                {/* Data Placeholder */}
                <div className="h-2 w-16 bg-gray-200 rounded"></div>
            </div>

            {/* Bagian ikon kanan (Skeleton) */}
            <div className="pr-4 flex items-center">
                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
};

export default SimpleCardSkeleton;
