const Lista = require("../models/listas"); // Adjust the path as needed

function filters(query) {
  let filter = {};
  let show = {};
  let sort = {};

  // Mudar os campos aqui para os campos da lista
  if (query.designacao){
    filter.designacao = query.designacao;
  }
  if (query.data) {
    //quero que a data seja maior ou igual à data que está na query
    // o campo chama-se data: { type: String },
    let date = {'data': { '$gte': query.data }};
    filter = {...filter, ...date};
  }
  if (query.produto) {
    filter['produtos'] = { $elemMatch: { designacao: query.produto } }; // Vai buscar as listas que têm um produto com a designacao igual à query
  }
  // if fields parameter is present, apply show filter
  if (query.fields) {
    query.fields.split(",").forEach((field) => {
      show[field] = 1;
    });
  }
  // Apply sorting if both sort and order are present
  if (query.sort) {
    sort[query.sort] = query.order === 'desc' ? -1 : 1;
  }
  return { filter, show, sort };
}

// Fetch all Listas or filter by query parameters
function getAll(query){
  let search_options = filters(query);
  return Lista.find(search_options.filter, search_options.show).sort(search_options.sort).exec();
}

function getById(id){
  return Lista.findById(id).exec();
}


function getCategorias(){
  return Lista.distinct("produtos.categoria").exec();
}

function getProdutos(){
  return Lista.distinct("produtos.designacao").exec();
}

// I have this
/*
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
*/
function create(lista){
  return Lista.create(lista);
}

function update(id, lista){
  return Lista.findByIdAndUpdate(id, lista, { new: true }).exec();
}

function addProduto(idLista, produto){
  return Lista.findByIdAndUpdate(idLista, { $push: { produtos: produto } }, { new: true }).exec();
}

function removeProduto(idLista, idProduto){
  return Lista.findByIdAndUpdate(idLista, { $pull: { produtos: { _id: idProduto } } }, { new: true }).exec();
}

function remove(id){
  return Lista.findByIdAndDelete(id).exec();
}

/*
 No need for this one

function getWithFilter(query) {
  let filter = {};
  if (query.produto) {
    filter.produto = query.produto;
  }
  if (query.designacao) {
    filter.designacao = query.designacao;
  }
  if (query.data) {
    filter.data = query.data;
  }
  return Lista.find(filter).exec();
}
*/
module.exports = {
  getAll,
  getById,
  getCategorias,
  getProdutos,
  create,
  update,
  addProduto,
  removeProduto,
  remove
};
