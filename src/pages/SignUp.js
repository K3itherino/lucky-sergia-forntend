import { useRef, useEffect, useState } from 'react';
import "./LogIn.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/react';


export default function SignUp(props) {

    const [credentials, setCredentials] = useState({username: "", email: "", password: ""})
    const navigate = useNavigate()
    const toast = useToast()

    function onSubmit(e) {
        e.preventDefault()

        fetch("https://luckysergia.onrender.com/api/v1/users/", 
        {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : process.env.REACT_APP_AUTH_KEY
            }
        }
        )
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((response) => {
            if (response.balance) {
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
            }
        })
    }    

    return (
    <div className="login-page">
        <form className='login-form'>
            <p className='welcome'>Welcome Back!</p>
            <div className='input-wrapper'>
                <input 
                className='input' 
                type='email' 
                placeholder='email'
                value={credentials.email}
                onChange={(e) => setCredentials(prevState => ({...prevState, email: e.target.value}))}
                />
            </div>
            <div className='input-wrapper'>
                <input 
                className='input' 
                type='text' 
                placeholder='username'
                value={credentials.username}
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
            <p className='sign-up-text'>Already got an account? Log in <Link to={"/login"}>here</Link></p>
        </form>
    </div>
    );
}