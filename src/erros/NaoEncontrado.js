import ErroBase from "./ErrosBase.js";

class NaoEncontrado extends ErroBase{
  constructor(mensagem="pagina nao encontrada"){
    super(mensagem, 404);
  }
}

export default NaoEncontrado;