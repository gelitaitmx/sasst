import React from 'react';
import { useGlobal } from 'reactn';
import Template from "./Template";
import ImgHome from "../../img/home.jpg";
import {trans} from "../../services/lang.service";
import Titulo from "./Titulo";


const Home = () => {
    const [control, setControl] = useGlobal('control');
    return (
        <Template >
            <div className="container">
                <Titulo titulo={trans('anavbar.bienvenido')}/>
                <div  className="text-center ">

                </div>

            </div>
        </Template>
    )
};



export default Home;
