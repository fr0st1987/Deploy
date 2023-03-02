const { Router } = require('express');
const { getAllCountriesHandler, getCountryHandler} = require('../handlers/countriesHandlers');


const countriesRouter = Router();


countriesRouter.get('/', getAllCountriesHandler);
countriesRouter.get('/:id', getCountryHandler);


module.exports = countriesRouter;
