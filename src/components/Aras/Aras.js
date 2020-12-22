import React, {useEffect, useState} from 'react';
import Template from "../Template/Template";
import {noop} from "../../helpers/generalHelper";
import {useGlobal} from 'reactn';
import {trans} from "../../services/lang.service";
import {FaInfo} from "react-icons/all";
import moment from "moment";
import {cerrarAlert} from "../../helpers/swalHelper";
import Listado from "./Listado";
import {consulta} from "../../api/araApi";
import Titulo from "../Template/Titulo";

let Aras = () => {
    //|------Hooks------|//
    const [control, setControl] = useGlobal('control');
    const [fecha_inicio, setFechaInicio] = useState(moment().startOf('year').toDate());
    const [fecha_fin, setFechaFin] = useState(moment().endOf('year').toDate());
    const [aras, setAras] = useState([]);

//|------UseEffects------|//
    useEffect(() => consultar(), []);

//|------Funciones------|//
    //|------GUI------|//
    const consultar = () => {
        const relaciones = [
            'ara_actividades.ara_riesgos',
            'departamento',
            'responsable'
        ];
        consulta({fecha_inicio, fecha_fin}, relaciones).then(res => {
            setAras(res);
            cerrarAlert();
        }).catch(noop);
    }
    //|------API------|//
    //|------Operaciones------|//

//|------DatosIniciales------|//

//|------Render------|//

    return (
        <Template>
            <Titulo titulo={trans('navbar.ara')}/>
            <div className='d-flex justify-content-center '>
                <Instrucciones/>
                <Listado aras_all={aras}  fecha_inicio={fecha_inicio} fecha_fin={fecha_fin}
                         setFechaInicio={setFechaInicio} setFechaFin={setFechaFin}/>
            </div>
        </Template>
    );
}

//|------Subcomponentes------|//
let Instrucciones = () => <div className='d-flex flex-column mx-5 col-2'>
    <div className='py-3'>
        <button className='btn btn-outline-purple'>{trans('ara.agregarInventario')}</button>
    </div>
    <div className='py-2 px-2 alert alert-info'><FaInfo/> {trans('ara.insAra')}</div>
</div>;


export default Aras;
