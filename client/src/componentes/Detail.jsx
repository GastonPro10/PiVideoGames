import {React, useEffect } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../actions";


export default function Detail(props){
    const dispatch = useDispatch()



    useEffect(()=> {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    const myGame = useSelector((state) => state.detail)
   

    return(
        <div>
            {
                
                <div>
                    <h1>{myGame.name}</h1>
                    <img src={myGame.image} width= "870px" height='530px'/>
                    <h2>Release Date: {myGame.released}</h2>
                    <p>Rating: {myGame.rating}</p>
                    {myGame.description ? (
                        <div>
                            {
                                <p>
                                    {myGame.description.replace(/(<([^>]+)>)/gi, "")}
                                </p>
                            }
                        </div>

                    ):(
                        <h1>Cargando</h1>
                    )}
                    {myGame.genres ? (
                        <div>
                            {
                                <p>
                                    Genres: {myGame.genres.join(", ")}
                                </p>
                            }
                        </div>
                    ):(
                        <h1>Cargando</h1>
                    )}
                    

                    
                    <h6>Platforms: {myGame.platforms}</h6>
                </div> 
            }
            <Link to= '/home'>
                <button>Volver</button>
            </Link>
            
        </div>
    )
}