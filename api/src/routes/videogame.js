require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { Videogame, Genre, Videogamegenre } = require('../db');
const { APY_KEY } = process.env;

const router = Router();

router.get('/:id', async(req, res) => {
    const {id} = req.params

    if(!id) res.status(400).json({msg: "Falta ID"})
    try {
        if (id.includes("-")){
            let game = await Videogame.findByPk(id, {include: [{model: Genre}]})

            game = JSON.stringify(game)
            game = JSON.parse(game)
            
            game.genres = game.genres.map(g => g.name)
            return res.send(game)
        }
        
        const videoGameInfoId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${APY_KEY}`);
        let gameDetail ={
          image: videoGameInfoId.data.background_image,
          name: videoGameInfoId.data.name,
          released: videoGameInfoId.data.released,
          rating: videoGameInfoId.data.rating,
          platforms: videoGameInfoId.data.platforms.map(e => e.platform.name),
          genres: videoGameInfoId.data.genres.map(e => e.name),
          description: videoGameInfoId.data.description,
          website: videoGameInfoId.data.website,
        }
    
      return res.status(200).json(gameDetail)
      //res.status(404).send("VideoGame By Id Not Found")
      
    } catch (error) {
        console.log(error);
    }

})


router.post('/', async (req, res) => {
    const {name, description, released, rating, plataforms, genre} = req.body
    try {
        if(!name || !description || !plataforms) return res.status(404).send({msg: "Faltan datos obligatorios"})
        
        const newGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            plataforms
        })

        const genreDb = await Genre.findAll({
            where: {name : genre}
        })
        newGame.addGenre(genreDb)
        res.send("Creado con exito")

    } catch (error) {
        console.log(error);

    }
})

module.exports = router;