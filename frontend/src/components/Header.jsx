import React from "react";

const Header = () => {

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
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="text-white hover:text-orange-400 transition-colors font-semibold">Inicio</a>
                        <a href="#" className="text-white hover:text-orange-400 transition-colors font-semibold">Juegos</a>
                        <a href="#" className="text-white hover:text-orange-400 transition-colors font-semibold">Clientes</a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;