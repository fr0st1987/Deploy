import Card from '../Card/Card';
import style from './CardsContainer.module.css';

//renderiza el component card 
// con la data que necesito
const CardsContainer = ({ currentCountry }) => {

    return (
        <div className={style.container}>
            {currentCountry.map(c => (
                <div key={c.id}>
                    <Card name={c.name} flag={c.flag} continents={c.continents} id={c.id} />
                </div>
            ))}
        </div>)
}
export default CardsContainer