import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGame } from "../actions";

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(g){
        g.preventDefault()
        setName(g.target.value)
    }

    function handleSubmit(g){
        g.preventDefault()
        dispatch(getNameGame(name))
    }

    return (
        <div>
            <input
                type = "text"
                placeholder="Buscar..."
                onChange={(g) => handleInputChange(g)}
            />
            <button type="submit" onClick={(g) => handleSubmit(g)}>Buscar</button>
        </div>
    )
}