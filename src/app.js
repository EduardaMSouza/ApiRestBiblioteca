import express from "express";
import db from "./config/dbconnect.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import routes from "./routes/index.js";
import manipulador404 from "./middlewares/manipulador404.js";


db.on("error", console.log.bind("error", "erro de conexão"));
db.once("open", ()=>{
  console.log("conexão com o banco feita");
});

const app = express();
app.use(express.json());

routes(app);
app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;