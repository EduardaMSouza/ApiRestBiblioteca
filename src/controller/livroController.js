import NaoEncontrado from "../erros/NaoEncontrado.js";
import livros from "../models/Livro.js";

class livroController{
    
  static listarLivros = async (req, res, next) => {
    try{
      await livros.find()
        .populate("autor", "nome")
        .exec((erro, livros) => {
          res.status(200).send(livros);
        });
      
    }catch(erro){
      next(erro);
    }
  };  


  // eslint-disable-next-line no-unused-vars
  static listarLivroPorId = async (req, res, next) =>{
    try{
      const {id} = req.params;
      await livros.findById(id)
        .populate("autor", "nome")
        .exec((erro, livro) =>{
          if(livro !== null){
            res.status(200).json(livro);  
          }else{
            next(new NaoEncontrado("livro nao encontrado"));
          }
        }); 
    }catch(erro){
      next(erro);
    }
  };
  

  static cadastrarLivro = async (req, res, next) => {
    try{
      let livro = await new livros(req.body);
      livro.save();
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

  static listLivrosPorEditora = async (req, res, next) => {
    try{
      const editora = await req.query.editora;
      livros.find({"editora": editora}, {}, (erro, livros)=>{
        res.status(200).send(livros);
      });
    }catch(erro){
      next(erro);
    }
  };
}


export default livroController;