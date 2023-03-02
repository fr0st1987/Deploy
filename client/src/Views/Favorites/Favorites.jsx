import React from 'react';
import Card from '../../components/Card/Card';
import { useSelector } from 'react-redux';
import style from './Favorites.module.css'



const Favorites = () => {
    const favorites = useSelector(state => state.myFavorites)
    console.log(favorites)
    return (

        
            <div className={style.container}>
                {favorites.map((favorite) => (
                    <div key={favorite.id} className={style.card}>
                        <Card name={favorite.name} flag={favorite.flag} continents={favorite.continents} id={favorite.id} />
                    </div>
                ))}
            </div>


    )
}

export default Favorites