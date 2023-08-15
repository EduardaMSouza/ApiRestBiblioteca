import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

let livroSchema = new mongoose.Schema({
  id: {type: String},
  titulo: {type: String, required: [true, "obrigatorio ter um titulo"]},
  autor: {type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "Obrigatorio ter um autor"],
    autopopulate: { select: "nome" }
  },
  editora: {
    type: String,
    required: [true, "obrigatorio ter uma editora"],
    enum: {
      values: ["App", "Pac"],
      message: "A editora {VALUE} fornecida nao e um valor permitido"
    }  
  },
  numeroDePaginas: {
    type: Number,
    min: [10, "o numero de paginas deve estar entre 10 e 5000! valor fornecido {VALUE}"],
    max: [5000, "o numero de paginas deve estar entre 10 e 5000! valor fornecido {VALUE}"]
  }
});
livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;