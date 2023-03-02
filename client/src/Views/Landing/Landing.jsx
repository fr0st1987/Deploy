import { Link } from 'react-router-dom';
import style from './Landing.module.css';
import { FaChevronDown } from 'react-icons/fa';
import About from '../About/About'


const Landing = () => {
    function scrollToAbout() {
        const about = document.getElementById("about");
        if (about) {
          about.scrollIntoView({ behavior: "smooth" });
        }
      }
    return (
    <>
            <section id="landing">
                <div className={style.container}>
                    <Link to='home'>
                        <button className={style.btn}> Enter </button>
                    </Link>
                    <Link to='login'>
                        <button className={style.login}> Login</button>
                    </Link>
                    <div>

                        <FaChevronDown onClick={(e) => scrollToAbout()} className={style.flecha} />

                    </div>
                </div>
            </section>
      
                <About />
          
        </>
    );
}


export default Landing;









