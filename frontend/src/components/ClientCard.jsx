import React from "react";
import { User, Mail, Calendar, Globe, Edit2, Trash2 } from "lucide-react";

const ClientCard = ({ client, onEdit, onDelete }) => {
    const formatDate = (dateString) => {

        const dateOnly = dateString.split('T')[0];
        const [year, month, day] = dateOnly.split('-');

        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border-l-4 border-orange-500 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-green-600 p-2 rounded-full">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{client.fullName}</h3>
                        <p className="text-sm text-gray-600">Cliente desde {formatDate(client.createdAt)}</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(client)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Editar cliente"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(client._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Eliminar cliente"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-700">
                    <Mail className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{client.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Nacimiento: {formatDate(client.birthDate)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                    <Globe className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{client.residenceCountry}</span>
                </div>
            </div>
        </div>
    );
};

export default ClientCard;