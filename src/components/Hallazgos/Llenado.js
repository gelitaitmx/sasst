import React from "react";
import {
    CLAVEDEPARTAMENTO, CLAVEDESCRIPCION,
    CLAVEINICIO,
    CLAVELUGAR,
    CLAVEREPORTADO, CLAVERIESGO,
    CLAVERUBRO,
    CLAVETIPOACTO, CLAVETIPOAPLICA
} from "../../helpers/hallazgoHelper";
import {trans} from "../../services/lang.service";
import {can} from "../../services/seguridad.service";
import {Typeahead} from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import Select from "../Template/Select";


const Llenado = ({hallazgo, actualizarHallazgo, cats,trabajadores_activos ,actualizaEditable, editable}) =>{
    return  <div className="card border-primary p-2 text-center">
        {
            editable == CLAVEINICIO &&
            <div>
                <div className="d-flex flex-column">
                    <span>{trans("hallazgo.reporta")}</span>
                    {
                        can('editar_reporto') ?
                            <Typeahead id='trabajador_reportado' style={{width: '100%'}}
                                       filterBy={['fullName']}
                                       labelKey="fullName"
                                       onChange={(reporto) => actualizarHallazgo('trabajador_reportado', reporto[0], CLAVEINICIO)}
                                       options={trabajadores_activos}
                                       selected={hallazgo.reporto ? [hallazgo.reporto] : []}/> :
                            <span>
                                                {hallazgo.reporto.fullName}
                                            </span>
                    }
                </div>
                <div className="d-flex flex-column">
                    <span>{trans("hallazgo.fecha")}</span>
                    <DatePicker
                        dateFormat="dd/MM/yyyy HH:mm"
                        selected={hallazgo.fecha}
                        showTimeSelect
                        timeIntervals={'1'}
                        timeCaption="Hora"
                        popperPlacement={'rigth'}
                        className={`form-control w-100`}
                        onChange={(e) => actualizarHallazgo('fecha', e, CLAVEINICIO)}/>
                </div>


                <div className="d-flex flex-column">
                    <span>{trans("hallazgo.AQuienReporta")}</span>
                    <div className="btn-group">
                        <button
                            className={`btn ${hallazgo.es_trabajador && hallazgo.es_trabajador != null ? ' btn-success' : 'btn-outline-success'}`}
                            onClick={e => actualizarHallazgo('es_trabajador', true, CLAVEREPORTADO)}> {trans('hallazgo.empleado')}</button>
                        <button
                            className={`btn ${!hallazgo.es_trabajador && hallazgo.es_trabajador != null ? ' btn-success' : 'btn-outline-success'}`}
                            onClick={e => actualizarHallazgo('es_trabajador', false, CLAVEREPORTADO)}>{trans('hallazgo.contratista')}</button>
                    </div>
                </div>
            </div>
        }
        {
            editable == CLAVEREPORTADO &&
            <div className="d-flex flex-column">
                <span>{trans("hallazgo.instruccionReportado")}</span>
                {
                    hallazgo.es_trabajador ?
                        <div>
                            <Typeahead id='trabajador_reportado' style={{width: '100%'}}
                                       filterBy={['fullName']}
                                       labelKey="fullName"
                                       onChange={(trabajador_reportado) => actualizarHallazgo('trabajador_reportado', trabajador_reportado[0], CLAVEDEPARTAMENTO)}
                                       options={trabajadores_activos}
                                       selected={hallazgo.trabajador_reportado ? [hallazgo.trabajador_reportado] : []}/>

                        </div> :
                        <div>
                            <Typeahead id='contratista_reportado'
                                       style={{width: '100%'}}
                                       filterBy={['nombre']}
                                       labelKey="nombre"
                                       onChange={(contratista_reportado) => actualizarHallazgo('contratista_reportado', contratista_reportado[0], CLAVEDEPARTAMENTO)}
                                       options={cats.contratistas}
                                       selected={hallazgo.contratista_reportado ? [hallazgo.contratista_reportado] : []}/>
                        </div>
                }
            </div>
        }
        {
            editable == CLAVEDEPARTAMENTO &&
            <div className="d-flex flex-column">
                <span>{trans("hallazgo.instruccionDepartamento")}</span>
                <Typeahead id='departamentos' style={{width: '100%'}}
                           filterBy={['nombre']}
                           labelKey="nombre"
                           onChange={(departamento) => actualizarHallazgo('departamento', departamento[0], CLAVELUGAR)}
                           options={cats.departamentos}
                           selected={hallazgo.departamento ? [hallazgo.departamento] : []}/>
            </div>
        }
        {
            editable == CLAVELUGAR &&
            <div className="d-flex flex-column">
                <span>{trans("hallazgo.instruccionLugar")}</span>
                <Typeahead id='lugar' style={{width: '100%'}}
                           filterBy={['nombre']}
                           labelKey="nombre"
                           onChange={(lugar) => actualizarHallazgo('lugar', lugar[0], CLAVETIPOACTO)}
                           options={cats.lugares}
                           selected={hallazgo.lugar ? [hallazgo.lugar] : []}/>
            </div>
        }
        {
            editable == CLAVETIPOACTO &&
            <div className="d-flex flex-column">
                <span>{trans("hallazgo.instruccionTipoActo")}</span>
                <Typeahead id='tipo_acto' style={{width: '100%'}}
                           filterBy={['nombre']}
                           labelKey="nombre"
                           onChange={(tipo_acto) => actualizarHallazgo('tipo_acto', tipo_acto[0], CLAVERUBRO)}
                           options={cats.tipos_acto}
                           selected={hallazgo.tipo_acto ? [hallazgo.tipo_acto] : []}/>
            </div>
        }
        {
            editable == CLAVERUBRO &&
            <div className="d-flex flex-column">
                <span>{trans("hallazgo.instruccionRubro")}</span>
                <Typeahead id='rubro' style={{width: '100%'}}
                           filterBy={['nombre']}
                           labelKey="nombre"
                           onChange={(rubro) => actualizarHallazgo('rubro', rubro[0], CLAVETIPOAPLICA)}
                           options={cats.rubros}
                           selected={hallazgo.rubro ? [hallazgo.rubro] : []}/>
            </div>
        }
        {
            editable == CLAVETIPOAPLICA &&
            <div className="d-flex flex-column">
                <span>{trans("hallazgo.instruccionAplica")}</span>
                <Typeahead id='tipo_aplica' style={{width: '100%'}}
                           filterBy={['nombre']}
                           labelKey="nombre"
                           onChange={(tipo_aplica) => actualizarHallazgo('tipo_aplica', tipo_aplica[0], CLAVEDESCRIPCION)}
                           options={cats.tipos_aplica}
                           selected={hallazgo.tipo_aplica ? [hallazgo.tipo_aplica] : []}/>
            </div>
        }
        {
            editable == CLAVEDESCRIPCION &&
            <div className="d-flex flex-column">
                <span>{trans("hallazgo.descripcion")}</span>
                <div className="d-flex justify-content-start">
                                            <textarea className="form-control" value={hallazgo.descripcion}
                                                      onChange={e => actualizarHallazgo('descripcion', e.target.value)}/>
                    <button className="btn btn-outline-primary"
                            onClick={e => actualizaEditable(CLAVERIESGO)}
                            disabled={!hallazgo.descripcion}>
                        >
                    </button>
                </div>
            </div>
        }
        {
            editable == CLAVERIESGO &&
            <div className="d-flex flex-column">
                <span>{trans("hallazgo.nivelRiego")}</span>
                <div className="d-flex justify-content-between">
                    <Select
                        onSelect={e => actualizarHallazgo('probabilidad', e, CLAVERIESGO)}
                        options={cats.probabilidades}
                        selected={hallazgo.probabilidad}/>
                    <Select
                        onSelect={e => actualizarHallazgo('consecuencia', e, CLAVERIESGO)}
                        options={cats.consecuencias}
                        selected={hallazgo.consecuencia}/>


                </div>
                <div className="p-2 rounded" style={{'background' :((hallazgo || {}).nivel_riesgo|| {}).color}}>
                    {((hallazgo || {}).nivel_riesgo|| {}).nombre}
                </div>
            </div>
        }
    </div>
};

export default Llenado;
