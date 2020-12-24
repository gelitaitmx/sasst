import React from 'react';
import {trans} from "../../services/lang.service";
import produce from "immer";
import $ from 'jquery';

const ModalFrecuencia = ({ara, setAra, control_modal}) => {
    const gravedades = [
        {
            valor: 0,
            personas: 'De presentarse no produce lesión o enfermedad',
            infraestructura: 'Perdidas en equipo o material, en calidad, producción u otro tipo que no exceda los $10000.00'
        },
        {
            valor: 2,
            personas: 'De presentarse la perdida puede causar lesión o enfermedad leve, sin pérdida de tiempo',
            infraestructura: 'Daño en la infraestructura, equipo o material, en calidad, producción u otro tipo, de $10,000 pero que no excedan $20,000'
        },
        {
            valor: 4,
            personas: 'De presentarse la perdida puede causar incapacidad temporal por lesión o enfermedad',
            infraestructura: 'Daño en la infraestructura, equipo o material, en calidad, producción u otro tipo, de $10,000 pero que no excedan $20,000'
        },
        {
            valor: 6,
            personas: 'De presentarse la pérdida puede causar incapacidades permanentes parcial o total, perdida de vida',
            infraestructura: 'Pérdida mayor en la infraestructura, equipo o material, en calidad, producción u otro tipo que excedan los $50,000'
        }
    ];
    return (
        <div className="modal fade" id="modalFrecuencia" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{trans('ara.eliaFrecuencia')}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <table className='table '>
                            <tbody>
                            <tr>
                                <td colSpan={2} rowSpan={2}></td>
                                <td colSpan={3} className='table-warning'>{trans('ara.vecesActividad')}</td>
                            </tr>
                            <tr>
                                <td className='table-warning'>{trans('ara.unavezAlDia')}</td>
                                <td className='table-warning'>{trans('ara.deDosACinco')}</td>
                                <td className='table-warning'>{trans('ara.masDeCinco')}</td>
                            </tr>
                            <tr>
                                <td rowSpan={3} className='table-info'>{trans('ara.personasRealizanTarea')}</td>
                                <td className='table-info'>{trans('ara.unaPersona')}</td>
                                <td>
                                    <button className='btn btn-outline-purple'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                setAra(produce(ara, draft => void (draft.ara_actividades[control_modal.idx_actividad].ara_riesgos[control_modal.idx_riesgo].frecuencia = 1)));
                                            }}>1
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-outline-purple'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                setAra(produce(ara, draft => void (draft.ara_actividades[control_modal.idx_actividad].ara_riesgos[control_modal.idx_riesgo].frecuencia = 1)));
                                            }}>1
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-outline-purple'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                setAra(produce(ara, draft => void (draft.ara_actividades[control_modal.idx_actividad].ara_riesgos[control_modal.idx_riesgo].frecuencia = 1)));
                                            }}>1
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className='table-info'>{trans('ara.dosATres')}</td>
                                <td>
                                    <button className='btn btn-outline-purple'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                setAra(produce(ara, draft => void (draft.ara_actividades[control_modal.idx_actividad].ara_riesgos[control_modal.idx_riesgo].frecuencia = 1)));
                                            }}>1
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-outline-purple'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                setAra(produce(ara, draft => void (draft.ara_actividades[control_modal.idx_actividad].ara_riesgos[control_modal.idx_riesgo].frecuencia = 2)));
                                            }}>2
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-outline-purple'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                setAra(produce(ara, draft => void (draft.ara_actividades[control_modal.idx_actividad].ara_riesgos[control_modal.idx_riesgo].frecuencia = 3)));
                                            }}>3
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className='table-info'>{trans('ara.masDeTres')}</td>
                                <td>
                                    <button className='btn btn-outline-purple'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                setAra(produce(ara, draft => void (draft.ara_actividades[control_modal.idx_actividad].ara_riesgos[control_modal.idx_riesgo].frecuencia = 1)));
                                            }}>1
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-outline-purple'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                setAra(produce(ara, draft => void (draft.ara_actividades[control_modal.idx_actividad].ara_riesgos[control_modal.idx_riesgo].frecuencia = 2)));
                                            }}>2
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-outline-purple'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                setAra(produce(ara, draft => void (draft.ara_actividades[control_modal.idx_actividad].ara_riesgos[control_modal.idx_riesgo].frecuencia = 3)));
                                            }}>3
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalFrecuencia;
