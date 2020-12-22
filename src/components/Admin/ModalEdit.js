import React, {useState} from "react";
import Llenado from "../Hallazgos/Llenado";
import {CLAVEINICIO, CLAVERIESGO} from "../../helpers/hallazgoHelper";
import Detalle from "../Hallazgos/Detalle";

const ModalEdit = ({hallazgo, cats}) => {
    const [editable, setEditable] = useState('');
    const a = () => {
    };

    const actualizaEditable = (valor) => {
        setEditable(valor);
    };
    return <div className="modal fade" id="ModalEdit" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Hallazgo</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">

                    <Detalle hallazgo={hallazgo} onClick={a} actualizaEditable={actualizaEditable}/>
                    {
                        editable &&
                        <Llenado hallazgo={hallazgo} actualizarHallazgo={a} cats={cats} trabajadores_activos={[]}
                                 editable={editable} actualizaEditable={actualizaEditable}/>
                    }

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
};

export default ModalEdit;
