import React from 'react';
import {trans} from "../../services/lang.service";
import produce from "immer";
import $ from 'jquery';

const ModalProbabilidad = ({ara, setAra, control_modal}) => {
    const probabilidades = [
        {
            valor: -1,
            descripcion: 'Menor que la probabilidad promedio de perdida, ningún caso en tres años'
        },
        {
            valor: 0,
            descripcion: 'Probabilidad promedio de perdida, ningún caso en 18 meses'
        },
        {
            valor: 1,
            descripcion: 'Mayor probabilidad promedio de perdida, se presentó perdida en el último año'
        }
    ];
    return (
        <div className="modal fade" id="modalProbabilidad" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{trans('ara.elijaGravedad')}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <table className='table '>
                            <thead>
                            <tr>
                                <th>{trans('ara.probabilidad')}</th>
                                <th>{trans('ara.descripcion')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(probabilidades || []).map((probabilidad, idx) => <tr key={idx}>
                                <td>
                                    <button className='btn btn-outline-purple'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                setAra(produce(ara, draft => void (draft.ara_actividades[control_modal.idx_actividad].ara_riesgos[control_modal.idx_riesgo].probabilidad = probabilidad.valor)));
                                            }}>
                                        {probabilidad.valor}
                                    </button>
                                </td>
                                <td>{probabilidad.descripcion}</td>
                            </tr>)}
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

export default ModalProbabilidad;
