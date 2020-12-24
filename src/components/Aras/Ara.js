import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
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
import AraActividadModel from "../../Models/AraActividadModel";
import {isLogged} from "../../helpers/authHelper";
import {getCatalogos} from "../../api/catalogosApi";
import {getAra, guardaAra} from "../../api/araApi";
import ModalGravedad from "./ModalGravedad";
import ModalFrecuencia from "./ModalFrecuencia";
import ModalProbabilidad from "./ModalProbabilidad";
import $ from 'jquery';

let Aras = () => {
    //|------Hooks------|//
    let {id} = useParams();
    const [control, setControl] = useGlobal('control');
    const [ara, setAra] = useState({fecha_analisis: moment().toDate()});
    const [cats, setCats] = useState({departamentos: [], trabajadores: []});
    const [control_modal, setControlModal] = useState({idx_actividad: -1, idx_riesgo: -1, tipo: null});

//|------UseEffects------|//
    useEffect(() => {
        if (isLogged()) {
            let cargar_ara = id != null;
            cargarCatalogos(cargar_ara);
        }
    }, []);

    useEffect(() => {
        control_modal.tipo == 'gravedad' && $("#modalGravedad").modal();
        control_modal.tipo == 'frecuencia' && $("#modalFrecuencia").modal();
        control_modal.tipo == 'probabilidad' && $("#modalProbabilidad").modal();
    }, [control_modal]);

//|------Funciones------|//
    //|------GUI------|//
    const agregarActividad = () => {
        setAra(produce(ara, draft => {
            if (!draft.ara_actividades)
                draft.ara_actividades = [];
            draft.ara_actividades.push(AraActividadModel)
        }));
    }
    //|------API------|//
    const cargarCatalogos = (cargar_ara) =>
        getCatalogos([
            {nombre: 'departamento', relaciones: []},
            {nombre: 'trabajadoresActivos', relaciones: ['puesto']}
        ]).then(res => {
            if (cargar_ara)
                cargarAra(id);
            setCats({
                departamentos: res.departamento.data,
                trabajadores: res.trabajadoresActivos.data,
            });

        });
    const cargarAra = (ara_id) => {
        const relaciones = ['responsable.puesto', 'departamento', 'ara_actividades.ara_riesgos'];
        getAra(ara_id, relaciones, true, false).then(res => {
            res.fecha = moment(res.fecha).toDate();
            setAra(res);
            cerrarAlert();
        }).catch(noop);
    };
    const guardarAra = () => {
        console.log(ara);
        guardaAra(ara).then(res => {
            console.log(res);
            cerrarAlert();
        }).catch(noop);
    };
    //|------Operaciones------|//

//|------DatosIniciales------|//

//|------Render------|//

    return (
        <Template>
            <Titulo titulo={trans('navbar.ara')}>
                <BotonesPrincipales agregarActividad={agregarActividad} guardarAra={guardarAra}/>
            </Titulo>
            <div className='d-flex flex-column'>
                <InfoGeneral ara={ara} setAra={setAra} cats={cats}/>
                <Actividades ara={ara} setAra={setAra} control_modal={control_modal} setControlModal={setControlModal}/>
            </div>
            <ModalGravedad ara={ara} setAra={setAra} control_modal={control_modal}/>
            <ModalFrecuencia ara={ara} setAra={setAra} control_modal={control_modal}/>
            <ModalProbabilidad ara={ara} setAra={setAra} control_modal={control_modal}/>
        </Template>
    );
}

//|------Subcomponentes------|//
const BotonesPrincipales = ({agregarActividad, guardarAra}) => <div
    className='container d-flex justify-content-between pt-1'>
    <button className='btn btn-outline-purple' onClick={() => agregarActividad()}>
        <FaPlusCircle/>
        {trans('ara.agregarActividad')}
    </button>
    <button className='btn btn-outline-success'
            onClick={() => guardarAra()}>
        <FaSave/>
        {trans('general.guardar')}
    </button>
</div>;

const InfoGeneral = ({ara, setAra, cats}) => <div className='d-flex justify-content-around'>
    <div className='d-flex flex-nowrap'>
        <span className='mx-1 font-weight-bold'>{trans('ara.fechaAnalisis')}:</span>
        <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={ara.fecha}
            className={`form-control form-control-sm w-100`}
            onChange={(e) => setAra({...ara, fecha: e})}/>
    </div>
    <div className='d-flex flex-nowrap'>
        <span className='mx-1 font-weight-bold'>{trans('ara.departamento')}:</span>
        <Select className='form-control form-control-sm w-100'
                selected={ara.departamento}
                onSelect={(e) => setAra({...ara, departamento: e})}
                options={cats.departamentos}/>
    </div>
    <div className='d-flex flex-nowrap'>
        <span className='mx-1 font-weight-bold'>{trans('ara.responsable')}:</span>
        <Select className='form-control form-control-sm w-100'
                selected={ara.responsable}
                labelKey='fullName'
                onSelect={(e) => setAra({...ara, responsable: e})}
                options={cats.trabajadores}/>
    </div>
    <div className='d-flex flex-nowrap'>
        <span className='mx-1 font-weight-bold'>{trans('ara.puesto')}:</span>
        {((ara.responsable || {}).puesto || {}).nombre}
    </div>
</div>;

export default Aras;
