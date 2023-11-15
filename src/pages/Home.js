import { useRef, useEffect, useState } from 'react';
import "./Home.scss"
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Home(props) {

    if (!Cookies.get("auth")) {
        return <Navigate to="/landing" />
    }
    else {
        
        return (
            <div className={!props.sideBar ? 'home':'home blur'}>
            <h2>Welcome to Lucky Sergia!</h2>
        </div>
        );
    }
}