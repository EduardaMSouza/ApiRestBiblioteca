import  express  from "express";
import autorController from "../controller/autoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();


router
  .get("/autores", autorController.listarautors, paginar)
  .get("/autores/busca", autorController.listarautoresPorFiltro, paginar)
  .get("/autores/:id", autorController.listarautorPorId)
  .post("/autores", autorController.cadastrarautor)
  .put("/autores/:id", autorController.atualizaraautor)
  .delete("/autores/:id", autorController.excluirautor);


export default router;