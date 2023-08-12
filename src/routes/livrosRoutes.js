import  express  from "express";
import livroController from "../controller/livroController.js";

const router = express.Router();


router
    .get("/livros", livroController.listarLivros)
    .get("/livros/busca", livroController.listLivrosPorEditora)
    .get("/livros/:id", livroController.listarLivroPorId)
    .post("/livros", livroController.cadastrarLivro)
    .put("/livros/:id", livroController.atualizaraLivro)
    .delete("/livros/:id", livroController.excluirLivro)


export default router;