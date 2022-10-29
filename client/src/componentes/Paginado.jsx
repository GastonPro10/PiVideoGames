import React from "react";
import "../estilos/Paginado.css"

export default function Paginado ({gamesPorPage, allGames, paginado}){
    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(allGames/gamesPorPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul>
                {pageNumbers && 
                pageNumbers.map(number => (
                    <li className="number" key={number}>
                        <a onClick={()=> paginado(number)}> {number} </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}