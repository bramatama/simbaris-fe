import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Avatar from './Avatar';

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

    const { role, email, avatar_url, initials, additional } = user || {};

    // Tentukan subtext (baris kedua) di dropdown
    let subText = role ? role.replace('_', ' ') : email;

    // Tampilkan info tambahan yang relevan berdasarkan role
    if (role === 'team_admin' && additional?.school_name) {
        subText = additional.school_name;
    } else if (role === 'member' && additional?.team_name) {
        subText = additional.team_name;
    }

    const member_name =
        additional?.member_name?.split(' ')[1] ||
        additional?.member_name?.split(' ')[0];
    const committee_name =
        additional?.committee_name?.split(' ')[1] ||
        additional?.committee_name?.split(' ')[0];
    const team_name = additional?.team_name;

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
                <Avatar imageUrl={avatar_url} initials={initials} name={name} />
                <div className="ml-3 text-left">
                    <p className="font-semibold text-lg text-simbaris-text">
                        {member_name || committee_name || team_name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                        {subText}
                    </p>
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
