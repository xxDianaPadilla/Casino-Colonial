import React from "react";

const Footer = () => {
    return (
        <footer className="bg-green-900 py-12">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <div className="flex justify-center items-center mb-6">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                            <span className="text-green-900 text-2xl">🌴</span>
                        </div>
                        <div>
                            <h5 className="text-2xl font-bold text-white">CASINO COLONIAL</h5>
                        </div>
                    </div>
                    <p className="text-green-300 text-lg mb-6">La experiencia de juego más exclusiva te espera</p>
                    <div className="border-t border-green-700 pt-6">
                        <p className="text-green-400">© 2025 Casino Colonial. Todos los derechos reservados.</p>
                        <p className="text-green-500 text-sm mt-2">Juega responsablemente. +18</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 