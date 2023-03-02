const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

/* País con las siguientes propiedades:
ID (Código de 3 letras) *
Nombre *
Imagen de la bandera *
Continente *
Capital *
Subregión
Área
Población */
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {  
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        flag: {
          type: DataTypes.STRING,
          allowNull: false
        },
        continents: {
          type: DataTypes.STRING,
          allowNull: false
        },
        capital:{
          type: DataTypes.STRING,
          allowNull: false
        },
        subregion: {
          type: DataTypes.STRING,
        },
        area: {
          type: DataTypes.FLOAT,
        },
        population: {
          type: DataTypes.INTEGER,
        },}, {timestamps:false}) //para sacar el createdAt y updateAt de la tabla.)
}



