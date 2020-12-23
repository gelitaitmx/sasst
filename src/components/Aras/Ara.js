import React, {useEffect, useState} from 'react';
import Template from "../Template/Template";
import {noop} from "../../helpers/generalHelper";
import {useGlobal} from 'reactn';
import {trans} from "../../services/lang.service";
import {FaPlusCircle, FaSave} from "react-icons/all";
import DatePicker from "react-datepicker";
import moment from "moment";
import Select from "../Template/Select";
import {cerrarAlert} from "../../helpers/swalHelper";
import Titulo from "../Template/Titulo";
import Actividades from "./Actividades";
import produce from "immer";

let Aras = () => {
    //|------Hooks------|//
    const [control, setControl] = useGlobal('control');
    const [ara, setAra] = useState({fecha_analisis: moment().toDate()});

//|------UseEffects------|//

//|------Funciones------|//
    //|------GUI------|//
    const agregarActividad = () => {
        setAra(produce(ara, draft => {
            if (!draft.ara_actividades)
                draft.ara_actividades = [];
            draft.ara_actividades.push({})
        }));
    }
    //|------API------|//
    //|------Operaciones------|//

//|------DatosIniciales------|//

//|------Render------|//

    return (
        <Template>
            <Titulo titulo={trans('navbar.ara')}>
                <BotonesPrincipales agregarActividad={agregarActividad}/>
            </Titulo>
            <div className='d-flex flex-column'>
                <InfoGeneral ara={ara} setAra={setAra}/>
                <Actividades ara={ara} setAra={setAra}/>
            </div>
        </Template>
    );
}

//|------Subcomponentes------|//
const BotonesPrincipales = ({agregarActividad}) => <div className='container d-flex justify-content-between pt-1'>
    <button className='btn btn-outline-purple' onClick={() => agregarActividad()}>
        <FaPlusCircle/>
        {trans('ara.agregarActividad')}
    </button>
    <button className='btn btn-outline-success'>
        <FaSave/>
        {trans('general.guardar')}
    </button>
</div>;

const InfoGeneral = ({ara, setAra}) => <div className='d-flex justify-content-around'>
    <div className='d-flex flex-nowrap'>
        <span className='mx-1 font-weight-bold'>{trans('ara.fechaAnalisis')}:</span>
        <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={ara.fecha_analisis}
            className={`form-control form-control-sm w-100`}
            onChange={(e) => setAra({...ara, fecha_analisis: e})}/>
    </div>
    <div className='d-flex flex-nowrap'>
        <span className='mx-1 font-weight-bold'>{trans('ara.puesto')}:</span>
        <Select className='form-control form-control-sm w-100'/>
    </div>
    <div className='d-flex flex-nowrap'>
        <span className='mx-1 font-weight-bold'>{trans('ara.departamento')}:</span>
        <Select className='form-control form-control-sm w-100'/>
    </div>
    <div className='d-flex flex-nowrap'>
        <span className='mx-1 font-weight-bold'>{trans('ara.responsable')}:</span>
        <Select className='form-control form-control-sm w-100'/>
    </div>
</div>;

export default Aras;
