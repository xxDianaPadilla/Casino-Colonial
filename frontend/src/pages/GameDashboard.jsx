import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import GameCard from "../components/GameCard";
import GameForm from "../components/GameForm";
import { Dice1, Edit, Plus, DollarSign } from "lucide-react";

const GameDashboard = () => {
    const [games, setGames] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingGame, setEditingGame] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchGames = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://casino-colonial.onrender.com/api/games');

            if (!response.ok) {
                throw new Error('Error al cargar los juegos');
            }

            const gamesData = await response.json();
            setGames(gamesData);
        } catch (error) {
            console.error('Error fetching games: ', error);
            alert('Error al cargar los juegos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const handleAddGame = async (gameData) => {
        try {
            if (editingGame) {
                const response = await fetch(`https://casino-colonial.onrender.com/api/games/${editingGame._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...gameData,
                        minimumBet: parseFloat(gameData.minimumBet),
                        maximunBet: parseFloat(gameData.maximunBet)
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error al actualizar el juego');
                }

                const result = await response.json();
                alert(result.message || 'Juego actualizado correctamente');
                setEditingGame(null);
            } else {
                const response = await fetch('https://casino-colonial.onrender.com/api/games', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...gameData,
                        minimumBet: parseFloat(gameData.minimumBet),
                        maximunBet: parseFloat(gameData.maximunBet)
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error al crear el juego');
                }

                const result = await response.json();
                alert(result.message || 'Juego creado correctamente');
            }

            await fetchGames();
            setIsFormOpen(false);
        } catch (error) {
            console.error('Error saving game: ', error);
            alert('Error al guardar el juego');
        }
    };

    const handleDeleteGame = async (gameId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
            try {
                const response = await fetch(`https://casino-colonial.onrender.com/api/games/${gameId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el juego');
                }

                const result = await response.json();
                alert(result.message || 'Juego eliminado correctamente');

                await fetchGames();
            } catch (error) {
                console.error('Error deleting game: ', error);
                alert('Error al eliminar el juego');
            }
        }
    };

    const handleEditGame = (game) => {
        setEditingGame(game);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingGame(null);
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Gestión de Juegos</h2>
                            <p className="text-gray-600 mt-2">Administra los juegos disponibles en tu casino</p>
                        </div>

                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Agregar Juego</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 font-medium">Total de Juegos</p>
                                    <p className="text-3xl font-bold text-gray-900">{games.length}</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <Dice1 className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 font-medium">Categorías</p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {new Set(games.map(game => game.gameCategory)).size}
                                    </p>
                                </div>
                                <div className="bg-orange-100 p-3 rounded-lg">
                                    <Edit className="w-8 h-8 text-orange-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 font-medium">Apuesta Promedio</p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        ${games.length > 0 ? Math.round(games.reduce((sum, game) => sum + game.maximunBet, 0) / games.length) : 0}
                                    </p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <DollarSign className="w-8 h-8 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        </div>
                    ) : games.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                                <Dice1 className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay juegos disponibles</h3>
                            <p className="text-gray-500 mb-6">Comienza agregando tu primer juego al casino</p>
                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Agregar Primer Juego</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {games.map(game => (
                                <GameCard
                                    key={game._id}
                                    game={game}
                                    onDelete={handleDeleteGame}
                                    onEdit={handleEditGame}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <GameForm
                    isOpen={isFormOpen}
                    onClose={handleCloseForm}
                    onSubmit={handleAddGame}
                    editingGame={editingGame}
                />
            </div>
        </>
    );
};

export default GameDashboard;