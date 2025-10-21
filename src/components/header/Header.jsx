import { Menu } from 'lucide-react';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    return (
        <header className="fixed top-0 left-0 w-full bg-white h-16 flex items-center justify-between z-5 px-4 shadow-lg">
            <div className={`flex items-center`}>
                <Menu
                    className={`text-simbaris-text text-2xl cursor-pointer hover:text-simbaris-primary-darkest transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-3'}`}
                    onClick={toggleSidebar}
                />
            </div>

            <div className="flex items-center gap-2">
                <div
                    className={`hidden md:flex flex-col text-right transition-opacity duration-50`}
                >
                    <img src="/images/logo_simbaris_typograph_lined.png" className='w-32 h-auto' />
                    <span className="text-simbaris-text text-sm font-light">
                        LKBB SPECTA
                    </span>
                </div>
                <img
                    src="/images/logo_simbaris_icon.png"
                    alt="SIMBARIS"
                    className={`w-12 h-auto transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            'https://placehold.co/40x40/EFEFEF/AAAAAA?text=Error';
                    }}
                />
            </div>
        </header>
    );
};

export default Header;
