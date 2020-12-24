import React from 'react';
import {trans} from "../../services/lang.service";
import produce from "immer";
import $ from 'jquery';

const ModalGravedad = ({ara, setAra, control_modal}) => {
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
        <div className="modal fade" id="modalGravedad" role="dialog">
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
                                <th>{trans('ara.gravedad')}</th>
                                <th>{trans('ara.personas')}</th>
                                <th>{trans('ara.infraestructura')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(gravedades || []).map((gravedad, idx) => <tr key={idx}>
                                <td>
                                    <button className='btn btn-outline-purple'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                setAra(produce(ara, draft => void (draft.ara_actividades[control_modal.idx_actividad].ara_riesgos[control_modal.idx_riesgo].gravedad = gravedad.valor)));
                                            }}>
                                        {gravedad.valor}
                                    </button>
                                </td>
                                <td>{gravedad.personas}</td>
                                <td>{gravedad.infraestructura}</td>
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

export default ModalGravedad;
