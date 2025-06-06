import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import clientsModel from "../models/Clients.js";
import {config} from "../config.js";

const registerClientsController = {};

registerClientsController.register = async (req, res) => {
    const {fullName, email, password, birthDate, residenceCountry} = req.body;

    try {
        const existsClient = await clientsModel.findOne({email});
        if(existsClient){
            return res.json({message: "Client already exists"});
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const newClient = new clientsModel({
            fullName, email, password: passwordHash, birthDate, residenceCountry
        });

        await newClient.save();

        const verificationCode = crypto.randomBytes(3).toString("hex");

        const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.JWT.secret,
            {expiresIn: "2h"}
        )

        res.cookie("verificationToken", tokenCode, {maxAge: 2 * 60 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.emailUser.user_email,
                pass: config.emailUser.user_pass
            }
        });

        const mailOptions = {
            from: config.emailUser.user_email,
            to: email,
            subject: "Para verificar tu cuenta utiliza este código: " + verificationCode + " expira en dos horas"
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) console.log("error" + error);
            res.json({message: "Email sent" + info});
        });

        res.json({message: "Client registeres, please verify your email"});
    } catch (error) {
        console.log("error" + error);
        res.json({message: "Error" + error});
    }
};

export default registerClientsController;