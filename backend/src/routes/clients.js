import {Schema, model} from "mongoose";

const clientsSchema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    birthDate: {
        type: Date,
        require: true,
    },
    residenceCountry: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
    strict: false
});

export default model("Clients", clientsSchema);