import { useRef, useEffect, useState } from 'react';
import "./Landing.scss"
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Landing(props) {

    return (
    <div className={!props.sideBar ? 'landing':'landing blur'}>
        <div className='title-wrapper'>
            <h2>Welcome to Lucky Sergia!</h2>
            <p>Looks like it's your lucky day!</p>
        </div>
        <div className='buttons-wrapper'>
            {!Cookies.get("auth") ? 
            <>       
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Signup</Link>
            </>     
            :
            <Link to="/">Play!</Link>
            }
        </div>
        <p>Welcome to LuckySergia, your premier online betting destination where the excitement never sleeps! Immerse yourself in a unique experience filled with opportunities for luck and fun.</p>
    </div>
    );
}