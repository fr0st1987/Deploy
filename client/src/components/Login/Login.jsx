import style from './Login.module.css';
import React from 'react';
import { useState } from 'react';
import validate from './validate';
import { Link } from 'react-router-dom';


const Login = (props) => {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })

    function handleInputChange(event) {
        const { name, value } = event.target //lo mismo usar el e.target.value
        setUserData({
            ...userData,
            [name]: value
        })

        setErrors(validate({
            ...userData,
            [name]: value
        }))
    }

    function handleSubmit() {
        props.login(userData)

    }

    return (
        <div className={style.container}>
            <form className ={style.form} onSubmit={handleSubmit}>
                <div className ={style.subcontainer}>
                    <label>Username: </label>
                    <input
                        className={errors.name && 'warning'}
                        name='username'
                        value={userData.username}
                        type='text'
                        onChange={handleInputChange}
                    />
                    <p className={style.danger}>{errors.username ? errors.username : null}</p>

                </div>

                <div>
                    <label>Password: </label>
                    <input
                        className={errors.name && 'warning'}
                        name='password'
                        value={userData.password}
                        type='password'
                        onChange={handleInputChange}
                    />
                    <p className={style.danger}>{errors.password ? errors.password : null}</p>
                </div>
                <button className= {style.btn} type='submit'>Login</button>
                <Link to='/'>
                <button className= {style.btn2}>Volver</button>
                </Link>
            </form>
        </div>
    )
}

export default Login;