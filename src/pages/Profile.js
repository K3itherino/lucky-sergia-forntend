import { useRef, useEffect, useState } from 'react';
import "./Crash.scss"
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export default function Profile(props) {

    if (!Cookies.get("auth")) {
        return <Navigate to="/landing" />
    }

    return (
        <div className={!props.sideBar ? 'crash':'crash blur'}>
        <p>{Cookies.get("auth")}</p>
    </div>
    );
}