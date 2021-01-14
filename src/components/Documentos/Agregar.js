import React from "react";
import {trans} from "../../services/lang.service";
import {Typeahead} from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import {FaSave, FaTrash} from "react-icons/all";
import FilesDropzone from "../Template/FilesDropzone";
import {noop} from "../../helpers/generalHelper";
import {can} from "../../services/seguridad.service";

const Agregar = ( {documento = {} , actualizarDocumento = noop , tipos_documento = [], guardarDocumento= noop} ) =>{
    return  <div className="p-2">
        <div className="card border-success p-2 ">
            <div className="d-flex justify-content-between pt-2">
                <strong className="text-nowrap pr-2">{trans('documento.tipo_documento')}</strong>
                <Typeahead id='tipo_documento' style={{width: '100%'}}
                           labelKey="nombre"
                           onChange={(tipo_documento) => actualizarDocumento('tipo_documento', tipo_documento[0])}
                           options={tipos_documento}
                           selected={documento.tipo_documento ? [documento.tipo_documento] : []}/>
            </div>
            <div className="d-flex justify-content-between pt-2">
                <strong className="text-nowrap pr-2">{trans('documento.fecha')}</strong>
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={documento.fecha}
                    className={`form-control`}
                    onChange={(e) => actualizarDocumento('fecha', e)}/>
            </div>
            <div className="d-flex justify-content-between pt-2">
                <strong className="text-nowrap pr-2">{trans('documento.adjunto')}</strong>
                {
                    ((documento.adjunto || {}).name) ?
                        <div className="d-flex justify-content-between">
                            <span>{documento.adjunto.name}</span>
                            <div className="pl-1 pr-1">
                                <button className="btn btn-sm btn-outline-danger"
                                        onClick={(e) => actualizarDocumento('adjunto', {})}>
                                    <FaTrash/></button>
                            </div>
                        </div> :
                        <FilesDropzone onChange={(e) => actualizarDocumento('adjunto', e[0])}/>
                }

            </div>
            <div>
                {
                    can("analisis.guardar_adjunto") &&
                    <button className="btn btn-outline-success w-100"
                            onClick={(e) => guardarDocumento()}
                            disabled={!documento.fecha ||  !documento.tipo_documento || !documento.adjunto || !documento.adjunto.name}>
                        <FaSave/>
                        {trans('general.guardar')}
                    </button>
                }

            </div>
        </div>
    </div>
}

export default Agregar;
