require('dotenv').config();
const { Router } = require('express');
const { Videogame, Genre, Videogamegenre } = require('../db');
const { APY_KEY } = process.env;
const axios = require('axios');

const router = Router();
// Busco la data de la api 100 juegos 
router.get('/', async (req, res) => {
    //busco en la DB si tengo juegos creados y me traigo todos
    let videogamesDb = await Videogame.findAll({
        include: Genre
    });
    //Parseo el objeto
    videogamesDb = JSON.stringify(videogamesDb);
    videogamesDb = JSON.parse(videogamesDb);
    //Aca dejo el arreglo de generos plano con solo los nombres de cada genero(llega array de objetos)
    videogamesDb = videogamesDb.reduce((acc, el) => acc.concat({
        ...el,
        genres: el.genres.map(g => g.name)
    }), [])
    
    //TODO QUERIES --------> GET /videogames?name="..." <-----------
    // si llegan queries "name" lo agarro por aca
    if (req.query.name) {
        try {
            //busco si existe el juego en la API
            let response = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${APY_KEY}`);
            if (!response.data.count) return res.status(204).json(`Juego no encontrado "${req.query.name}"`);
            //filtro SOLO la data que necesito para enviarle al front
            const gamesREADY = response.data.results.map(game => {
                return{
                    id: game.id,
                    name: game.name,
                    image: game.background_image,
                    rating: game.rating,
                    genres: game.genres.map(g => g.name)
                }
            });

            //como antes me traje TODOS de la base de datos, si entro por queries, solo filtro los que coincidan con la busqueda
            const filteredGamesDb = videogamesDb.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
            //doy prioridad a la DB, y sumo todos, y corto el array en 15
            const results = [...filteredGamesDb, ...gamesREADY.splice(0, 15)];
            return res.json(results)
        } catch (err) {
            return console.log(err)
        }
    } else {
        // SI NO ENTRO POT QUERIES --> voy a buscar todos los juegos a la API
        try {
            let pages = 0;
            let results = [...videogamesDb]; //sumo lo que tengo en la DB
            let response = await axios.get(`https://api.rawg.io/api/games?key=${APY_KEY}`);
            while (pages < 6) {
                pages++;
                //filtro solo la DATA que necesito enviar al FRONT
                const gammesREADY = response.data.results.map(game => {
					return{
						id: game.id,
						name: game.name,
						image: game.background_image,
						rating: game.rating,
                        genres: game.genres.map(g => g.name)
					}
				});
                results = [...results, ...gammesREADY]
                response = await axios.get(response.data.next) //vuelvo a llamar a la API con next
            }
            return res.json(results)
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
});



module.exports = router;