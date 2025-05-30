import {Schema, model} from "mongoose";

const gamesSchema = new Schema({
    gameName: {
        type: String,
        require: true
    },
    gameCategory: {
        type: String,
        require: true
    },
    minimumBet: {
        type: Number,
        require: true
    },
    maximunBet: {
        type: Number,
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Games", gamesSchema);