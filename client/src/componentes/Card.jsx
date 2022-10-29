import React from "react";
import "../estilos/Card.css"

export default function Card({image, name, genre, rating}) {
    var genero = genre
    
    if(genero.length === 1) {
        genero = genero.toString() 
    } else {
        genero = genero.join(" - ")
    }
    return (
        <div >
            <h2>{name}</h2>
            <p>{genero}</p>
            <img src={image} alt="img not found" width='270px' height='230px' />
            <span>{rating}</span>
        </div>
    )
}