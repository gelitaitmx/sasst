import React, {useEffect, useState} from 'react';
import moment from "moment";
import {trans} from "../../services/lang.service";
import filtrarArreglo from "../../helpers/filterHelper";
import DatePicker from "react-datepicker";
import {FaPlusCircle, FaTrash} from "react-icons/all";
import {useHistory} from 'react-router-dom';
import produce from "immer";
import Select from "../Template/Select";


const Actividades = ({ara, setAra}) => {
//|------Hooks------|//

//|------UseEffects------|//

//|------Funciones------|//

//|------Render------|//
    return (
        <table className='table-header-rotated table-bordered mt-5'
               style={{borderSpacing: 0, borderCollapse: 'collapse'}}>
            <Thead/>
            <tbody>
            {(ara.ara_actividades || []).map((actividad, idx_actividad) =>
                <Actividad  key={idx_actividad}
                            ara={ara} setAra={setAra} actividad={actividad} idx_actividad={idx_actividad}/>
            )}
            </tbody>
        </table>
    );
}

//|-----Subcomponentes-------|//
const Riesgo = ({ara, setAra, riesgo, idx_actividad, idx_riesgo}) => <React.Fragment>
    <td>
        <textarea className='form-control form-control-sm'
                  value={riesgo.descripcion || ''}
                  onChange={(e) => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].descripcion = e.target.value)))}></textarea>
    </td>
    <td></td>
</React.Fragment>;


const Actividad = ({ara, setAra, actividad, idx_actividad}) => <React.Fragment>
    <tr>
        <td rowSpan={actividad.ara_riesgos.length || 1}
            style={{minWidth: '200px'}}>
            <textarea className='form-control form-control-sm '
                      value={actividad.descripcion || ''}
                      onChange={(e) => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].descripcion = e.target.value)))}></textarea>
        </td>
        <td rowSpan={actividad.ara_riesgos.length || 1}>
            <div className='d-flex flex-column text-center'>
                <Select options={[{id: 0, nombre: trans('ara.noRutinaria')}, {id: 1, nombre: trans('ara.rutinaria')}]}
                        selected={{id: actividad.es_rutinaria}}
                        onSelect={(e) => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].es_rutinaria = e.id)))}/>
                <button className='btn btn-outline-purple'>
                    <FaPlusCircle/> {trans('ara.riesgo')}
                </button>
                <button className='btn btn-outline-danger'>
                    <FaTrash/> {trans('ara.actividad')}
                </button>
            </div>
        </td>
        {
            actividad.ara_riesgos[0] != null &&
            <Riesgo ara={ara} setAra={setAra} idx_actividad={idx_actividad} idx_riesgo={0}
                    riesgo={actividad.ara_riesgos[0]}/>
        }
    </tr>
    {actividad.ara_riesgos.length > 1 && actividad.ara_riesgos.map((riesgo, idx_riesgo) =>
        idx_riesgo > 0 && <tr key={idx_riesgo}>
            <Riesgo ara={ara} setAra={setAra} idx_actividad={idx_actividad}
                    idx_riesgo={idx_riesgo} riesgo={riesgo}/>
        </tr>
    )}
</React.Fragment>;

const Thead = () => <thead>
<tr>
    <th className='text-center' colSpan={2} rowSpan={2}>{trans('ara.actividad')}</th>
    <th className='text-center'>{trans('ara.exposicionARiesgos')}</th>
    <th colSpan={4} className='table-info text-center'>{trans('ara.evaluacionRiesgo')}</th>
    <th colSpan={6} className='table-warning text-center'>{trans('ara.necesidadSST')}</th>
</tr>
<tr>
    <td className='text-center'>{trans('ara.tomarEnConsideracion')}</td>
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
