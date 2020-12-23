import React, {useEffect, useState} from "react";
import Llenado from "../Hallazgos/Llenado";
import {CLAVEINICIO, CLAVERIESGO} from "../../helpers/hallazgoHelper";
import Detalle from "../Hallazgos/Detalle";
import produce from "immer";
import moment from "moment";
import {guardarHallazgo} from "../../api/hallazgoApi";


const ModalEdit = ({hallazgo, cats, trabajadores_activos, guardar}) => {
    const [editable, setEditable] = useState('');
    const [hallazgoEdit, setHallazgoEdit] = useState({});

    useEffect(() => {
        if ((hallazgoEdit.consecuencia || {}).id != null && (hallazgoEdit.probabilidad || {}).id != null) {
            let niv = cats.formulas_nivel_riesgo.filter(nr => nr.consecuencia_id === hallazgoEdit.consecuencia.id && nr.probabilidad_id === hallazgoEdit.probabilidad.id);
            actualizarHallazgo('nivel_riesgo', niv[0].nivel_riesgo,CLAVERIESGO );
        }
    }, [hallazgoEdit.consecuencia, hallazgoEdit.probabilidad]);


    useEffect(() => {
        hallazgo.es_trabajador = hallazgo.trabajador_reportado_id != null ? true : false;
        setHallazgoEdit(hallazgo);
    }, [hallazgo]);

    const actualizarHallazgo = (propiedad, valor, clave) => {
        setHallazgoEdit(produce(hallazgoEdit, draft => {
            if (propiedad == 'tipo_acto' && valor != null)
                draft.tipo = valor.id;
            draft[propiedad] = valor;
        }));
        if ((valor != null && valor.id !== null || propiedad === 'es_trabajador') && propiedad != 'descripcion')
            actualizaEditable('');
    };


    const actualizaEditable = (valor) => {
        if (valor === CLAVEINICIO)
            actualizarHallazgo('fecha', moment(hallazgo.fecha).toDate());
        setEditable(valor);
    };


    return <div className="modal fade" id="modalEdit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Hallazgo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                    <div className="modal-body">

                    <Detalle hallazgo={hallazgoEdit} onClick={guardar}
                             actualizaEditable={actualizaEditable}/>
                    {
                        editable &&
                        <Llenado hallazgo={hallazgoEdit} actualizarHallazgo={actualizarHallazgo} cats={cats}
                                 trabajadores_activos={trabajadores_activos}
                                 editable={editable} actualizaEditable={actualizaEditable}/>
                    }

                </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>

};

export default ModalEdit;
