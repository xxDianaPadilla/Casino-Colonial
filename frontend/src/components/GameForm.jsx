import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const GameForm = ({ isOpen, onClose, onSubmit, editingGame }) => {
    const [formData, setFormData] = useState({
        gameName: '',
        gameCategory: '',
        minimumBet: '',
        maximunBet: ''
    });

    useEffect(() => {
        if (editingGame) {
            setFormData({
                gameName: editingGame.gameName,
                gameCategory: editingGame.gameCategory,
                minimumBet: editingGame.minimumBet,
                maximunBet: editingGame.maximunBet
            });
        } else {
            setFormData({
                gameName: '',
                gameCategory: '',
                minimumBet: '',
                maximunBet: ''
            });
        }
    }, [editingGame, isOpen]);

    const handleSubmit = () => {
        if (formData.gameName && formData.gameCategory && formData.minimumBet && formData.maximunBet) {
            onSubmit(formData);
            setFormData({
                gameName: '',
                gameCategory: '',
                minimumBet: '',
                maximunBet: ''
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="bg-green-600 p-6 text-white rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">
                            {editingGame ? 'Editar Juego' : 'Agregar Nuevo Juego'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-green-700 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Nombre del Juego
                        </label>
                        <input
                            type="text"
                            name="gameName"
                            value={formData.gameName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Ej: Ruleta Americana"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Categoría
                        </label>
                        <select
                            name="gameCategory"
                            value={formData.gameCategory}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        >
                            <option value="">Seleccionar categoría</option>
                            <option value="slots">Slots</option>
                            <option value="mesa">Mesa</option>
                            <option value="cartas">Cartas</option>
                            <option value="ruleta">Ruleta</option>
                            <option value="poker">Poker</option>
                            <option value="blackjack">Blackjack</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Apuesta Mínima ($)
                        </label>
                        <input
                            type="number"
                            name="minimumBet"
                            value={formData.minimumBet}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="1.00"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Apuesta Máxima ($)
                        </label>
                        <input
                            type="number"
                            name="maximunBet"
                            value={formData.maximunBet}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="1000.00"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                        >
                            {editingGame ? 'Actualizar' : 'Agregar'} Juego
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameForm;