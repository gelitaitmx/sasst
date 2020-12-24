import React from "react";
import produce from "immer";
import {FaRegCheckSquare, FaRegSquare, FaTrash} from "react-icons/all";
import {trans} from "../../services/lang.service";

const Riesgo = ({ara, setAra, riesgo, idx_actividad, idx_riesgo, control_modal, setControlModal}) => {
    const getNivelRiesgo = () => riesgo.gravedad + riesgo.frecuencia + riesgo.probabilidad;
    const getColorRiesgo = () => {
        if (getNivelRiesgo() <= 3)
            return 'table-success';
        if (getNivelRiesgo() < 7)
            return 'table-warning';
        return 'table-danger';
    };

    return (
        <React.Fragment>
            <td>
        <textarea className='form-control form-control-sm'
                  value={riesgo.descripcion || ''}
                  onChange={(e) => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].descripcion = e.target.value)))}></textarea>
            </td>
            <td>
                <button className='btn btn-outline-purple'
                        onClick={() => setControlModal({idx_actividad, idx_riesgo, tipo: 'gravedad'})}>
                    {riesgo.gravedad}
                </button>
            </td>
            <td>
                <button className='btn btn-outline-purple'
                        onClick={() => setControlModal({idx_actividad, idx_riesgo, tipo: 'frecuencia'})}>
                    {riesgo.frecuencia}
                </button>
            </td>
            <td>
                <button className='btn btn-outline-purple'
                        onClick={() => setControlModal({idx_actividad, idx_riesgo, tipo: 'probabilidad'})}>
                    {riesgo.probabilidad}
                </button>
            </td>
            <td className={getColorRiesgo()}>
                {getNivelRiesgo()}
            </td>
            <td>
                {riesgo.requiere_procedimiento ?
                    <FaRegCheckSquare className='cursor' size={30} color='blue'
                                      onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_procedimiento = false)))}/> :
                    <FaRegSquare className='cursor' size={30} color='blue'
                                 onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_procedimiento = true)))}/>}
            </td>
            <td>
                {riesgo.requiere_epp ?
                    <FaRegCheckSquare className='cursor' size={30} color='blue'
                                      onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_epp = false)))}/> :
                    <FaRegSquare className='cursor' size={30} color='blue'
                                 onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_epp = true)))}/>}
            </td>
            <td>
                {riesgo.requiere_preparacion ?
                    <FaRegCheckSquare className='cursor' size={30} color='blue'
                                      onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_preparacion = false)))}/> :
                    <FaRegSquare className='cursor' size={30} color='blue'
                                 onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_preparacion = true)))}/>}
            </td>
            <td>
                {riesgo.requiere_capacitacion ?
                    <FaRegCheckSquare className='cursor' size={30} color='blue'
                                      onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_capacitacion = false)))}/> :
                    <FaRegSquare className='cursor' size={30} color='blue'
                                 onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_capacitacion = true)))}/>}
            </td>
            <td>
                {riesgo.requiere_reglas ?
                    <FaRegCheckSquare className='cursor' size={30} color='blue'
                                      onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_reglas = false)))}/> :
                    <FaRegSquare className='cursor' size={30} color='blue'
                                 onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_reglas = true)))}/>}
            </td>
            <td>
                {riesgo.requiere_evaluacion ?
                    <FaRegCheckSquare className='cursor' size={30} color='blue'
                                      onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_evaluacion = false)))}/> :
                    <FaRegSquare className='cursor' size={30} color='blue'
                                 onClick={() => setAra(produce(ara, draft => void (draft.ara_actividades[idx_actividad].ara_riesgos[idx_riesgo].requiere_evaluacion = true)))}/>}
            </td>
            <td>
                <button className='btn btn-outline-danger'
                        onClick={()=>setAra(produce(ara, draft=>void(draft.ara_actividades[idx_actividad].ara_riesgos.splice(idx_riesgo, 1))))}>
                    <FaTrash/> {trans('ara.riesgo')}
                </button>
            </td>

        </React.Fragment>
    );
}

export default Riesgo;
