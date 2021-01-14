import React, {useEffect, useState} from "react";
import Template from "../Template/Template";
import {useGlobal} from "reactn";
import {trans} from "../../services/lang.service";
import moment from "moment";
import DatePicker from "react-datepicker";
import produce from "immer";
import {getAllHallazgos, guardarAccion, guardarHallazgo, quitarValidacion, validaHallazgo} from "../../api/hallazgoApi";
import {FaSearch, FaUserTie, FaEdit, FaCheckCircle, FaTimesCircle} from "react-icons/all";
import TooltipHover from "../Template/TooltipHover";
import {getCatalogos, getTrabajadoresActivos} from "../../api/catalogosApi";
import $ from "jquery";
import ModalEdit from "./ModalEdit";
import ModalResponsableHallazgo from "./ModalResponsableHallazgo";
import {confirmar, staticInfo} from "../../helpers/swalHelper";
import {can} from "../../services/seguridad.service";

const Control = () => {
    const [control, setControl] = useGlobal("control");
    const [nombre_modal, setNombreModal] = useState("");
    const [fechas, setFechas] = useState({
        inicio: moment().startOf("month").toDate(),
        fin: moment().endOf("month").toDate()
    });
    const [trabajadores_activos, setTrabajadoresActivos] = useState([]);
    const [hallazgo_select, setHallazgoSelect] = useState({});
    const [mostrarBuscador, setMostrarBuscadores] = useState(false);
    const [hallazgos, setHallazgos] = useState([]);
    const [hallazgosAll, setHallazgosAll] = useState([]);
    const [cats, setCats] = useState({
        trabajadores: [],
        contratistas: [],
        tipo_acto: [],
        lugares: [],
        tipos_aplica: [],
        aplicaciones: [],
        rubros: [],
        departamentos: []
    });


    useEffect(() => {
        consultarhallazgos();
    }, [fechas]);

    useEffect(() => {
        cargarCatalogos();
    }, []);

    useEffect(() => {
        console.log(nombre_modal);
        if (hallazgo_select.id != null) {
            $(nombre_modal).modal("show");
        }
    }, [hallazgo_select.id]);

    const consultarhallazgos = () => {
        getAllHallazgos({fechas: fechas}, ["rubro", "reporto", "tipo_aplica", "departamento", "contratista_reportado", "trabajador_reportado", "lugar", "acciones_correctivas", "nivel_riesgo", 'consecuencia', 'probabilidad']).then(res => {
            setHallazgos(res);
            setHallazgosAll(res);
        })
    };

    const cargarCatalogos = () => {
        getCatalogos([
            {nombre: "contratista", relaciones: []},
            {nombre: "lugar", relaciones: []},
            {nombre: "tipo_aplica", relaciones: []},
            {nombre: "rubro", relaciones: []},
            {nombre: "departamento", relaciones: []},
            {nombre: 'probabilidad', relaciones: []},
            {nombre: 'consecuencia', relaciones: []},
            {nombre: 'formula_nivel_riesgo', relaciones: ['nivel_riesgo']},
        ]).then(res => {
            setCats({
                contratistas: res.contratista.data,
                lugares: res.lugar.data,
                rubros: res.rubro.data,
                tipos_aplica: res.tipo_aplica.data,
                tipos_acto: [{'id': 'AI', nombre: 'Acto Inseguro'},
                    {'id': 'AC', nombre: 'Accidente'},
                    {'id': 'CI', nombre: 'Condicion Insegura'},
                    {'id': 'IN', nombre: 'Incidente'}],
                departamentos: res.departamento.data,
                consecuencias: res.consecuencia.data,
                probabilidades: res.probabilidad.data,
                formulas_nivel_riesgo: res.formula_nivel_riesgo.data,
            })
        });
        getTrabajadoresActivos().then(res => {
            setTrabajadoresActivos(res);
        })
    };

    const actualizarFechas = (propiedad, valor) => {
        setFechas(produce(draft => {
            draft[propiedad] = valor;
        }));
    };
    const editarHallazgo = (hallazgos) => {
        setNombreModal("#modalEdit");
        setHallazgoSelect(hallazgos);
    };


    const actualizaBuscador = (propiedad, valor) => {
        let filter = hallazgos.filter(hallazgo => {
            if (propiedad === "contratista_reportado_id" || propiedad === "trabajador_reportado_id") {
                return hallazgo[propiedad] != null;
            } else if (propiedad === "reportado") {
                if (hallazgo.trabajador_reportado_id != null) {
                    return hallazgo.trabajador_reportado.fullName.toLowerCase().indexOf(valor.toLocaleString()) > -1;
                } else if (hallazgo.contratista_reportado_id != null) {
                    return hallazgo.contratista_reportado.nombre.toLowerCase().indexOf(valor.toLocaleString()) > -1;
                }
            } else {

                return hallazgo[propiedad] != null && hallazgo[propiedad].nombre.toLowerCase().indexOf(valor.toLocaleString()) > -1;
            }
        });
        if (valor != null && valor.length > 0) {
            setHallazgos(filter);
        } else {
            setHallazgos(hallazgosAll);
        }
    };

    const guardar = (hallazgo) => guardarHallazgo(hallazgo).then(res => {
        $("#modalEdit").modal("toggle");
        consultarhallazgos();
    });

    const seleccionValidaHallazgo = (hallazgo_local) => {
        setNombreModal("#ModalResponsableHallazgo");
        setHallazgoSelect(hallazgo_local);
    };

    const validarHallazgo = responsable => validaHallazgo(hallazgo_select.id, responsable.id).then(res => {
        consultarhallazgos();
    });

    const eliminarValidacion = (hallazgo) => {
        confirmar('warning', 'Seguro que desea  quitar la validacion del hallazgo', 'Quitar Validacion').then(
            res => res.value ? quitarValidacion(hallazgo.id).then(res=> consultarhallazgos()) : null
    )}
    return (
        <Template>
            <div className="d-flex  justify-content-center container ">
                <div className="d-flex justify-content-center p-2">
                    <div className="d-flex pr-4">
                        <div>
                            <strong className="p-3"> {trans("hallazgo.fechiInicio")} :</strong>
                        </div>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={fechas.inicio}
                            className={`form-control w-100`}
                            onChange={(e) => actualizarFechas("inicio", e)}/>
                    </div>
                    <div className="d-flex pr-4">
                        <div>
                            <strong className="p-3">{trans("hallazgo.fechiFin")} :</strong>
                        </div>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={fechas.fin}
                            className={`form-control w-100`}
                            onChange={(e) => actualizarFechas("fin", e)}/>
                    </div>
                    <button className="btn btn-sm btn-outline-primary"
                            onClick={e => setMostrarBuscadores(!mostrarBuscador)}>
                        <FaSearch/></button>
                </div>
            </div>
            <div className="d-flex justify-content-center p-2">
                <div className="card border-primary ">
                    <table className="table-condensed table table-responsive table-hover">
                        <thead className="table thead-dark">
                        <tr>
                            <th>{trans("hallazgo.fecha")}</th>
                            <th>{trans("hallazgo.lugar")}</th>
                            <th>{trans("hallazgo.reportado")}</th>
                            <th>{trans("hallazgo.descripcion")}</th>
                            <th>{trans("hallazgo.departamento")}</th>
                            <th>{trans("hallazgo.nivelRiesgo")}</th>
                            <th>{trans("hallazgo.acciones")}</th>
                        </tr>
                        {
                            mostrarBuscador &&
                            <tr className="p-2">
                                <td></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador("lugar", e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador("reportado", e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador("descripcion", e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador("departamento", e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador("nivel_riego", e.target.value)}/></td>
                            </tr>
                        }

                        </thead>
                        <tbody className="text-small cursor">
                        {
                            (hallazgos || []).map((hallazgo, idx) =>
                                <tr key={idx}>
                                    <td>{moment(hallazgo.fecha).format("DD/MM/yyyy HH:mm")}</td>
                                    <td>{(hallazgo.lugar || {}).nombre}</td>
                                    <td>{
                                        (hallazgo.trabajador_reportado_id) ?
                                            <span>
                                                {(hallazgo.trabajador_reportado || {}).fullName}
                                            </span> :
                                            <span>
                                                {(hallazgo.contratista_reportado || {}).nombre}
                                            </span>
                                    }</td>
                                    <td>{hallazgo.descripcion}</td>
                                    <td>{(hallazgo.departamento || {}).nombre}</td>
                                    <td>
                                        <div className="p-2 rounded d-flex flex-nowrap  text-nowrap"
                                             style={{"background": ((hallazgo || {}).nivel_riesgo || {}).color}}>
                                            {((hallazgo || {}).nivel_riesgo || {}).nombre}
                                        </div>
                                    </td>
                                    <td className="d-flex justify-content-around">
                                        <button className="btn btn-sm btn-outline-secondary"
                                                onClick={e => editarHallazgo(hallazgo)}><FaEdit/></button>
                                        {
                                            hallazgo.esta_validado ?
                                                <button className="btn btn-sm btn-outline-danger"
                                                        onClick={e => eliminarValidacion(hallazgo)}><FaTimesCircle/>
                                                </button> :
                                                <button className="btn btn-sm btn-outline-success"
                                                        onClick={e => seleccionValidaHallazgo(hallazgo)}>
                                                    <FaCheckCircle/>
                                                </button>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>

            </div>
            {
                (hallazgo_select.id && can('hallazgos.editar_hallazgo')) &&
                <ModalEdit hallazgo={hallazgo_select} cats={cats} trabajadores_activos={trabajadores_activos}
                           guardar={guardar}/>
            }
            {
                (hallazgo_select.id && can('hallazgos.validar_hallazgo')) && <ModalResponsableHallazgo validarHallazgo={validarHallazgo}
                                                                trabajadores_activos={trabajadores_activos}/>
            }

        </Template>
    );
};


export default Control;
