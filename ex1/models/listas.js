const mongoose = require("mongoose");


const QuantidadeSchema = new mongoose.Schema({
  _id : {type: mongoose.Schema.Types.ObjectId},
  valor: { type: String },
  unidade: { type: String }
});

const ProdutoSchema = new mongoose.Schema({
  _id : {type: Number},
  designacao: { type: String },
  categoria: { type: String },
  quantidade: { type: QuantidadeSchema }
});

const listaSchema = new mongoose.Schema({
  _id : {type: Number},
  designacao: { type: String },
  data: { type: String },
  produtos: { type: [ProdutoSchema] }
});

module.exports = mongoose.model("listas", listaSchema);
