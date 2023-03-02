const { text } = require('body-parser');
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

/* [ ] Actividad Turística con las siguientes propiedades:
ID
Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera)
 */
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activities', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(15), //cuido mi base de datos de que no pueda poner más de 15 caracteres.
            allowNull: false,
            /* validate: {
                isAlpha: true, //debe ser sí o sí letras.
                notNull: {
                    msg: 'Please enter the name for the Activity to create' //mando mensaje para que ponga el nombre de la actividad.
                } */

        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1, //validación mínima
                max: 5, //validación máxima
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        season: {
            type: DataTypes.ENUM('summer', 'fall', 'winter', 'spring'),
            allowNull: false,

        },
        image: {
            type: DataTypes.TEXT
        }
    },
        { timestamps: false } //para sacar el createdAt y updateAt de la tabla.
    );
};