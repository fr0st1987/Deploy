import style from './Form.module.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCountries, postActivity } from '../../redux/actions';
import Swal from 'sweetalert2';



export default function Form() {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries)
    const activities = useSelector(state => state.activities);
    const countriesNames = countries.map(country => { return { label: country.name, value: country.id } })
    const navigate = useNavigate();
    console.log(activities)



    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]);

    const [input, setInputData] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countryId: [],
    })

    const [errors, setErrors] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
    })

    //const [file, setFile] = useState();

    const handleInputChange = ((e) => {
        setInputData({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    )

    /* const handleInputChecked = ((e) => {
        if (e.target.checked)
            setInputData({
                ...input,
                season: e.target.value
            })
    }) */

    const handleSelect = ((e) => {
        setInputData({
            ...input,
            countryId: [...input.countryId, e.target.value],
        })
    });

    /* const handleChangeFile = ((e) => {
        setFile(e.target.files[0])
    }) */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.name && input.difficulty && input.season && input.countryId.length) {
            dispatch(postActivity(input));
            //axios.post("http://localhost:3001/activities", input)
            //     .then(res => alert(res.data))
            //     .catch(err => alert(err))
            dispatch(getAllCountries())
            try {
                await dispatch(getAllCountries()); // espera a que se complete getAllCountries
                setInputData({
                    name: "",
                    difficulty: 0,
                    duration: 0,
                    season: "",
                    countryId: [],
                    image: ''
                });
                navigate('/home');
                Swal.fire({
                    icon: 'success',
                    title: 'Well done!',
                    text: `You added a new Activity!`,
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            e.preventDefault()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `You must complete every field correctly!`,

            })
        }
    }
    const handleDelete = ((e, d) => {
        e.preventDefault();
        setInputData({
            ...input,
            countryId: input.countryId.filter((country) => country !== d),
        })
    });
    const [selectedImage, setSelectedImage] = useState(null)
    const handleImageChange = (e) => {
        const prop = e.target.name;
        const file = e.target.files[0]; // obtenemos el archivo seleccionado
        const reader = new FileReader();

        reader.onload = (event) => {
            setInputData({ ...input, [prop]: event.target.result });
            setSelectedImage(event.target.result)
        };

        reader.readAsDataURL(file)
        const preview = document.getElementById("image-preview");
        preview.src = reader.result; // leemos el archivo como una URL de datos
    };
    const validate = (input) => {
        let errors = {};

        if (!input.name) {
            errors.name = 'Must fulfill name property!';
        } else if (activities.map(activity => activity.name).some(name => name === input.name)) {
            errors.name = "That activity already exists"
        } else if (!/^[A-z]+$/.test(input.name)) {
            errors.name = 'Only letters allowed'
        }
        if (!input.difficulty || input.difficulty < 1 || input.difficulty > 5) {
            errors.difficulty = 'Must be a value between 1 and 5';
        } else if (!/^[0-9]+$/.test(input.difficulty)) {
            errors.difficulty = 'Only numbers allowed' //y que solo acepte numeros
        }
        if (!input.duration) {
            errors.duration = 'Must fulfill duration property';
        } else if (!/^[0-9]+$/.test(input.duration)) {
            errors.duration = 'Only numbers allowed' //y que solo acepte numeros
        }
        if (!input.season) {
            errors.season = 'Must fulfill season property!';
        }


        return errors;
    }



    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)} enctype="multipart/form-data">
                <h2 className={style.title}>Activity</h2>
                <div className={style.name}>
                    <label className={style.label}>Name:</label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={(e) => handleInputChange(e)}
                        className={errors.name ? style.warningName : style.inputName}
                    />
                    {<p className={style.dangerName}>{errors.name ? errors.name : null}</p>}
                </div>
                <div className={style.difficulty}>
                    <label className={style.label}>Difficulty:</label>
                    <input
                        type='number'
                        min='1'
                        max='5'
                        value={input.difficulty}
                        name='difficulty'
                        onChange={(e) => handleInputChange(e)}
                        className={errors.difficulty ? style.warningDiff : style.diff}
                    />
                    {<p className={style.dangerDiff}>{errors.difficulty ? errors.difficulty : null}</p>}
                </div>
                <div className={style.duration}>
                    <label className={style.label}>Duration:</label>
                    <input
                        type='number'
                        value={input.duration}
                        name='duration'
                        onChange={(e) => handleInputChange(e)}
                        className={errors.duration ? style.warningDura : style.dura}
                    />
                    {<p className={style.dangerDura}>{errors.duration ? errors.duration : null}</p>}
                </div>
                <div className={style.select}>

                    <span className={style.season}>Season: </span>
                    <div>
                        <input className={style.springInput} type="radio" id='spring' name='season' value='spring' onChange={(e) => handleInputChange(e)} />
                        <label className={style.spring} htmlFor='spring'>Spring  🌻</label>
                    </div>
                    <div className={style.sumerInput}>
                        <input type="radio" id='summer' name='season' value='summer' onChange={(e) => handleInputChange(e)} />
                        <label className={style.summer} htmlFor='summer'> Summer  🏖</label>
                    </div>
                    <div className={style.fallInput}>
                        <input type="radio" id='fall' name='season' value='fall' onChange={(e) => handleInputChange(e)} />
                        <label className={style.fall} htmlFor='fall'>Fall  🍂 </label>
                    </div>
                    <div className={style.winterInput}>
                        <input type="radio" id='winter' name='season' value='winter' onChange={(e) => handleInputChange(e)} />
                        <label className={style.winter} htmlFor='winter'>Winter  ❄️</label>
                    </div>


                    {<p className={style.dangerSeason}>{errors.season ? errors.season : null}</p>}
                </div>

                <div className={style.countries}>
                    <select value='countryId' onChange={(e) => handleSelect(e)}>
                        <option selected>Choose a Country</option>
                        {countriesNames.sort((a, b) => a.label.localeCompare(b.label)).map(country => {
                            return <option key={country.value} value={country.value}>{country.label}</option>
                        })}
                    </select>
                    {/*      // {<p className={style.danger}>{errors.countryId ? errors.countryId : null}</p>} */}

                </div>
                <div className={style.country}>
                    {input.countryId.filter((c, index, arr) => arr.indexOf(c) === index).map((c, index) => ( //filtro y hago un indexOf para que solo pueda coincidir 1 vez con el país que busco
                        <div key={index}>
                            <button className={style.btn3} onClick={(e) => handleDelete(e, c)}>{c} X</button>
                        </div>
                    ))}

                </div>
                <div className={style.image}>
                    <label>Image: </label>
                    <input
                        type='file'
                        accept='image/*'
                        name='image'
                        placeholder='Select an image'
                        onChange={handleImageChange} />
                </div>
                {selectedImage && (
                    <img className={style.selectedImage} src={selectedImage} alt="Selected" />
                )}




                {/* <label>Choose a picture to upload...</label>
                <input type='file' id='file' name='file' accept='image/*' multiple onChange={(e) => handleChangeFile(e)} />
 */}
                {Object.keys(errors).length ?
                    <button className={style.btnNoSubmit} type='submit' disabled>Create Activity</button> :
                    <button className={style.btnSubmit} type='submit'> Create Activity</button>}
                <Link to='/home'><button className={style.btn}>Volver</button></Link>
            </form>
        </div>)
}

