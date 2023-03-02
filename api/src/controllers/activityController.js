const { Activities, Country } = require('../db');


const createActivity = async (name, difficulty, duration, season, countryIds,image) => {
    const newActivity = await Activities.findOrCreate({  //al principio usé create, pero me generaba que una misma actividad podía estar repetida en el país.
        where: {name}, //busco por name y devuelvo el resto de las propiedades por default.
        defaults: {difficulty, duration, season, image}
    });
    const country = await Country.findAll({ 
        where: { id: countryIds }
    });; //busco el country y hago una mini validación previa.
    if (country.length !== countryIds.length) { //? compara el array de resultados con el array countryIds xa ver si encontre con el findAll a todos los paises
        
        throw new Error('Algunos de los países proporcionados no existen');
    }
    //console.log(newActivity) // gracias console.log. Dos horas en usarte, si no te menospreciara tanto.
    await newActivity[0].addCountry(country); //me costó entender que para agregar el country en la nueva actividad, debía fijarla en [0], pues el findOrCreate devuelve un objeto con bastante más data
    


    return newActivity; //devuelvo el objeto creado.
}

module.exports = { createActivity }

