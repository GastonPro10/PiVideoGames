import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postGame } from "../actions";
import "../estilos/GameCreate.css"


function validateGame(input) {
    let error = {};
    if (!input.name) {
        error.name = "Se requiere un Nombre"
    } else if (!input.description){
        error.description = "Descripcion esta incompleto"
    } else if (input.rating < 0 && input.rating > 10){
        error.rating = "rating debe ser mayor a 0 y menor que 10"
    }

    return error;
}

export default function GameCreate (){
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    const [error, setError] = useState({});

    const [input, setInput] = useState({
        name:"",
        description:"",
        released:"",
        rating:0,
        genre: [],
        plataforms:[]
    })

    function handleChange(g){
        setInput({
            ...input,
            [g.target.name] : g.target.value
        })
        setError(validateGame({ 
            ...input,
            [g.target.name]: g.target.value
        }))
    }

    function handleSelect(g){
        setInput({
            ...input,
            genre: [...input.genre, g.target.value]
        })
    }

    function handleSubmit(g) {
        g.preventDefault();
        console.log(input);
        dispatch(postGame(input))
        alert('Juego Creado')
        setInput({
            name:"",
            description:"",
            released:"",
            rating:0,
            genre: [],
            plataforms:[]
        })
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getGenres())
    }, []);

    return(
        <>
        <div class="main-add fondos">
            <Link to= "/home"><button>Home</button></Link>
            <h1>Crea tu video juego</h1>
            <form onSubmit={(g) => handleSubmit(g)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={input.name}
                        name= "name"
                        onChange={handleChange}
                    />
                    {error.name && (
                        <p>{error.name}</p>
                    )}
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={input.description}
                        name = "description"
                        onChange={handleChange}
                    />
                    {error.description && (
                        <p>{error.description}</p>
                    )}
                </div>
                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input
                    type="date"
                    value={input.released}
                    name = "released"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                    type="number"
                    value={input.rating}
                    name = "rating"
                    onChange={handleChange}
                    />
                    {error.rating && (
                        <p>{error.rating}</p>
                    )}
                </div>
                <select onChange={(g) => handleSelect(g)}>
                    {genres.map((gen) => (
                        <option value = {gen.name}>{gen.name}</option>
                    ))}
                </select>
                <ul><li>{input.genre.map(g => g )}</li></ul>
                <button type='submit'>Crear Juego</button>
            </form>
        </div>
        </>
    )
}