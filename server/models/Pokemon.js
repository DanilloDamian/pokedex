import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema(
    {   
       id: {type: Number},
       img: {type: String},
       name: {type: String},
       type: {type: Array},
       stats: {type: Object}
    }
);

const pokemons= mongoose.model('pokemons', pokemonSchema);

export default pokemons;