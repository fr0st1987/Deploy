import React from "react";
import styles from './About2.module.css';
import { FaFutbol } from 'react-icons/fa';
import ArgentinaFlag  from '../../Assets/argentinaIcon.webp';
import { MdFamilyRestroom } from 'react-icons/md';
import { GoLaw } from 'react-icons/go';
import { GiComputing } from 'react-icons/gi';
import { GrPersonalComputer } from 'react-icons/gr'


export default function About2() {
    return (
        <div className={styles.precontainer}>

        <div id='about' className={styles.container}>
            <div className={styles.front}>
                <img className={styles.image} src={require('../../Assets/WhatsApp Image 2023-02-23 at 11.58.54.jpeg')} alt="Foto de Perfil" />
                <h2 className={styles.data}>Joaquín S. Oliveira</h2>
            </div>
            <div className={styles.back}>
                <h2>{'Id: '} 1</h2>
                <h2>{'Country: '}</h2> {<img src={ArgentinaFlag} width="30px" heigth="30px" alt='' />}
                <h2>{'Job: '} </h2> {<GoLaw />}  {<GiComputing />} {<GrPersonalComputer witdh="30px" heigth="30px"/>}
                <h2>{'Activities: '}</h2> <p>{<FaFutbol />}</p> <p>🎾 </p> <p>{<MdFamilyRestroom />}</p>
                <h2>Creador de esta SPA</h2>
            </div>
        </div>
        </div>
    );
}
