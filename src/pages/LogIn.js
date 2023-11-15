import { useRef, useEffect, useState } from 'react';
import "./LogIn.scss"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';


export default function LogIn(props) {
    
    const [credentials, setCredentials] = useState({username: "", password: ""})
    const [message, setmessage] = useState("")
    const navigate = useNavigate()
    const toast = useToast()

    const datos = {
        password: credentials.password
    }

    if (Cookies.get("auth")) {
        return <Navigate to="/" />
    }

    function onSubmit(e) {
        e.preventDefault()
        fetch("https://luckysergia.onrender.com/api/v1/users/" + credentials.username + "/login/", 
        {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : process.env.REACT_APP_AUTH_KEY
            }
        }
        )
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((response) => {
            console.log(response)
            if (response.sid !== undefined) {
                Cookies.set("auth", response.sid)
                toast({
                    title: 'Logged',
                    description: "You are logged in",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
            }
            setmessage(response.message)
        }
        )
    }   

    return (
    <div className="login-page">
        <form className='login-form'>
            <p className='welcome'>Welcome Back!</p>
            <div className='input-wrapper'>
                <input 
                className='input' 
                type='text' 
                placeholder='username'
                value={credentials.email}
                onChange={(e) => setCredentials(prevState => ({...prevState, username: e.target.value}))}
                />
            </div>
            <div className='input-wrapper'>
                <input 
                className="input" 
                type='text' 
                placeholder='password'
                value={credentials.password}
                onChange={(e) => setCredentials(prevState => ({...prevState, password: e.target.value}))}
                />
            </div>
            <button 
            className='button'
            onClick={onSubmit}
            >Log In</button>
            <p className='sign-up-text'>Haven't got an account? Sign up <Link to={"/sign-up"}>here</Link></p>
        </form>
    </div>
    );
}