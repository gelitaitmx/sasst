import React from 'react';
import {useGlobal} from "reactn";
import Titulo from "../Template/Titulo";
import {trans} from "../../services/lang.service";
import Listado from "../Aras/Listado";
import Template from "../Template/Template";
import PanelUltimos5 from "./PanelUltimos5";
import Piramide from "./Piramide";
import Video from "./Video";
import MasHallazgos from "./MasHallazgos";

const Home = () => {
    //|------Hooks------|//
    const [control, setControl] = useGlobal('control');

    return (<Template >
        <div className='d-flex flex-column'>
            <div className="container"><Titulo titulo={trans('navbar.bienvenido')}/></div>
        </div>
        <div className='row'>
            <PanelUltimos5/>
            <Piramide/>
            <Video/>
        </div>
        <div className='row'>
            <MasHallazgos/>
        </div>
    </Template>);
};

export default Home;
