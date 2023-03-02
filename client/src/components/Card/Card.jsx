import style from './Card.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFavorites, addFavorites } from '../../redux/actions'

const Card = (props) => {
    const favorites = useSelector(state => state.myFavorites);
    const dispatch = useDispatch();
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        favorites.forEach((fav) => {
            if (fav.id === props.id) {
                setIsFav(true);
            }
        });
    }, [favorites, props.id]);

    const handleFavorite = () => {
        if (isFav) {
            dispatch(deleteFavorites(props.id));
            setIsFav(false);
        } else {
            dispatch(addFavorites({ id: props.id, name: props.name, flag: props.flag, continents: props.continents }));
            setIsFav(true);
        }
    };
    console.log(favorites)
    return (
        <div className={style.container}>
            <div className={style.card}>
                    {isFav ? (
                        <button className={style.btnFav} onClick={handleFavorite}>❤️</button>
                    ) : (
                        <button className={style.btnFav} onClick={handleFavorite}>🤍</button>
                    )
                    }
                <h2>{props.name}</h2>
                <p><img src={props.flag} alt='Flag' /></p>
                <h3>{props.continents}</h3>
                <Link to={`/home/${props.id}`} className="linkCard">
                    <button className={style.btnDetails}> More details</button>
                </Link>
            </div>
        </div>
    )
}

export default Card