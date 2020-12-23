import React, {useEffect, useState} from 'react';
import moment from "moment";
import {trans} from "../../services/lang.service";
import filtrarArreglo from "../../helpers/filterHelper";
import DatePicker from "react-datepicker";
import {FaTrash, FaDownload} from "react-icons/all";
import {useHistory} from 'react-router-dom';


const Actividades = ({ara, setAra}) => {
//|------Hooks------|//

//|------UseEffects------|//

//|------Funciones------|//

//|------Render------|//
    return (
        <table className='table-header-rotated table-bordered mt-5'>
            <Thead/>
            <tbody>
            {(ara.ara_actividades || []).map((actividad, key) => <tr key={key}>
                <td>
                    <textarea className='form-control form-control-sm'
                    value={actividad.descripcion || ''}></textarea>
                </td>
            </tr>)}
            </tbody>
        </table>
    );
}

//|-----Subcomponentes-------|//
const Thead = () => <thead>
<tr>
    <th className='text-center' rowSpan={2}>{trans('ara.actividad')}</th>
    <th className='text-center'>{trans('ara.exposicionARiesgos')}</th>
    <th colSpan={4} className='table-info text-center'>{trans('ara.evaluacionRiesgo')}</th>
    <th colSpan={6} className='table-warning text-center'>{trans('ara.necesidadSST')}</th>
</tr>
<tr>
    <th className='text-center'>{trans('ara.tomarEnConsideracion')}</th>
    <th className='table-info rotate-45'>
        <div><span>{trans('ara.gravedad')}</span></div>
    </th>
    <th className='table-info rotate-45'>
        <div><span>{trans('ara.frecuencia')}</span></div>
    </th>
    <th className='table-info rotate-45'>
        <div><span>{trans('ara.probabilidad')}</span></div>
    </th>
    <th className='table-info rotate-45'>
        <div><span>{trans('ara.nivelRiesgo')}</span></div>
    </th>
    <th className='table-warning rotate-45'>
        <div><span>{trans('ara.procedimientoTrabajo')}</span></div>
    </th>
    <th className='table-warning rotate-45'>
        <div><span>{trans('ara.epp')}</span></div>
    </th>
    <th className='table-warning rotate-45'>
        <div><span>{trans('ara.preparacionEmergencias')}</span></div>
    </th>
    <th className='table-warning rotate-45'>
        <div><span>{trans('ara.capacitacionAdiestramiento')}</span></div>
    </th>
    <th className='table-warning rotate-45'>
        <div><span>{trans('ara.reglasEspeciales')}</span></div>
    </th>
    <th className='table-warning rotate-45'>
        <div><span>{trans('ara.evaluacionHigiene')}</span></div>
    </th>
</tr>
</thead>;

export default Actividades;
