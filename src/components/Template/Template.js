import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import SinSesion from "./SinSesion";
import {isLogged} from "../../helpers/authHelper";

function Template(props) {
    return (
        <div>
            <Navbar/>
            {isLogged() ? props.children : <SinSesion/>}
            <Footer/>
        </div>
    );
}

export default Template;
