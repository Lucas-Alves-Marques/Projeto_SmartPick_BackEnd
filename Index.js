import express from "express";
import routes from "./Routes.js";
import cors from 'cors'

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", routes);

app.listen(3000, () => {
    
    console.log("Servidor rodando na porta 3000");

});
