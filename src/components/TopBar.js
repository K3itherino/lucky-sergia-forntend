import { useRef, useEffect, useState } from 'react';
import "./TopBar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import luckySergia from "./Screenshot_2023-11-08_10.42.05-removebg-preview.png"

export default function TopBar(props) {
    console.log(props)
    return (
        <div className={props.sideBar ? "top-bar blur":"top-bar"}>
            <FontAwesomeIcon className='bars' icon={faBars} onClick={props.setActiveSidebar}/>
            <img src={luckySergia} />
        </div>
    );
}