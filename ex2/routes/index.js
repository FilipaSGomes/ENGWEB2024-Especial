var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', async function(req, res, next) {
  // o filtro deve ter id, designacao, data e numero de produtos
  let lista = await axios.get('/listas?fields=_id,designacao,data,produtos&sort=_id');
  res.render('index', { listas: lista.data , title: 'Listas de Compras'});
});

router.get('/listas/:id', async function(req, res, next) {
  let lista = await axios.get(`/listas/${req.params.id}`);
  res.render('lista', { lista: lista.data, title: lista.data.designacao });
});

router.get('/produtos/:designacao', async function(req, res, next) {
  let listas = await axios.get(`/listas?produto=${req.params.designacao}`);



  res.render('produto', { produto: produto.data, listas: listas.data, title: produto.data.designacao });
});

module.exports = router;
