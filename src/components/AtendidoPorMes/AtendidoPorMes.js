import React, {useEffect, useState} from "react";
import Template from "../Template/Template";
import {useGlobal} from "reactn";
import moment from "moment";
import {getCatalogos} from "../../api/catalogosApi";

const  AtendidoPorMes = () =>{
    const [control, setControl] = useGlobal('control');
    const [catalogos, setCatalogos] = useState([]);
    const [bita, setBita] = useState({fecha: moment().toDate()});

    useEffect(() => {
    }, []);


    const  consultarCatalogos = () => {
        getCatalogos([{nombre:'departamento'}]).then( res => {

        })
    };


    return <Template>

    </Template>
};

export default AtendidoPorMes;
