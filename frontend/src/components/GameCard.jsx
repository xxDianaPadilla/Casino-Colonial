import React from "react";
import { Dice1, Edit, Trash2, DollarSign } from "lucide-react";

const GameCard = ({ game, onDelete, onEdit }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-SV', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getCategoryColor = (category) => {
        const colors = {
            'slots': 'bg-orange-500',
            'mesa': 'bg-red-500',
            'cartas': 'bg-blue-500',
            'ruleta': 'bg-green-600',
            'poker': 'bg-orange-600',
            'blackjack': 'bg-red-600'
        };
        return colors[category.toLowerCase()] || 'bg-gray-500';
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
            <div className={`h-2 ${getCategoryColor(game.gameCategory)}`}></div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <Dice1 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{game.gameName}</h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm text-white font-medium ${getCategoryColor(game.gameCategory)}`}>
                                {game.gameCategory}
                            </span>
                        </div>
                    </div>

                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={() => onEdit(game)}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            title="Editar juego"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(game._id)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            title="Eliminar juego"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-600 font-medium">Apuesta mínima:</span>
                        <span className="text-green-600 font-bold flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {formatCurrency(game.minimumBet)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-600 font-medium">Apuesta máxima:</span>
                        <span className="text-orange-600 font-bold flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {formatCurrency(game.maximunBet)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;