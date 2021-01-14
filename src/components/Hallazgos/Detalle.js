import React from 'react';
import {trans} from "../../services/lang.service";
import {useGlobal} from "reactn";
import moment from "moment";
import {FaEdit, FaSave} from "react-icons/all";
import {can} from "../../services/seguridad.service";

import {
    CLAVEDEPARTAMENTO, CLAVEDESCRIPCION, CLAVEINICIO,
    CLAVELUGAR,
    CLAVEREPORTADO, CLAVERIESGO,
    CLAVERUBRO,
    CLAVETIPOACTO,
    CLAVETIPOAPLICA
} from "../../helpers/hallazgoHelper";


const Detalle = ({hallazgo, actualizaEditable, onClick}) => {

    return <div className="card border-success w-100 ">
        <div className="card-header border">
            <strong className="text-info txts_gray pt-2"> {trans("hallazgo.detalle")}</strong>
        </div>
        <div className="p-3">
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="pr-2"><strong>{trans("hallazgo.reporta")} : </strong></div>
                    <div>{(hallazgo.reporto || {}).fullName}</div>
                </div>


            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="pr-2"><strong>{trans("hallazgo.fecha")} : </strong></div>
                    <div>{moment(hallazgo.fecha).format('DD/MM/yyyy HH:mm')}</div>
                </div>
                {can("hallazgos.editar_hallazgo") &&
                <button className="btn btn-sm btn-outline-success" onClick={e => actualizaEditable(CLAVEINICIO)}>
                    <FaEdit/></button>
                }
            </div>
            {hallazgo.es_trabajador ?
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                        <div className="pr-2"><strong>{trans("hallazgo.trabajadorReportado")} : </strong></div>
                        <div>{(hallazgo.trabajador_reportado || {}).fullName}</div>
                    </div>
                    {((hallazgo.trabajador_reportado || {}).id || hallazgo.id)&&
                    <button className="btn btn-sm btn-outline-success" onClick={e => actualizaEditable(CLAVEREPORTADO)}>
                        <FaEdit/></button>
                    }
                </div> :
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                        <div className="pr-2"><strong>{trans("hallazgo.contratistaReportado")} : </strong></div>
                        <div>{(hallazgo.contratista_reportado || {}).fullName}</div>
                    </div>
                    {
                        ((hallazgo.contratista_reportado || {}).id || hallazgo.id)&&
                        <button className="btn btn-sm btn-outline-success"
                                onClick={e => actualizaEditable(CLAVEREPORTADO)}><FaEdit/></button>
                    }
                </div>
            }
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="pr-2"><strong>{trans("hallazgo.departamentoInvolucrado")} : </strong></div>
                    <div>{(hallazgo.departamento || {}).nombre}</div>
                </div>
                {
                    ((hallazgo.departamento || {}).id || hallazgo.id)&&
                    <button className="btn btn-sm btn-outline-success"
                            onClick={e => actualizaEditable(CLAVEDEPARTAMENTO)}><FaEdit/></button>
                }

            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="pr-2"><strong>{trans("hallazgo.lugar")} : </strong></div>
                    <div>{(hallazgo.lugar || {}).nombre}</div>
                </div>
                {
                    ((hallazgo.lugar || {}).id || hallazgo.id)&&
                    <button className="btn btn-sm btn-outline-success" onClick={e => actualizaEditable(CLAVELUGAR)}>
                        <FaEdit/></button>
                }

            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="pr-2"><strong>{trans("hallazgo.tipoActo")} : </strong></div>
                    {
                        hallazgo.tipo &&
                        <div>
                            {trans(`hallazgo.${hallazgo.tipo}`)}
                        </div>
                    }
                </div>
                {
                    ((hallazgo.tipo_acto || {}).id || hallazgo.id)&&
                    <button className="btn btn-sm btn-outline-success" onClick={e => actualizaEditable(CLAVETIPOACTO)}>
                        <FaEdit/></button>
                }

            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="pr-2"><strong>{trans("hallazgo.rubro")} : </strong></div>
                    <div>{(hallazgo.rubro || {}).nombre}</div>
                </div>
                {
                    ((hallazgo.rubro || {}).id || hallazgo.id)&&
                    <button className="btn btn-sm btn-outline-success" onClick={e => actualizaEditable(CLAVERUBRO)}>
                        <FaEdit/></button>
                }

            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="pr-2"><strong>{trans("hallazgo.aplica")} : </strong></div>
                    <div>{(hallazgo.tipo_aplica || {}).nombre}</div>
                </div>
                {
                    ((hallazgo.tipo_aplica || {}).id || hallazgo.id)&&
                    <button className="btn btn-sm btn-outline-success"
                            onClick={e => actualizaEditable(CLAVETIPOAPLICA)}><FaEdit/></button>
                }
            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="d-flex pr-2 flex-nowrap"><strong>{trans("hallazgo.descripcion")} : </strong></div>
                    <div>{hallazgo.descripcion}</div>
                </div>
                <div>
                {
                    (hallazgo.descripcion || hallazgo.id)&&
                    <button className="btn btn-sm btn-outline-success"
                            onClick={e => actualizaEditable(CLAVEDESCRIPCION)}><FaEdit/></button>
                }
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="d-flex pr-2 flex-nowrap"><strong>{trans("hallazgo.nivelRiesgo")} : </strong></div>
                    <div className="p-2 rounded" style={{'background' :((hallazgo || {}).nivel_riesgo|| {}).color}}>    {((hallazgo || {}).nivel_riesgo|| {}).nombre}</div>
                </div>
                <div>
                {
                    ((hallazgo.formula_nivel_riego || {}).id || hallazgo.id)&&
                    <button className="btn btn-sm btn-outline-success"
                            onClick={e => actualizaEditable(CLAVERIESGO)}><FaEdit/></button>
                }
                </div>
            </div>
            <div>

                {   can('hallazgos.guardar_hallazgo') &&
                <button className="btn btn-outline-success w-100" onClick={e => onClick(hallazgo)}>
                    <FaSave/> {trans('general.guardar')}
                </button>
                }
            </div>
        </div>
    </div>
}


export default Detalle;
