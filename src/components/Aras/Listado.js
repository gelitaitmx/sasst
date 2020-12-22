import React, {useEffect, useState} from 'react';
import moment from "moment";
import {trans} from "../../services/lang.service";
import filtrarArreglo from "../../helpers/filterHelper";
import DatePicker from "react-datepicker";
import {FaTrash, FaDownload} from "react-icons/all";
import {useHistory} from 'react-router-dom';


const Listado = ({aras_all, fecha_inicio, fecha_fin, setFechaInicio, setFechaFin}) => {
//|------Hooks------|//
    const [aras, setAras] = useState(aras_all);
    const [buscador, setBuscador] = useState({});
    const history = useHistory();


//|------UseEffects------|//
    useEffect(() => setAras(filtrarArreglo(aras_all, buscador)), [aras_all, buscador]);

//|------Funciones------|//
    const abrirAra = (ara_id) => {
        history.push(`aras/consultar/${ara_id}`)
    }

//|------Render------|//
    return (
        <div className='d-flex flex-column'>
            <div className='d-flex justify-content-around'>
                <div className='d-flex'>
                    <span className='mr-3 font-weight-bold'>{trans('general.fechaInicio')}:</span>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={fecha_inicio}
                        className={`form-control`}
                        onChange={(e) => setFechaInicio(e)}/>
                </div>
                <div className='d-flex'>
                    <span className='mr-3 font-weight-bold'>{trans('general.fechaFin')}:</span>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={fecha_fin}
                        className={`form-control`}
                        onChange={(e) => setFechaFin(e)}/>
                </div>
            </div>
            <table className="table-condensed table table-responsive table-hover mt-2">
                <thead className="table thead-dark">
                <tr>
                    <th></th>
                    <th>
                        <input className='form-control form-control-sm'
                               onChange={(e) => setBuscador({...buscador, departamento: {nombre: e.target.value}})}/>
                    </th>
                    <th>
                        <input className='form-control form-control-sm'
                               onChange={(e) => setBuscador({...buscador, responsable: {fullName: e.target.value}})}/>
                    </th>
                </tr>
                </thead>
                <thead className="table thead-dark">
                <tr>
                    <th>{trans('ara.fecha')}</th>
                    <th>{trans('ara.departamento')}</th>
                    <th>{trans('ara.responsable')}</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {(aras || []).map((ara, key) =>
                    <tr key={key} className='cursor' onClick={() => abrirAra(ara.id)}>
                        <td>{moment(ara.fecha).format('DD/MM/YYYY')}</td>
                        <td>{(ara.departamento || {}).nombre}</td>
                        <td>{(ara.responsable || {}).fullName}</td>
                        <td>
                            <button className='btn btn-sm btn-outline-purple'><FaDownload/> {trans('general.descargar')}
                            </button>
                        </td>
                        <td>
                            <button className='btn btn-sm btn-outline-danger'><FaTrash/> {trans('general.eliminar')}
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Listado;
