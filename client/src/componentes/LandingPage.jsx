import React from 'react';
import { Link } from 'react-router-dom';
import "../estilos/LandingPage.css"

export default function LandingPage(){
    return(
        <div className='myButton'>
            
            <Link to = '/home'>
                <button className='position'>INICIAR</button>
            </Link>
        </div>
    )
}
