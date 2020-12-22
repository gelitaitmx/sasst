import React, {useState} from "react";

import {Typeahead} from "react-bootstrap-typeahead";
import {trans} from "../../services/lang.service";

const ModalResponsableHallazgo = ({trabajadores_activos, validarHallazgo}) => {
  const [responsable , setResponsable] = useState({fullName:''});
    return <div className="modal fade" id="ModalResponsableHallazgo" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Acciones</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                    <strong>{trans('hallazgo.seleccionaResponsable')}</strong>
                    <Typeahead id='responsable' style={{width: '100%'}}
                             //  filterBy={['fullName']}
                               labelKey="fullName"
                               onChange={(responsable) =>setResponsable(responsable[0])}
                               options={trabajadores_activos}
                               selected={responsable ? [responsable] : []}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-dismiss="modal" disabled={!responsable.id} onClick={e=>validarHallazgo(responsable)}>{trans('general.guardar')}</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
};

export default ModalResponsableHallazgo;
