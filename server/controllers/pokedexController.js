import pokemons from "../models/Pokemon.js";

class PokedexController {

    static listPokemons = (req, res) => {
        pokemons.find()
            .exec((err, pokemons) => {
                if (err) {
                    res.status(400).send({ message: err.message });
                } else {
                    res.status(200).send(pokemons);
                }
            })
    };

    static listById = (req, res) => {
        const id = req.params.id;

        pokemons.findById(id)
            .exec((err, pokemons) => {

                if (err) {
                    res.status(400).send({ message: err });
                } else {
                    res.status(200).send(pokemons);
                }
            });
    };

    static findByType = (req, res) => {
        const typeFind = req.params.type;
        
        pokemons.find({type: typeFind })
        .exec((err, pokemons) => {

            if (err) {
                res.status(400).send({ message: err });
            } else {
                res.status(200).send(pokemons);
            }
        });

    };

    static findByName = (req,res) =>{
        const nameFind = req.params.name;

        pokemons.find({name: { $regex: nameFind, $options: 'i' }})
        .exec((err, pokemons) => {

            if (err) {
                res.status(400).send({ message: err });
            } else {
                res.status(200).send(pokemons);
            }
        });
    };    

};

export default PokedexController;