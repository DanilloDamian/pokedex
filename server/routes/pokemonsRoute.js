import express from "express";
import PokedexController from "../controllers/pokedexController.js";

const router = express.Router();

router
    .get("/", PokedexController.listPokemons)
    .get("/:id", PokedexController.listById)
    .get("/type/:type",PokedexController.findByType)
    .get("/name/:name",PokedexController.findByName)    

export default router;