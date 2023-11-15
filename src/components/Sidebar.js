import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.scss"
import { Link,  useLocation, useNavigate, useParams } from "react-router-dom";
import { faRocket, faHouse, faChevronLeft, faDice } from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

export default function Sidebar(props) {

    const [email, setEmail] = useState(null)

    useEffect(() => {
        if (Cookies.get("auth")) {
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
                setEmail(response.email)
            }
            )
        }
    }, [Cookies.get("auth")])

    const currentPage = useLocation().pathname

    if (!Cookies.get("auth")) {
        return(
            <></>
        )
    }

    function logout() {
        fetch("https://luckysergia.onrender.com/api/v1/users/" + Cookies.get("auth") +  "/logout/", 
        {
            method: "POST",
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
            Cookies.remove("auth")
        }
        )
    }

    return (
        <div className={props.sideBar ? "sidebar active-sidebar": "sidebar"}>
            <nav className="sidebar-inner" >
                <div className="title-container">
                    <h3>menu</h3>
                    <FontAwesomeIcon icon={faChevronLeft} onClick={props.setActiveSidebar}/>
                </div>
                <div className="items-container" >
                    <ul className="list">
                        <Link to="/" className={currentPage == "/" ? "active" : ""}><FontAwesomeIcon className="icon" icon={faHouse}/><p>main page</p></Link>
                        <p className="tag"></p>
                        <Link to="/crash" className={currentPage == "/crash" ? "active" : ""}>{<FontAwesomeIcon icon={faRocket}/>}<p>Crash</p></Link>
                        <Link to="/coinflip" className={currentPage == "/coinflip" ? "active" : ""}>{<FontAwesomeIcon icon={faBitcoin}/>}<p>Coin Flip</p></Link>
                        <Link to="/dice" className={currentPage == "/dice" ? "active" : ""}>{<FontAwesomeIcon icon={faDice}/>}<p>Dice</p></Link>
                    </ul>
                </div>
                <div>
                    <div className="user">
                        <p>{email}</p>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}