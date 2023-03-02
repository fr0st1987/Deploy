import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountriesByName } from '../../redux/actions';
import { FcSearch } from 'react-icons/fc'
import { AiOutlineHome } from 'react-icons/ai'


const NavBar = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);

    }
    const handleButtonChange = (e) => {
        e.preventDefault();
        dispatch(getCountriesByName(name))
        setName('');

    }

    const handleLinkClick = (e) => {
        setName('');
    }

    return (
        <div >
            <nav className={style.navbar}>
                <Link to='/home' onClick={(e) => handleLinkClick(e)} className={style.logo}> {<AiOutlineHome />} </Link>
                <Link to='/activities' onClick={(e) => handleLinkClick(e)} className = {style.link}> Create Activity </Link>
                <Link to='/favorites' onClick={(e) => handleLinkClick(e)} className = {style.link}> Favorites </Link>
                <Link to='/about2' onClick={(e) => handleLinkClick(e)} className = {style.link}> About me </Link>
      
                {props.logOut? <Link to='/' onClick={props.logOut} className = {style.link}> Log out </Link>: null}
                
                
                
                <div className={style.search}>
                    <input
                        type='text'
                        placeholder='Search...'
                        onChange={(e) => handleInputChange(e)}
                        value={name}
                    />
                        <button onClick={(e) => handleButtonChange(e)} type='submit'>
                            {<FcSearch />}
                        </button>
                    </div>
            </nav>
        </div>
    );
};




export default NavBar