import React, {useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';


const Avatar = ({ imageUrl, initials, name }) => {
    if (imageUrl) {
        return (
            <img
                src={imageUrl}
                alt={`Avatar for ${name}`}
                className="w-12 h-12 rounded-full object-cover"
            />
        );
    }

    return (
        <div className="min-w-12 h-12 rounded-full bg-simbaris-primary flex items-center justify-center text-white font-bold text-lg">
            {initials}
        </div>
    );
};

const ProfileDropdown = ({ user, onLogout, onPreferences }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Fungsi untuk menutup dropdown saat klik di luar komponen
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const { parent, children, imageUrl, initials } = user;

    return (
        <div className="relative w-full max-w-xs font-sans" ref={dropdownRef}>
            {/* --- Tombol Utama Profile --- */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center p-4 rounded-lg transition-all duration-200 ${
                    isOpen ? 'bg-gray-100 rounded-b-none border-transparent border-2' : 'hover:bg-gray-50 border-gray-100 border-2 hover:border-transparent'
                }`}
            >
                <Avatar imageUrl={imageUrl} initials={initials} parent={parent} />
                <div className="ml-3 text-left">
                    <p className="font-semibold text-lg text-simbaris-text">{parent}</p>
                    <p className="text-xs text-gray-500">{children}</p>
                </div>
                <div className="ml-auto text-gray-500">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>

            {/* --- Menu Dropdown --- */}
            {isOpen && (
                <div className="absolute w-full bg-white rounded-lg border-transparent border-2 rounded-t-none shadow-lg z-20">
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
            )}
        </div>
    );
};

export default ProfileDropdown;
