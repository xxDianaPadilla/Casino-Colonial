import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {

    const location = useLocation();

    const isActive = (path) => {
        if (path === "/" || path === "/home") {
            return location.pathname === "/" || location.pathname === "/home";
        }
        return location.pathname === path;
    };

    const getLinkClasses = (path) => {
        const baseClasses = "transition-colors font-semibold px-3 py-2 rounded-md";
        if (isActive(path)) {
            return `${baseClasses} text-orange-400 bg-green-800 shadow-inner`;
        }
        return `${baseClasses} text-white hover:text-orange-400 hover:bg-green-800`;
    };

    return (
        <header className="bg-gradient-to-r from-green-600 to-green-700 shadow-2xl">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <div className="text-orange-500 text-2xl font-bold">🌴</div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-wide">CASINO</h1>
                            <h2 className="text-2xl font-bold text-orange-400 tracking-wide">COLONIAL</h2>
                        </div>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Link
                            to="/"
                            className={getLinkClasses("/")}
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/dashboard"
                            className={getLinkClasses("/dashboard")}
                        >
                            Juegos
                        </Link>
                        <Link
                            to="/clients"
                            className={getLinkClasses("/clients")}
                        >
                            Clientes
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;