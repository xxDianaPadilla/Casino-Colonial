import gamesModel from "../models/Games.js";

const gamesController = {};

gamesController.getGames = async (req, res) => {
    const games = await gamesModel.find();
    res.json(games);
};

gamesController.createGames = async (req, res) => {
    const {gameName, gameCategory, minimumBet, maximunBet} = req.body;

    const newGame = new gamesModel({
        gameName, gameCategory, minimumBet, maximunBet
    });

    await newGame.save();
    res.json({message: "Juego guardado"});
};

gamesController.deleteGames = async (req, res) => {
    const deleteGame = await gamesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Juego eliminado"});
};

gamesController.updateGames = async (req, res) => {
    const {gameName, gameCategory, minimumBet, maximunBet} = req.body;

    const updatedGame = await gamesModel.findByIdAndUpdate(req.params.id, {gameName, gameCategory, minimumBet, maximunBet}, {new: true});

    res.json({message: "Juego actualizado"});
};

export default gamesController;