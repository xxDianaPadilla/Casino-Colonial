import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import registerClientsRoutes from "./src/routes/registerClients.js";
import clientsRoutes from "./src/routes/clients.js";
import gamesRoutes from "./src/routes/games.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/registerClients", registerClientsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/games", gamesRoutes);

export default app;