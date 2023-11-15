import './App.scss';
import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CoinFlip from './pages/CoinFlip';
import Crash from './pages/Crash';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import Dice from './pages/Dice';

export const ThemeContext = React.createContext();

function App() {

  const [darkTheme, setDarkTheme] = useState(true)
  const [sideBar, setSideBar] = useState(false)
  const [userBalance, setUserBalance] = useState()

  function setSidebarValue() {
    console.log(sideBar)
    setSideBar(prevValue => !prevValue)
  }

  useEffect(() => {
    fetch("https://luckysergia.onrender.com/api/v1/users/" + Cookies.get("auth") + "/", 
    {
        method: "GET",
        headers: {
            "Authorization" : process.env.REACT_APP_AUTH_KEY
        }
    }
    )
    .then((res) => res.json())
    .catch((error) => console.log(error))
    .then((response) => {
        setUserBalance(response.balance)
    }
    )
}, [Cookies.get("auth")])
  
  return (
    <ThemeContext.Provider value>
      <div className="App">
          <TopBar setActiveSidebar={setSidebarValue} sideBar={sideBar}/>
          {true && <Sidebar setActiveSidebar={setSidebarValue} sideBar={sideBar}/>}
          {userBalance && <div className='balance'>{userBalance} <FontAwesomeIcon icon={faCoins} /></div>}
          <Routes>
            <Route path='/landing' element={<Landing />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/profile' element={<Profile />}/>
            <Route path='/dice' element={<Dice />} />
            <Route path='/' element={<Home sideBar={sideBar}/>} />
            <Route path='/coinflip' element={<CoinFlip balance={userBalance} setBalance={setUserBalance} sideBar={sideBar}/>} /> 
            <Route path='/crash' element={<Crash balance={userBalance} setBalance={setUserBalance} sideBar={sideBar}/>} />
          </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
