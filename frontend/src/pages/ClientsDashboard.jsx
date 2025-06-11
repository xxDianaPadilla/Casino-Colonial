import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { User, Plus } from 'lucide-react';
import ClientCard from "../components/ClientCard";
import ClientForm from "../components/ClientForm";

const ClientsDashboard = () => {

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/clients');
                if (!response.ok) {
                    throw new Error('Error al obtener los clientes');
                }
                const data = await response.json();
                setClients(data);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los clientes');
                setLoading(false);
                console.error('Error: ', error);
            }
        };

        fetchClients();
    }, []);

    const handleSaveClient = async (clientData) => {
        try {
            if (editingClient) {
                const response = await fetch(`http://localhost:4000/api/clients/${editingClient._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clientData)
                });

                if (!response.ok) {
                    throw new Error('Error al actualizar el cliente');
                }

                setClients(clients.map(client =>
                    client._id === editingClient._id
                        ? { ...client, ...clientData, email: client.email }
                        : client
                ));
            } else {
                const response = await fetch('http://localhost:4000/api/registerClients', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clientData)
                });

                if (!response.ok) {
                    throw new Error('Error al crear el cliente');
                }

                const result = await response.json();

                const clientsResponse = await fetch('http://localhost:4000/api/clients');
                if (clientsResponse.ok) {
                    const updatedClients = await clientsResponse.json();
                    setClients(updatedClients);
                }
            }

            setShowForm(false);
            setEditingClient(null);
        } catch (error) {
            setError('Error al guardar el cliente');
            console.error('Error: ', error);
        }
    };

    const handleEditClient = (client) => {
        setEditingClient(client);
        setShowForm(true);
    };

    const handleDeleteClient = async (clientId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            try {
                const response = await fetch(`http://localhost:4000/api/clients/${clientId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el cliente');
                }

                setClients(clients.filter(client => client._id !== clientId));
            } catch (error) {
                setError('Error al eliminar el cliente');
                console.error('Error al eliminar el cliente');
            }
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingClient(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Cargando clientes...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h2>
                            <p className="text-gray-600 mt-2">
                                Total de clientes registrados: <span className="font-semibold text-green-600">{clients.length}</span>
                            </p>
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg transition-colors flex items-center space-x-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Registrar Cliente</span>
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    {clients.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay clientes registrados</h3>
                                <p className="text-gray-500 mb-6">Comienza registrando tu primer cliente</p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Registrar Cliente
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clients.map((client) => (
                                <ClientCard
                                    key={client._id}
                                    client={client}
                                    onEdit={handleEditClient}
                                    onDelete={handleDeleteClient}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <ClientForm
                    client={editingClient}
                    onSave={handleSaveClient}
                    onCancel={handleCancelForm}
                    isOpen={showForm}
                />
            </div>
        </>
    );
};

export default ClientsDashboard;