import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, PlusCircle, User, LogOut } from 'lucide-react'

const Navbar = () => {
    const location = useLocation();

    // Do not show the sidebar on authentication pages
    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null;
    }

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-white/70 backdrop-blur-xl border-r border-white/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col py-8 z-50">
            <div className="px-8 mb-12">
                <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-600 tracking-tight">
                    MySocial
                </h1>
            </div>

            <nav className="flex-1 space-y-2 px-5">
                <Link to="/" className={`flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${location.pathname === '/' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-1' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1'}`}>
                    <Home size={22} className="mr-3" />
                    <span className="font-semibold text-[15px]">Home</span>
                </Link>

                <Link to="/post" className={`flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${location.pathname === '/post' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-1' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1'}`}>
                    <PlusCircle size={22} className="mr-3" />
                    <span className="font-semibold text-[15px]">Create Post</span>
                </Link>

                <Link to="/profile" className={`flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${location.pathname === '/profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-1' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1'}`}>
                    <User size={22} className="mr-3" />
                    <span className="font-semibold text-[15px]">Profile</span>
                </Link>
            </nav>

            <div className="px-5 mt-auto">
                <button className="flex w-full items-center px-4 py-3.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all duration-300 group">
                    <LogOut size={22} className="mr-3 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold text-[15px]">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Navbar