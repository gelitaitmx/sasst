import React from "react";
import Acciones from "./Acciones";

const ModalAcciones = ({acciones, guardarAccionCorrectiva}) => {
    return <div className="modal fade" id="ModalAcciones" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Acciones</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                    <Acciones acciones={acciones}  guardarAccionCorrectiva={guardarAccionCorrectiva} ></Acciones>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
};

export default ModalAcciones;
