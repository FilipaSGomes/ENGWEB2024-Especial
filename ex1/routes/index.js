var express = require("express");
var router = express.Router();
var listasController = require("../controllers/listas");
var Lista = require("../models/listas");

// GET requests
router.get("/listas", async (req, res) => {
  try {
    const listas = await listasController.getAll(req.query);
    console.log(listas);
    res.json(listas);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get("/listas/categorias", async (req, res) => {
  try {
    const categorias = await listasController.getCategorias();
    res.json(categorias);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/listas/produtos", async (req, res) => {
  try {
    const produtos = await listasController.getProdutos();
    res.json(produtos);
  } catch (err) {
    res.status
    (500).send(err);
  }
});

router.get("/listas/:id", async (req, res) => {
  try {
    const lista = await listasController.getById(req.params.id);
    if (lista) {
      res.json(lista);
    } else {
      res.status(404).send("Lista not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


// POST requests
router.post("/listas", async (req, res) => {
  try {
    const lista = await listasController.create(req.body);
    res.json(lista);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post("/listas/:idLista/produtos", async (req, res) => {
  try {
    const lista = await listasController.addProduto(req.params.idLista, req.body);
    res.json(lista);
  } catch (err) {
    res.status(500).send(err);
  }
});


// PUT requests
router.put("/listas/:id", async (req, res) => {
  try {
    const lista = await listasController.update(req.params.id, req.body);
    if (lista) {
      res.json(lista);
    } else {
      res.status(404).send("Lista not found");
    }
  } catch (err) {
    res.status (500).send(err);
  }
});

// DELETE requests
router.delete("/listas/:id", async (req, res) => {
  try {
    const lista = await listasController.remove(req.params.id);
    if (lista) {
      res.json(lista);
    } else {
      res.status(404).send("Lista not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


router.delete("/listas/:idLista/produtos/:idProd", async (req, res) => {
  try {
    const lista = await listasController.removeProduto(req.params.idLista, req.params.idProd);
    if (lista) {
      res.json(lista);
    } else {
      res.status(404).send("Lista not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;
