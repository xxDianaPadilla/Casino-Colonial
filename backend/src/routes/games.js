import express from 'express';
import gamesController from "../controllers/gamesController.js";

const router = express.Router();

router.route("/")
.get(gamesController.getGames)
.post(gamesController.createGames);

router.route("/:id")
.put(gamesController.updateGames)
.delete(gamesController.deleteGames);

export default router;