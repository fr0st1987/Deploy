const { Country } = require('../db');
const axios = require('axios');

//acá, ante la posibilidad, voy a getear con axios toda la data que necesito de la api y la voy a bulkcrear dentro de mi base de datos.
//si mi db no tiene data, agrego la data de la api


const fullDataBase = async () => {
    try {
        let apiInformation = await Country.findAll();  //valido que la DB no tenga info.
        if (apiInformation.length) return apiInformation; //si tiene, retorno la info.

        const apiResponse = await axios.get("https://restcountries.com/v3/all") //pido la data a la api.
        const allCountriesInfo = await apiResponse.data.map(country => ({ //mapeo la data que necesito.
            id: country.cca3,
            name: country.name.common,
            flag: country.flags[0],
            capital: country.capital ? country.capital[0] : "This country have no capital", //me volviste loco! CAPITAL... como va haber un NULL?
            continents: country.continents[0],
            subregion: country.subregion,
            area: country.area || null,
            population: country.population || null
        }));


        apiInformation = await Country.bulkCreate(allCountriesInfo); //modifico la variable let y le bulkCreo la info mapeada de la API. 
        return apiInformation; //retorno mi base de datos

    } catch (error) {
        return error
    }
};







module.exports = { fullDataBase }
