import express from "express";
import pokemons from "./pokemonsRoute.js"

const routes = (app) => {    

    app.use(
        express.json(),
        pokemons            
    )
}

export default routes;