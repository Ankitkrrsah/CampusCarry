import React from 'react';
import { Home, PlusSquare, Search, User, ShieldCheck, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';
import { useAuthStore } from '../store/authStore';

const AdminButton = () => {
    const { user } = useAuthStore();
    if (user?.role !== 'ADMIN' && user?.role !== 'admin') return null;

    return (
        <Link
            to="/admin"
            className="fixed bottom-20 right-4 w-12 h-12 bg-slate-900 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-50"
            title="Admin Panel"
        >
            <ShieldCheck size={20} />
        </Link>
    );
};

const NavItem = ({ to, icon: Icon, label, currentPath }) => {
    const isActive = currentPath === to;
    return (
        <Link to={to} className={cn(
            "flex flex-col items-center justify-center w-full py-2 transition-colors",
            isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
        )}>
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium mt-1">{label}</span>
        </Link>
    )
};

const Navbar = () => {
    const location = useLocation();
    const { user } = useAuthStore();


    if (user?.role === 'ADMIN' || user?.role === 'admin') return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 shadow-2xl pb-safe">
            <div className="max-w-md mx-auto flex justify-between items-center h-16 px-2">
                <NavItem to="/dashboard" icon={Home} label="Home" currentPath={location.pathname} />
                <NavItem to="/create-request" icon={PlusSquare} label="Request" currentPath={location.pathname} />
                <NavItem to="/orders" icon={Search} label="Orders" currentPath={location.pathname} />
                <NavItem to="/notifications" icon={Bell} label="Updates" currentPath={location.pathname} />
                <NavItem to="/profile" icon={User} label="Profile" currentPath={location.pathname} />
            </div>

            <AdminButton />
        </div>
    );
};

export default Navbar;