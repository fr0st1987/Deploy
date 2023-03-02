import axios from 'axios';
import {
    GET_COUNTRIES_BY_ID,
    GET_COUNTRIES,
    GET_COUNTRIES_BY_NAME,
    GET_ACTIVITIES,
    POST_ACTIVITIES,
    DELETE_ACTIVITY,
    FILTERED_BY_ACTIVITIES,
    FILTERED_BY_CONTINENT,
    ORDERED_BY_NAME,
    ORDERED_BY_POPULATION,
    ADD_FAVORITES,
    DELETE_FAVORITES,
    CLEAN,
} from './types';
import Swal from 'sweetalert2';


export const getAllCountries = () => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get('http://localhost:3001/countries')
            const countries = apiData.data;
            dispatch({ type: GET_COUNTRIES, payload: countries });
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const getCountriesByName = (name) => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`http://localhost:3001/countries?name=${name}`)
            const countryByName = apiData.data
            dispatch({ type: GET_COUNTRIES_BY_NAME, payload: countryByName });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `There is no country with such name! Try Again`,
                footer: '<a href="/home">Why do I have this issue?</a>'
            })
        }
    };
}


export const getCountriesById = (id) => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`http://localhost:3001/countries/${id}`)
            const countryById = apiData.data
            dispatch({ type: GET_COUNTRIES_BY_ID, payload: countryById });
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const orderByPopulation = (order) => {
    console.log(order)
    return { type: ORDERED_BY_POPULATION, payload: order }
}

export const orderByName = (order) => {
    return { type: ORDERED_BY_NAME, payload: order }
}

export const filterByContinent = (payload) => {
    console.log('filterByContinent', payload);
    return { type: FILTERED_BY_CONTINENT, payload: payload }
}

export const filterByActivities = (activities) => {
    console.log(activities)
    return { type: FILTERED_BY_ACTIVITIES, payload: activities }
}

//la agrego para tener alguna más
export const getAllActivities = () => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get('http://localhost:3001/activities')
            const allActivities = apiData.data
            dispatch({ type: GET_ACTIVITIES, payload: allActivities });
        } catch (error) {
            throw new Error("Could not get activities data");
        }
    };
}

export function postActivity(payload) {
    return async function () {
        try {
            const apiData = await axios.post("http://localhost:3001/activities", payload);
            return {
                type: POST_ACTIVITIES,
                payload: apiData,

            };
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Could not create Activity. Try Again!`,
                footer: '<a href="">Why do I have this issue?</a>'
            })

        }
    };
}

export function deleteActivity(id) {
    return async function (dispatch) {
        try {
            const activity = await axios.delete(`http://localhost:3001/activities/${id}`)
            return dispatch({
                type: DELETE_ACTIVITY,
                payload: activity,
            });
        } catch (error) {
            alert(error)
        }
    };
};

export const Clean = (payload) => {
    return {
        type: "CLEAN",
        payload: payload,
    };
};

export function addFavorites(id) {
    return {
        type: ADD_FAVORITES,
        payload: id
    }
}

export function deleteFavorites(id) {
    return {
        type: DELETE_FAVORITES,
        payload: id
    }
}





/* export let postUser = (data)=>{
    return async function(dispatch){
        fetch("http://localhost:3001/api/users", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
            })
            .then(res => res.json())
            .then(data => {
                console.log("sending the sign up from to the api...");
                return dispatch({
                    type: POST_USER,
                    payload: data
                })
            })
            .catch(err=>err) */

// ojo es para creación de usuarios para login.