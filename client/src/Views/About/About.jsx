import React from "react";
import imgJoaco from "../../Assets/WhatsApp Image 2023-02-23 at 11.58.54.jpeg";
import s from './About.module.css';
import { AiFillLinkedin, AiFillGithub, AiFillFacebook } from 'react-icons/ai';
import { FaChevronUp } from 'react-icons/fa';



function About() {
    function scrollToLanding() {
        const landing = document.getElementById("landing");
        if (landing) {
          landing.scrollIntoView({ behavior: "smooth" });
        }
      }
console.log(scrollToLanding())
    return (
        <>

            <section id="about" className={s.aboutSection}>
                <div className={s.cardsContainer}>
              
                        <FaChevronUp onClick={(e) => scrollToLanding(e)} className={s.flecha} />
                  
                    <div className={s.titulo}>Creador</div>
                    <div className={s.card}>
                        <div className={s.divImg}>
                            <img className={s.img} src={imgJoaco} alt="img" />
                        </div>
                        <h3 className={s.apodo}>JOACO</h3>
                        <h2 className={s.nombreCompleto}>Joaquín Santiago Oliveira</h2>

                        <a href="https://github.com/fr0st1987"> <AiFillGithub className={s.gitHub} icon={AiFillGithub} /> </a>

                        <a href="https://www.linkedin.com/in/joaquin-santiago-oliveira"> <AiFillLinkedin className={s.linkedin} icon={AiFillLinkedin} /> </a>

                        <a href="https://www.facebook.com/joliveira1987"> <AiFillFacebook className={s.linkedin} icon={AiFillFacebook} /> </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About;