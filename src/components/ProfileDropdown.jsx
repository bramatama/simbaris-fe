// // src/components/ProfileDropdown.jsx

// import React, { useState } from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'; // ikon panah

// const ProfileDropdown = ({ user }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     // Menentukan apakah avatar berupa gambar atau inisial
//     const Avatar = () => {
//         if (user.avatarUrl) {
//             return <img src={user.avatarUrl} alt="Avatar" className="h-10 w-10 rounded-full" />;
//         }
//         // Jika tidak ada gambar, gunakan inisial
//         const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
//         return (
//             <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold">
//                 {initials}
//             </div>
//         );
//     };

//     return (
//         <div className="relative p-4 border-b border-gray-200">
//             {/* Bagian Profil yang selalu terlihat */}
//             <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
//                 <div className="flex items-center space-x-3">
//                     <Avatar />
//                     <div>
//                         <p className="font-semibold text-gray-800">{user.name}</p>
//                         <p className="text-sm text-gray-500">{user.role}</p>
//                     </div>
//                 </div>
//                 {/* Ikon panah berubah sesuai state */}
//                 {isOpen ? (
//                     <ChevronUpIcon className="h-5 w-5 text-gray-500" />
//                 ) : (
//                     <ChevronDownIcon className="h-5 w-5 text-gray-500" />
//                 )}
//             </div>

//             {/* Konten Dropdown (muncul saat isOpen true) */}
//             {isOpen && (
//                 <div className="mt-2 pl-13 space-y-1">
//                     <a href="/preferensi" className="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100">
//                         Preferensi
//                     </a>
//                     {/* Logout dengan background merah saat hover */}
//                     <button 
//                         className="w-full text-left px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50"
//                         onClick={() => alert('Logout clicked!')} // Ganti dengan fungsi logout sebenarnya
//                     >
//                         Logout
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProfileDropdown;