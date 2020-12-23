import React, {useEffect, useState} from 'react';
import Template from "../Template/Template";
import {useGlobal} from 'reactn';
import {trans} from "../../services/lang.service";
import moment from "moment";
import DatePicker from "react-datepicker";
import produce from "immer";
import {getAllHallazgos, guardarAccion, validarAccionCorrectiva} from "../../api/hallazgoApi";
import {FaExclamationTriangle, FaFileAlt, FaPlus, FaCheckCircle, FaUserTie, FaWrench} from "react-icons/all";
import TooltipHover from "../Template/TooltipHover";
import {getCatalogos, getTrabajadoresActivos, getTrabajadorPorId} from "../../api/catalogosApi";
import ModalAcciones from "./ModalAcciones";
import $ from 'jquery';
import {getClaim} from "../../helpers/authHelper";
import {can} from "../../services/seguridad.service";
import {OPCIONACCIONES} from "../../helpers/hallazgoHelper";
import {confirmar} from "../../helpers/swalHelper";

const Listado = ({match}) => {

    const [control, setControl] = useGlobal('control');
    const [fechas, setFechas] = useState({
        inicio: moment().startOf('month').toDate(),
        fin: moment().endOf('month').toDate()
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

    const abrirRegistro = (id = null) => {
        if (id == null) {
            window.open(process.env.REACT_APP_BASE_NAME + '/hallazgo/registro', '_self');
        }
    };

    useEffect(() => {
        console.log(control.permisos);
        if (control.permisos.length > 0)
            validarConsulta();
    }, [fechas, control.permisos]);

    const validarConsulta = () => {
        console.log(can('hallazgo.ver_todos_hallazgos'));
        if (can('hallazgo.ver_todos_hallazgos')) {
            consultarhallazgos();
        } else {
            getTrabajadorPorId(getClaim('tId'), ['rels_trabajador_departamento']).then(res => {
                consultarhallazgos(res.rels_trabajador_departamento[0].departamento_id);
            });
        }
    };
    useEffect(() => {
        if (hallazgo_select.id != null) {
            $("#ModalAcciones").modal('show');
        }
    }, [hallazgo_select.id]);

    useEffect(() => {
        cargarCatalogos();
    }, []);

    const consultarhallazgos = (departamento_id = null) => {
        getAllHallazgos({
            fechas: fechas,
            'departamento_id': departamento_id
        }, ['rubro', 'nivel_riesgo', 'departamento', 'responsable', 'contratista_reportado', 'trabajador_reportado', 'lugar', 'acciones_correctivas']).then(res => {
            setHallazgos(res);
            setHallazgosAll(res);
        })
    };
    const cargarCatalogos = () => {
        getCatalogos([
            {nombre: 'contratista', relaciones: []},
            {nombre: 'lugar', relaciones: []},
            {nombre: 'tipo_aplica', relaciones: []},
            {nombre: 'rubro', relaciones: []},
            {nombre: 'departamento', relaciones: []}
        ]).then(res => {
            setCats({
                contratistas: res.contratista.data,
                lugares: res.lugar.data,
                tipos_aplica: res.tipo_aplica.data,
                tipos_acto: [{'id': 'AI', nombre: 'Acto Inseguro'},
                    {'id': 'AC', nombre: 'Accidente'},
                    {'id': 'CI', nombre: 'Condicion Insegura'},
                    {'id': 'IN', nombre: 'Incidente'}],
                rubros: res.rubro.data,
                departamentos: res.departamento.data,
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

    const abrirAcciones = (hallazgos) => {
        setHallazgoSelect(hallazgos);
    };

    const actualizaBuscador = (propiedad, valor) => {
        let filter = hallazgos.filter(hallazgo => {
            if (propiedad === 'contratista_reportado_id' || propiedad === 'trabajador_reportado_id') {
                return hallazgo[propiedad] != null;
            } else if (propiedad === 'reportado') {
                if (hallazgo.trabajador_reportado_id != null) {
                    return hallazgo.trabajador_reportado.fullName.toLowerCase().indexOf(valor.toLocaleString()) > -1;
                } else if (hallazgo.contratista_reportado_id != null) {
                    return hallazgo.contratista_reportado.nombre.toLowerCase().indexOf(valor.toLocaleString()) > -1;
                }
            } else {
                return hallazgo.[propiedad].nombre.toLowerCase().indexOf(valor.toLocaleString()) > -1;
            }
        });
        if (valor != null && valor.length > 0) {
            setHallazgos(filter);
        } else {
            setHallazgos(hallazgosAll);
        }
    };

    const guardarAccionCorrectiva = (accion) => {
        guardarAccion(accion, hallazgo_select.id).then(res => {
            $("#ModalAcciones").modal("toggle");
            validarConsulta();
        });
    };

    const validaAccionCorrectiva = (accion) => {
        confirmar('warning', 'Esta  operacion no puede ser deshecha, ¿Seguro que desea  validar esta accion ? ', 'Validar Accion Correctiva').then(res => {
            validarAccionCorrectiva(accion.id).then(res => validarConsulta());
        });
    };

    return (
        <Template>
            <div className="d-flex  justify-content-center container ">
                <div className="d-flex justify-content-center p-2">
                    <div className="d-flex pr-4">
                        <div>
                            <strong className="p-3"> {trans('hallazgo.fechiInicio')} :</strong>
                        </div>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={fechas.inicio}
                            className={`form-control w-100`}
                            onChange={(e) => actualizarFechas('inicio', e)}/>
                    </div>
                    <div className="d-flex pr-4">
                        <div>
                            <strong className="p-3">{trans('hallazgo.fechiFin')} :</strong>
                        </div>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={fechas.fin}
                            className={`form-control w-100`}
                            onChange={(e) => actualizarFechas('fin', e)}/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center p-2">
                <div className="card border-primary ">
                    <table className="table-condensed table table-responsive table-hover">
                        <thead className="table thead-dark">
                        <tr>
                            <th>{trans('hallazgo.fecha')}</th>
                            <th>{trans('hallazgo.lugar')}</th>
                            <th>{trans('hallazgo.reportado')}</th>
                            <th>{trans('hallazgo.responsable')}</th>
                            <th>{trans('hallazgo.descripcion')}</th>
                            <th>{trans('hallazgo.departamento')}</th>
                            <th>{trans('hallazgo.accionesCorrectivas')}</th>
                            {
                                match.params.opcion != OPCIONACCIONES &&
                                <th>{trans('hallazgo.nivelRiesgo')}</th>
                            }
                            {
                                match.params.opcion != OPCIONACCIONES &&
                                <th>{trans('hallazgo.acciones')}</th>
                            }
                        </tr>

                        </thead>
                        <tbody className="text-small cursor">
                        {
                            (hallazgos || []).map((hallazgo, idx) =>
                                <tr key={idx}>
                                    <td>{moment(hallazgo.fecha).format('DD/MM/yyyy HH:mm')}</td>
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
                                    <td>{(hallazgo.responsable || {}).fullName}</td>
                                    <td>{hallazgo.descripcion}</td>
                                    <td>{(hallazgo.departamento || {}).nombre}</td>
                                    <td>
                                        {
                                            hallazgo.acciones_correctivas.map((accion, idxA) =>
                                                <div key={idxA}
                                                     className={`d-flex justify-content-between rounded p-2 ${accion.esta_validada ? 'bg-success' : 'bg-warning'}`}>
                                                    <span
                                                        className="text-small pr-2">{moment(accion.fecha_verificacion).format('DD/MM/YYYY')}</span>
                                                    <span>  {accion.descripcion}  </span>
                                                    {
                                                        (match.params.opcion == OPCIONACCIONES && !accion.esta_validada  ) &&
                                                        <button className="btn btn-sm btn-outline-secondary"
                                                                onClick={e => validaAccionCorrectiva(accion)}>
                                                            <FaCheckCircle></FaCheckCircle>
                                                        </button>
                                                    }
                                                </div>
                                            )
                                        }

                                    </td>
                                    {
                                        match.params.opcion != OPCIONACCIONES &&
                                        <td>
                                            <div className="p-2 rounded d-flex flex-nowrap  text-nowrap"
                                                 style={{"background": ((hallazgo || {}).nivel_riesgo || {}).color}}>
                                                {((hallazgo || {}).nivel_riesgo || {}).nombre}
                                            </div>
                                        </td>
                                    }
                                    {
                                        match.params.opcion != OPCIONACCIONES &&
                                        <td>
                                            <button className="btn btn-sm btn-outline-secondary"
                                                    onClick={e => abrirAcciones(hallazgo)}>
                                                <FaPlus></FaPlus>
                                            </button>

                                        </td>
                                    }
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                {
                    hallazgo_select.id != null &&
                    <ModalAcciones acciones={hallazgo_select.acciones_correctivas}
                                   guardarAccionCorrectiva={guardarAccionCorrectiva}/>
                }
            </div>

        </Template>
    );
};

export default Listado;
