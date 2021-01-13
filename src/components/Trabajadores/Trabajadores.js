import React, {useState} from 'react';
import {useGlobal} from "reactn";
import Titulo from "../Template/Titulo";
import {trans} from "../../services/lang.service";
import Template from "../Template/Template";


const Trabajadores = () => {
//|------Hooks------|//
    const [control, setControl] = useGlobal('control');
    const [trabajadores, setTrabajadores] = useState([]);

//|------Funciones------|//
    //|------API-------|//

    return (<Template >
        <div className='d-flex flex-column'>
            <div className="container"><Titulo titulo={trans('navbar.trabajadores')}/></div>

        </div>
    </Template>);
};

export default Trabajadores;
