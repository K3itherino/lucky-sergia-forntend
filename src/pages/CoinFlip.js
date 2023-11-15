import { useRef, useEffect, useState } from 'react';
import "./CoinFlip.scss"
import tails from "./coin_flip_12.png"
import heads from "./coin_flip_11.png"
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export default function CoinFlip(props) {
    const coinPossibilites = [tails, heads]
    const [showOrHideCoin, setShowOrHideCoin] = useState(false)
    const [coinState, setCoinState] =useState(0)
    const [statemessage, setStatemessage] = useState()
    const [message, setmessage] = useState("")
    const [betAmount, setBetAmount] = useState()
    const [error, setError] = useState()
    const toast = useToast()
    console.log(coinState)

    function throwCoin(e) {
        
        const datos = {
            bet: parseInt(betAmount),
            sid: Cookies.get("auth"),
            choice: parseInt(e.target.id),
        }
            setError("")
            fetch("https://luckysergia.onrender.com/api/v1/games/coin/", {
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
                if (response.balance > props.balance && response.balance != undefined) {
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

                } else if (response.balance < props.balance && response.balance != undefined) {
                    
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
                    setmessage("Flipping...")
                    setCoinState(e.target.id == 1 ? 0:1)
                    setShowOrHideCoin(true)
                    setTimeout(() => {
                        props.setBalance(response.balance)
                        setmessage("")
                        setShowOrHideCoin(false)
                      }, 4000);
                }
            })
    }

    if (!Cookies.get("auth")) {
        return <Navigate to="/landing" />
    }

    return (
        <div className={!props.sideBar ? 'coin-flip':'coin-flip blur'}>
            <h3 className='title'>Coinflip</h3>
            <div className='coin-wrapper'>
                {statemessage && <div className='state-message' style={statemessage == "You Won!" ? {backgroundColor: "green"}:{backgroundColor: "red"}}>{statemessage}</div>}
                <div className='coin-container'>
                    <p className='flipping-message'>{message}</p>
                    <img className={showOrHideCoin ? "hide": ""} src={coinPossibilites[coinState]} />
                    <p className='coin-side'>Your bet: {!coinState == 1 ? "Tails": "Heads"}</p>
                </div>
                <div className={error ? "number-field error" : "number-field"}>
                    <input type="number" onChange={(e) => setBetAmount(prevState => e.target.value)} value={betAmount} placeholder='Amount to bet...'/>
                    {error && <p>{error}</p>}
                </div>
                {message == "" ?
                <>
                    <button className='play-button a' onClick={throwCoin} id="1" >Tails</button>
                    <button className='play-button b' onClick={throwCoin} id="0" >Heads</button>
                </>
                :
                <p className='wait-message'>Wait to play again</p>
                }

                <div>
            </div>


            </div>
        </div>
    );
}
  