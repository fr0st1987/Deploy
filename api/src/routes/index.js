const { Router } = require('express');
const countriesRouter = require('./countriesRouter');
const activitiesRouter = require('./activitiesRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router()


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/activities', activitiesRouter);
router.use('/countries', countriesRouter);


module.exports = router;