import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Mapping halaman ke struktur breadcrumb
  const breadcrumbMap = {
    '/': [{ name: 'Dashboard', path: '/' }],
    '/detail-pembayaran': [
      { name: 'Dashboard', path: '/' },
      { name: 'Detail Pembayaran', path: '/detail-pembayaran' },
    ],
    '/tim-saya': [
      { name: 'Dashboard', path: '/' },
      { name: 'Tim Saya', path: '/tim-saya' },
    ],
    '/tim-saya/detail': [
      { name: 'Dashboard', path: '/' },
      { name: 'Tim Saya', path: '/tim-saya' },
      { name: 'Detail Tim', path: '/tim-saya/detail' },
    ],
    '/tim-saya/anggota': [
      { name: 'Dashboard', path: '/' },
      { name: 'Tim Saya', path: '/tim-saya' },
      { name: 'Daftar Anggota Tim', path: '/tim-saya/anggota' },
    ],
    '/tim-terdaftar': [
      { name: 'Dashboard', path: '/' },
      { name: 'Tim Terdaftar', path: '/tim-terdaftar' },
    ],
  };

  const items = breadcrumbMap[pathname] || [{ name: 'Dashboard', path: '/' }];

  return (
    <nav className="flex items-center text-sm text-gray-600">
      {/* Home Icon */}
      <Link to="/" className="flex items-center text-gray-600 hover:text-simbaris-primary">
        <Home className="w-4 h-4" />
      </Link>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          {index === items.length - 1 ? (
            <span className="font-semibold text-gray-900">{item.name}</span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-simbaris-primary transition-colors duration-150"
            >
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
