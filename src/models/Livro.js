import mongoose from "mongoose";

let livroSchema = new mongoose.Schema({
  id: {type: String},
  titulo: {type: String, required: [true, "obrigatorio ter um titulo"]},
  autor: {type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "Obrigatorio ter um autor"]},
  editora: {type: String, required: [true, "obrigatorio ter uma editora"]},
  numeroDePaginas: {type: Number}
});

const livros = mongoose.model("livros", livroSchema);

export default livros;