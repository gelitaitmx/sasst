import React from 'react';
import {FaClock, FaUserClock} from "react-icons/all";
import Template from "./Template";

//|------Render------|//
 let EnConstruccion = ()=> {
    return (
        <Template >
            <h1><FaClock/>Sección en construcción <FaUserClock/></h1>
        </Template>

    );
}

export default EnConstruccion;
