import React, { useState, useEffect } from "react";
import { X, Save } from 'lucide-react';

const ClientForm = ({ client, onSave, onCancel, isOpen }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        birthDate: '',
        residenceCountry: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (client) {
            setFormData({
                fullName: client.fullName || '',
                email: client.email || '',
                password: '',
                birthDate: client.birthDate ? client.birthDate.split('T')[0] : '',
                residenceCountry: client.residenceCountry || ''
            });
        } else {
            setFormData({
                fullName: '',
                email: '',
                password: '',
                birthDate: '',
                residenceCountry: ''
            });
        }
    }, [client]);

    const handleSubmit = async () => {
        if (!formData.fullName || !formData.email || (!client && !formData.password) || !formData.birthDate || !formData.residenceCountry) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        setLoading(true);

        try {
            const dataToSend = client
                ? { ...formData, email: undefined }
                : formData;

            await onSave(dataToSend);
            if (!client) {
                setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                    birthDate: '',
                    residenceCountry: ''
                });
            }
        } catch (error) {
            console.error('Error al guardar cliente: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-screen overflow-y-auto">
                <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                        {client ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="text-white hover:bg-green-700 p-1 rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre Completo *
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Ingrese el nombre completo"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Correo Electrónico *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={!!client}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${client ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''
                                }`}
                            placeholder="ejemplo@correo.com"
                        />
                        {client && (
                            <p className="text-xs text-gray-500 mt-1">
                                El correo electrónico no se puede modificar
                            </p>
                        )}
                    </div>

                    {!client && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña *
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required={!client}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Ingrese la contraseña"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Nacimiento *
                        </label>
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            País de Residencia *
                        </label>
                        <input
                            type="text"
                            name="residenceCountry"
                            value={formData.residenceCountry}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Ingrese el país de residencia"
                        />
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                        >
                            <Save className="w-4 h-4" />
                            <span>{loading ? 'Guardando...' : (client ? 'Actualizar' : 'Registrar')}</span>
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientForm;