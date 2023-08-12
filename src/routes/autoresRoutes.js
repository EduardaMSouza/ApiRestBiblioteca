import  express  from "express";
import autorController from "../controller/autoresController.js";

const router = express.Router();


router
    .get("/autores", autorController.listarautors)
    .get("/autores/:id", autorController.listarautorPorId)
    .post("/autores", autorController.cadastrarautor)
    .put("/autores/:id", autorController.atualizaraautor)
    .delete("/autores/:id", autorController.excluirautor)


export default router;