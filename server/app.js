import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import cors from "cors";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", ()=> {
    console.log('Conexão com o banco feita com sucesso')
});

const app = express();
app.use(cors());
routes(app);

const port = process.env.PORT || 3000;

app.listen(port,() =>{
    console.log(`Servidor escutando em http://localhost:${port}`)
});

