import { useRef, useEffect, useState } from 'react';
import "./CoinFlip.scss"
import tails from "./descarga-removebg-preview.png"
import heads from "./descarga__1_-removebg-preview.png"
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { UseSpringsProps, animated, useSpring } from 'react-spring';

export default function Crash(props) {

    const coinPossibilites = [heads, tails]
    const [crashNumberResult, setCrashNumberResult] = useState(0)
    const [betAmount, setBetAmount] = useState()
    const [crashNumber, setCrashNumber] = useState()
    const [statemessage, setStatemessage] = useState()
    const [error, setError] = useState()
    const [hide, setHide] = useState(false)
    const toast = useToast()

    console.log(crashNumberResult)
   function Number({ n }) {
    console.log(n)
    const { number } = useSpring({
        from: {number: 0},
        number: n,
        delay: 2000,
        config: {mass: 1, tension: 20, friction: 10}
    })
    return <animated.div>{number.to((n) => n.toFixed(2))}</animated.div>
   }
    function betCrash(e) {
        if (betAmount > 4) {
            const datos = {
                bet: parseInt(betAmount),
                sid: Cookies.get("auth"),
                multiplier: parseInt(crashNumber),
            }
            console.log(datos)
                setError("")
                fetch("https://luckysergia.onrender.com/api/v1/games/crash/", {
                    method: "POST",
                    body: JSON.stringify(datos),
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : process.env.REACT_APP_AUTH_KEY
                    }
                })
                .then((res) => res.json())
                .catch((error) => console.log(error))
                .then((response) => {
                    if (response.state = true && response.balance != undefined) {
                        setTimeout(() => {
                            toast({
                                title: 'You Won!',
                                description: "Your balance is now: " + response.balance,
                                status: 'success',
                                position: "top",
                                duration: 9000,
                                isClosable: true,
                              })
                            
                          }, 4000);
    
                    } else if (response.state = false && response.balance != undefined) {
                        setTimeout(() => {
                            toast({
                                title: 'You Lost!',
                                description: "Your balance is now: " + response.balance,
                                status: 'error',
                                position: "top",
                                duration: 9000,
                                isClosable: true,
                              })
                            
                          }, 4000);
                    }
                    if (response.message) {
                        setError(response.message)
                    }
                    if (response.balance > 0) {
                        setCrashNumberResult(response.result)
                        setHide(true)
                        setTimeout(() => {
                            props.setBalance(response.balance)
                            setHide(false)
                          }, 4000);
                    }
                })
        }

    }

    if (!Cookies.get("auth")) {
        return <Navigate to="/landing" />
    }

    return (
        <div className={!props.sideBar ? 'crash':'crash blur'}>
            <h3 className='title'>Crash</h3>
            <div className='crash-container'>
                {statemessage && <div className='state-message' style={statemessage == "You Won!" ? {backgroundColor: "green"}:{backgroundColor: "red"}}>{statemessage}</div>}
                <div className='crash-num-result'><p>{crashNumberResult ? <Number n={crashNumberResult}/>: "0"}  x</p></div>
                <div className={error ? "number-field error" : "number-field"}>
                    <input type="number" onChange={(e) => setBetAmount(prevState => e.target.value)} value={betAmount} placeholder='Amount to bet...'/>
                    {error && <p>{error}</p>}
                </div>
                <p className='x'>x</p>
                <div className={error ? "number-field error" : "number-field"}>
                    <input type="number crash-num" onChange={(e) => setCrashNumber(prevState => e.target.value)} value={crashNumber} placeholder='Number'/>
                </div>
                {hide ? <></> : <button className='play-button a' onClick={betCrash} >Bet</button>}
                
            </div>
        </div>
    );
}