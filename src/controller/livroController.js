import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores, livros} from "../models/index.js";

class livroController{
    
  static listarLivros = async (req, res, next) => {
    try{
      const buscaLivros = livros.find();
      req.resultado = buscaLivros;
      next();
    }catch(erro){
      next(erro);
    }
  };  


  // eslint-disable-next-line no-unused-vars
  static listarLivroPorId = async (req, res, next) =>{
    try{
      const {id} = req.params;
      const livrosResultado = await livros.findById(id);
      if(livrosResultado !== null){
        res.status(200).json(livrosResultado);  
      }else{
        next(new NaoEncontrado("livro nao encontrado"));
      } 
    }catch(erro){
      next(erro);
    }
  };
  

  static cadastrarLivro = async (req, res, next) => {
    try{
      let livro = await new livros(req.body);
      await livro.save();
      await res.status(201).send(livro.toJSON());
    }catch(erro){
      next(erro);
    }
  };

  static atualizaraLivro = async (req, res, next) => {
    try{
      livros.findByIdAndUpdate(req.params.id, {$set: req.body},(erro, livro) => {
        if(livro !== null){
          res.status(200).send({message: "livro atualizado com sucesso"});
        }else{
          next(new NaoEncontrado("livro nao encontrado!"));
        }
      });
    }catch(erro){
      next(erro);
    }  
  };

  static excluirLivro = async (req, res, next) => {
    try{
      livros.findByIdAndDelete(req.params.id, (erro, livro) => {
        if(livro !== null && livro !== undefined){
          res.status(200).send({message: "livro excluido com sucesso"});
        }else{
          next(new NaoEncontrado("livro nao encontrado!"));
        }
      });
    }catch(erro){
      next(erro);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next) => {
    try{
      const busca = await processobusca(req.query);
      if(busca !== null){
        const livrosResultado = livros
          .find(busca);

        req.resultado = livrosResultado;
        next();
      }else{
        res.status(200).send([]);
      }

    }catch(erro){
      next(erro);
    }
  };
  
}


async function processobusca(parametro){
  const {titulo, editora, minPaginas, maxPaginas, nomeAutor} = parametro;
  let busca = {};
  if (minPaginas || maxPaginas) busca.numeroDePaginas = {};

  if (minPaginas) busca.numeroDePaginas.$gte = minPaginas;
  if(maxPaginas) busca.numeroDePaginas.$lte = maxPaginas;

  if (editora) busca.editora = editora;
  if(titulo) busca.titulo = { $regex: titulo, $options: "i"};

  if(nomeAutor){
    const autor = await autores.findOne({ nome: nomeAutor });
    
    if(autor !== null){
      const autorId = autor._id;
      busca.autor = autorId;
    }else{
      console.log("entrei null");
      busca = null;
    }
  }

  return busca;
}

export default livroController;