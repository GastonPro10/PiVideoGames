require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;

const videogameRoute = require('./videogame');
const videogamesRoute = require('./videogames');
const genresRoute = require('./genres');

// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers

router.use('/videogame', videogameRoute);
router.use('/genres', genresRoute);
router.use('/videogames', videogamesRoute);

// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
