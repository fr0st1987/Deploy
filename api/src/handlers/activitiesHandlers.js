const { createActivity } = require('../controllers/activityController');
const { Activities } = require('../db');

const handleError = (res, error) => {
    return res.status(400).json({ error: `Ocurrió un error: ${error.message}` })
}; //creo handle error

const activitiesHandlers = async (req, res) => {
    //el readme pide cree una actividad con varios datos, que al ser un form,
    // vendran por un body.
    try {
        const { name, difficulty, duration, season, countryId, image} = req.body; //destructuro del body las propiedades que necesito. Agrego countryId para poder hacer la relación luego con la base de datos Country
        const newActivity = await createActivity(name, difficulty, duration, season, countryId, image); //creo la nueva actividad modularizando la función.
        res.status(201).json(newActivity); //si puedo crearla, la devuelvo con el status.
    }
    catch (error) {
        (handleError(res, error)); //sino manejo el error.
    }
}

//agrego un get activities
const getAllActivities = async (req, res) => {
    const allActivities = await Activities.findAll();
    try {
        return res.status(200).json(allActivities)
    } catch (error) {
        (handleError(res, error));
}
}

//agrego un deleteActivities.

const deleteActivities = async (req, res) => {
    const { id } = req.params;
    const allActivities = await Activities.findAll();
    console.log(id)
    try {
        allActivities;
        const deletedActivity = await Activities.destroy({
            where: { id }
        });
        console.log(deletedActivity)
        if (deletedActivity === 0) {
            res.status(404).json('Activity not found');
        } else {
            res.status(200).json('Activity deleted');
        }
    } catch (error) {
        (handleError(res, error));
    }
}

module.exports = { activitiesHandlers, deleteActivities, getAllActivities }

