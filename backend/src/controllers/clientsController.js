import clientsModel from "../models/Clients.js";

const clientsController = {};

clientsController.getClients = async (req, res) => {
    const clients = await clientsModel.find();
    res.json(clients);
};

clientsController.deleteClients = async (req, res) => {
    const deleteClients = await clientsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Cliente eliminado"});
};

clientsController.updateClients = async (req, res) => {
    const {fullName, email, password, birthDate, residenceCountry} = req.body;

    const updatedClient = await clientsModel.findByIdAndUpdate(req.params.id, {fullName, email, password, birthDate, residenceCountry}, {new: true});

    res.json({message: "Cliente actualizado"});
};

export default clientsController;