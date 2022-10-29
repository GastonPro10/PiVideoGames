require('dotenv').config();
const { Router } = require('express');
const { Videogame, Genre, Videogamegenre } = require('../db');
const axios = require('axios');
const { APY_KEY } = process.env;

const router = Router();
// https://api.rawg.io/api/genres?key=4333b4a4e7c745f7a61bc18f14a99750
router.get('/', async (req, res) => {
    try {
        // si ya los tengo cargados en la DB los consumo desde alli.
        const genresDb = await Genre.findAll();
        if (genresDb.length) return res.json(genresDb)
        
        //else --> los voy a buscar a la API
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${APY_KEY}`);
        const genres = response.data.results; // recibo un array de objetos, con los juego filtrados por GENERO
        //los guardo en la DB filtrando solo el nombre
        genres.forEach(async g => {
            await Genre.findOrCreate({
                where: {
                    name: g.name
                }
            })
        })
        //(OPTIMIZADO) --> SOLO ENVIO AL FRONT LA INFO NECESARIA (nombre de los generos)
        const genresREADY = genres.map(game => {
            return{
                id: game.id,
                name: game.name
            }
        });
        res.json(genresREADY)
    } catch (err) {
        return console.log(err)
    }
})

module.exports = router;

