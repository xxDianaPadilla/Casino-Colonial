import React from "react";
import { Play, Star, Crown, ChevronRight, Dice1, Spade, Heart } from "lucide-react";
import {useNavigate} from "react-router-dom";

const HeroSection = ({}) => {

    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate("/dashboard")
    }

    return (
        <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-900 min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 text-orange-500 text-6xl animate-pulse">
                    <Spade />
                </div>
                <div className="absolute top-40 right-32 text-red-500 text-5xl animate-bounce">
                    <Heart />
                </div>
                <div className="absolute bottom-32 left-40 text-orange-400 text-7xl animate-spin-slow">
                    <Dice1 />
                </div>
                <div className="absolute bottom-20 right-20 text-yellow-400 text-4xl animate-pulse">
                    <Crown />
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                            <div className="text-green-700 text-6xl">🌴</div>
                        </div>
                    </div>

                    <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                        CASINO
                    </h1>
                    <h2 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-8 tracking-tight">
                        COLONIAL
                    </h2>

                    <p className="text-2xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Experimenta la emoción del juego en el casino más exclusivo.
                        Donde la tradición se encuentra con la innovación.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button
                            onClick={handleDashboardClick}
                            className="group bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
                        >
                            <Play className="w-6 h-6" />
                            <span>Ir al Dashboard</span>
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button className="group bg-transparent border-3 border-orange-400 text-orange-400 px-10 py-4 rounded-full text-xl font-bold hover:bg-orange-400 hover:text-green-900 transition-all duration-300 flex items-center space-x-3">
                            <Star className="w-6 h-6" />
                            <span>Ver Promociones</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute top-1/4 left-10 w-4 h-4 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-16 w-3 h-3 bg-red-500 rounded-full animate-ping delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-2000"></div>
        </section>
    );
};

export default HeroSection;