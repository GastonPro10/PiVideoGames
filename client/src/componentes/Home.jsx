import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { filterGamesByGenre, getGames, filterCreated, orderByName } from "../actions";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Card from "./Card";
import Paginado from "./Paginado";
import "../estilos/Home.css"
import SearchBar from "./SearchBar";


export default function Home () {

    const dispatch = useDispatch()
    const allGames = useSelector ((state) => state.games)

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [currentPage,setCurrentPage] = useState(1); 
    const [gamesPorPage, setGamesPorPage] = useState(15) // cuantos games por pagina
    const [orden, setOrden] = useState("")
    const indexOfLastGame = currentPage * gamesPorPage
    const indexOfFirstGame = indexOfLastGame - gamesPorPage
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)  

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getGames());
    }, [dispatch]) // no genero un bucle
    

    function handleClick(g){
        g.preventDefault(); // previene que no se rompa al recargar
        dispatch(getGames());
    }

    function handleFilterGenres(g){
        dispatch(filterGamesByGenre(g.target.value))
    }

    function handleFilterCreated(g){
        dispatch(filterCreated(g.target.value))
    }

    function handleSort (g) {
        g.preventDefault();
        dispatch(orderByName(g.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${g.target.value}`)
    }

    return (

        <div className="contenedor fondo">
            <Link to= '/'>Intro</Link>
            <Link to= '/videogame'>Crear Videojogo</Link>
            <h1>AguanteVideogame</h1>
            <button onClick={g => {handleClick(g)}}>
                Refrescar Juegos
            </button>
            <div>
                <select onChange={g => handleSort(g)}>
                    <option value = 'All'>Filtrar por ...</option>
                    <option value = 'asc'>Ascendente</option>
                    <option value = "desc">Descendente</option>
                </select>
                <select onChange={g => handleFilterGenres(g)}>
                    <option value = "All">Todos</option>
                    <option value ='Action'>Action</option>
                    <option value = "Indie">Indie</option>
                    <option value = "Adventure">Adventure</option>
                    <option value = "RPG">RPG</option>
                    <option value = "Strategy">Strategy</option>
                    <option value = "Shooter">Shooter</option>
                    <option value = "Casual">Casual</option>
                    <option value = "Simulation">Simulation</option>
                    <option value = "Puzzle">Puzzle</option>
                    <option value = "Arcade">Arcade</option>
                    <option value = "Platformer">Platformer</option>
                    <option value = "Racing">Racing</option>
                    <option value = "Massively Multiplayer">Massively Multiplayer</option>
                    <option value = "Sports">Sports</option>
                    <option value = "Fighting">Fighting</option>
                    <option value = "Family">Family</option>
                    <option value = "Board Games">Board Games</option>
                    <option value = "Educational">Educational</option>
                    <option value = "Card">Card</option>
                </select>
                <select onChange={g => handleFilterCreated(g)}>
                    <option value = 'All'>Todos</option>
                    <option value = 'Created'>Creado</option>
                    <option value = 'Api'>Existente</option>
                </select>
                <Paginado
                gamesPorPage={gamesPorPage}
                allGames = {allGames.length}
                paginado = {paginado}
                />
                <SearchBar/>
                {loading && <Loading/>}
                {currentGames?.map((g) => {
                    return (
                        <Link to= {"/videogame/" + g.id}>
                            <Card name={g.name} image={g.image} genre={g.genres} rating={g.rating} key= {g.id}/>
                        </Link>
                    )
                })}
            </div>
        </div>
    )

}