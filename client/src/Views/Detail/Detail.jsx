import { Clean, /* deleteActivity */ getCountriesById } from "../../redux/actions";
import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from './Detail.module.css';

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const myCountry = useSelector((state) => {
        /*  console.log("myCountry:", state.countriesDetail); */

        return state.countriesDetail;
    });

    useEffect(() => {
        console.log(id)
        dispatch(getCountriesById(id));
        return () => {
            dispatch(Clean("detail"))
        }
    }, [dispatch, id]);




    /* console.log('mycountry:' + myCountry.id)
    console.log('myCountry.length:' + myCountry.length)
    console.log(Object.keys(myCountry).length > 0) */
    return (
        <div className={style.container}>
            {Object.keys(myCountry).length > 0 ?
                <div className={style.detail}>
                    <h1>{myCountry.name}</h1>
                    <div className={style.flagdetail}> <img src={myCountry.flag} alt='Flag img' /> </div>
                    <div className={style.info}>

                        <h2 className={style.tittle2}>Capital:</h2> <p>{myCountry.capital ? myCountry.capital : 'There is no capital'}</p>
                        <h2 className={style.tittle2}>Subregion:</h2> <p>{myCountry.subregion ? myCountry.subregion : "There is no subregion"}</p>

                        <h2 className={style.tittle2}>Population:</h2> <p>{myCountry.population}</p>
                        <h2 className={style.tittle2}>Area:</h2> <p>{myCountry.area} Km2</p>


                        <h2 className={style.tittle2}>Activities:</h2>
                        {myCountry.activities && myCountry.activities.length > 0 ?
                            <div className={style.info1}>

                                {myCountry.activities.map(activity => (
                                    <div className={style.infoImg}>
                                        <p key={activity.id}>
                                            <p>{activity.name}</p>
                                            {/* <p>{activity.duration}</p> 
                                           <p>{activity.season}</p>
                                           <p>{activity.difficulty}</p> */}
                                            {/* {<img className={style.image} src={activity.image} alt={''} width="50px" heigth="50px"/>}  */}
                                        </p>{/*
                                        <button onClick={() => dispatch(deleteActivity(activity.id))} >
                                        x
                                        </button> */}
                                    </div>
                                ))}
                            </div>
                            : <p>No activities found</p>
                        }
                    </div>
                </div>
                : <p> Loading</p>
            }
            <Link to='/home'><button className={style.btn}>Volver</button></Link>
        </div>
    )
}
export default Detail