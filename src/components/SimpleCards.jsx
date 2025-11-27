import React from 'react';
import { Link } from 'react-router-dom';

export default function SimpleCard({
    color,
    title,
    data,
    leftIcon,
    rightIcon,
    navigateTo,
}) {
    return (
        <Link to={navigateTo} className="flex-1 flex items-center justify-between bg-white rounded-xl shadow-sm overflow-hidden mx-1 max-h-16 cursor-default">
            {/* Bagian ikon kiri */}
            <div
                className={`flex items-center justify-center w-14 h-full ${color}`}
            >
                {leftIcon}
            </div>

            {/* Bagian teks */}
            <div className="flex-1 px-4 py-3">
                <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                <p className="text-xs text-gray-500">{data}</p>
            </div>

            {/* Ikon kanan */}
            <div className="pr-4 cursor-pointer">{rightIcon}</div>
        </Link>
    );
}
