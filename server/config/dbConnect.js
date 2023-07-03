import mongoose from "mongoose"

mongoose.connect("mongodb+srv://usuario:senha@cluster0.bg04jhr.mongodb.net/Pokedex");

let db = mongoose.connection;

export default db;