import React from "react";
import { Star, Zap, Crown } from "lucide-react";

const FeaturesSection = () => {
    const features = [
        {
            icon: <Zap className="w-12 h-12" />,
            title: "Juegos Instantáneos",
            description: "Accede a cientos de juegos al instante, sin descargas ni esperas."
        },
        {
            icon: <Crown className="w-12 h-12" />,
            title: "VIP Experience",
            description: "Disfruta de beneficios exclusivos y atención personalizada.",
        },
        {
            icon: <Star className="w-12 h-12" />,
            title: "Bonos Increíbles",
            description: "Promociones diarias y bonos de bienvenida que te sorprenderán."
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-green-900 to-green-800">
            <div className="container mx-auto px-6">
                <h3 className="text-5xl font-bold text-center text-white mb-16">
                    ¿Por qué elegir <span className="text-orange-400">Casino Colonial</span>?
                </h3>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group bg-green-700/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-green-600/30">
                            <div className="text-orange-400 mb-6 group-hover:text-orange-300 transition-colors">
                                {feature.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-4">{feature.title}</h4>
                            <p className="text-green-100 text-lg leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;