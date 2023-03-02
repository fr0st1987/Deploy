const { fullDataBase } = require('../controllers/dataBaseController');
const { Country, Activities } = require('../db');

const searchOptions = {   //me hice este objeto por afuera, para que quede más prolijo
    include: {             // intenté modularizarlo en un controller de countries, pero no me funcionaba.
        model: Activities,
        through: {
            attributes: [],
        },
    },
};

const findCountry = async (id) => {    // idem arriba
    return await Country.findByPk(id, searchOptions);
};
const handleError = (res, error) => {
    return res.status(500).json({ error: `Ocurrió un error: ${error.message}` });   //cree este handle error para utilizarlo y no estar repitiendo código
};                                                                                //me hubiera gustado hacer un handle error global y pasarlo como middleware.

const getAllCountriesHandler = async (req, res) => {
    fullDataBase();   //llamo a la función que llama a la api. También quise meterla como middleware pero no funcionó.
    const { name } = req.query;  //desestructuro el name del query que llegará por búsqueda desde el front.
    const allCountries = await Country.findAll(searchOptions); //busco en la DB con la función search creada anteriormente.
    try {
        if (name) {  //si exist el name en el query.
            const country = allCountries.filter(c => c.name.toLowerCase().includes(name.toLowerCase())); //hago un filtro para buscar el nombre e incluyo el name del query (ojo con el === sino no trae todo lo que contenga). Hay que tener en cuenta la validación lowerCase para que pueda ingresar en el front, el usuario de cualquier manera el search.
            if (country.length) {                                 //si hay país con el filtro, lo devuelvo                                      
                return res.status(200).json(country);
            }
            return res.status(400).json("No country found"); //si no hay, aviso que no hay country con esa búsqueda.
        }
        return res.status(200).json(allCountries); //si no existe el query pasado, retorno
    } catch (error) {
        return handleError(res, error); //retorno el handler error "glboal"
    }
};/*  */

const getCountryHandler = async (req, res) => {
    try {
        const { id } = req.params; //destructuro el id pasado por params
        const countryId = await findCountry(id); //busco con la función dada el ID
        if (countryId) { //si hay country lo retorno
            return res.status(200).json(countryId);
        }
        return res.status(400).json(`No country found with such ID: ${id}`); //si no hay country con ese id, aviso.
    } catch (error) {
        return handleError(res, error); //si sucede error lo manejo.
    }
};


module.exports = {
    getAllCountriesHandler,
    getCountryHandler,
};
