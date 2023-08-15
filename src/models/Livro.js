import mongoose from "mongoose";

let livroSchema = new mongoose.Schema({
  id: {type: String},
  titulo: {type: String, required: [true, "obrigatorio ter um titulo"]},
  autor: {type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "Obrigatorio ter um autor"]},
  editora: {
    type: String,
    required: [true, "obrigatorio ter uma editora"],
    enum: {
      values: ["Casa do codigo", "alura"],
      message: "A editora {VALUE} fornecida nao e um valor permitido"
    }  
  },
  numeroDePaginas: {
    type: Number,
    min: [10, "o numero de paginas deve estar entre 10 e 5000! valor fornecido {VALUE}"],
    max: [5000, "o numero de paginas deve estar entre 10 e 5000! valor fornecido {VALUE}"]
  }
});

const livros = mongoose.model("livros", livroSchema);

export default livros;