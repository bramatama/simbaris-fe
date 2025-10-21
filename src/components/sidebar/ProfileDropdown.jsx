import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Avatar from '../Avatar';

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};

const ProfileDropdown = ({ user, onLogout, onPreferences }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useOnClickOutside(dropdownRef, () => setIsOpen(false));

    const { parent, children, imageUrl, initials } = user;

    return (
        <div
            className="flex h-16 w-full max-w-xs font-sans shadow-md"
            ref={dropdownRef}
        >
            {/* --- Tombol Utama Profile --- */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center p-4 transition-colors duration-200 ${
                    isOpen
                        ? 'bg-gray-100 rounded-b-none border-transparent border-2'
                        : 'hover:bg-gray-50 border-transparent border-2 hover:border-transparent'
                }`}
            >
                <Avatar
                    imageUrl={imageUrl}
                    initials={initials}
                    parent={parent}
                />
                <div className="ml-3 text-left">
                    <p className="font-semibold text-lg text-simbaris-text">
                        {parent}
                    </p>
                    <p className="text-xs text-gray-500">{children}</p>
                </div>
                <div className="ml-auto text-gray-500">
                    {isOpen ? (
                        <ChevronUp size={20} />
                    ) : (
                        <ChevronDown size={20} />
                    )}
                </div>
            </button>
            {/* --- Menu Dropdown --- */}
            <div
                className={`absolute top-16 mt-2 w-full bg-white rounded-lg border-transparent border-2 rounded-t-none shadow-lg z-20 origin-top transition-all ease-in-out ${
                    isOpen
                        ? 'transform opacity-100 scale-100 visible'
                        : 'transform opacity-0 scale-95 invisible'
                }`}
            >
                <ul>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onPreferences();
                                setIsOpen(false);
                            }}
                            className="block px-4 py-3 text-sm text-simbaris-text hover:bg-gray-100 transition-colors"
                        >
                            Preferensi
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onLogout();
                                setIsOpen(false);
                            }}
                            className="block px-4 py-3 text-sm text-simbaris-hazard hover:bg-simbaris-hazard-lightest transition-colors"
                        >
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileDropdown;
