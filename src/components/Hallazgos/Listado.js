import React, {useEffect, useState} from 'react';
import Template from "../Template/Template";
import {useGlobal} from 'reactn';
import {trans} from "../../services/lang.service";
import moment from "moment";
import DatePicker from "react-datepicker";
import produce from "immer";
import {getAllHallazgos, guardarAccion} from "../../api/hallazgoApi";
import {FaExclamationTriangle, FaFileAlt, FaPlus, FaSearch, FaUserTie, FaWrench} from "react-icons/all";
import TooltipHover from "../Template/TooltipHover";
import {getCatalogos, getTrabajadoresActivos, getTrabajadorPorId} from "../../api/catalogosApi";
import ModalAcciones from "./ModalAcciones";
import $ from 'jquery';
import {getClaim} from "../../helpers/authHelper";
import {can} from "../../services/seguridad.service";

const Listado = () => {
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
        if(can('hallazgo.ver_todos_hallazgos')){
            consultarhallazgos();
        }else{
            getTrabajadorPorId(getClaim('tId'),['rels_trabajador_departamento']).then( res => {
                console.log(res.rels_trabajador_departamento[0].departamento_id);
                consultarhallazgos(res.rels_trabajador_departamento[0].departamento_id);
            });
        }

    }, [fechas, control.permisos]);

    useEffect(() => {
        if (hallazgo_select.id != null){
            $("#ModalAcciones").modal('show');
        }
    }, [hallazgo_select.id]);

    useEffect(() => {
        cargarCatalogos();
    }, []);

    const consultarhallazgos = (departamento_id = null) => {
        getAllHallazgos({fechas: fechas , 'departamento_id': departamento_id}, ['rubro', 'tipo_aplica', 'departamento', 'contratista_reportado', 'trabajador_reportado', 'lugar', 'acciones_correctivas']).then(res => {
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
            consultarhallazgos();
        })
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

                    <div className="pr-2">
                        <button className="btn btn-outline-danger"
                                onClick={e => abrirRegistro()}>
                            <FaExclamationTriangle/><span>{trans("general.reportarHallazgo")}</span></button>
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
                            <th>{trans('hallazgo.fecha')}</th>
                            <th>{trans('hallazgo.lugar')}</th>
                            <th>{trans('hallazgo.reportado')}</th>
                            <th>{trans('hallazgo.descripcion')}</th>
                            <th>{trans('hallazgo.toC')}</th>
                            <th>{trans('hallazgo.tipoActo')}</th>
                            <th>{trans('hallazgo.aplica')}</th>
                            <th>{trans('hallazgo.rubro')}</th>
                            <th>{trans('hallazgo.departamento')}</th>
                            <th>{trans('hallazgo.acciones')}</th>
                        </tr>
                        {
                            mostrarBuscador &&
                            <tr className="p-2">
                                <td></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador('lugar', e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador('reportado', e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador('descripcion', e.target.value)}/></td>
                                <td className="d-flex justify-content-start flex-nowrap">
                                    <button className="btn btn-sm btn-outline-primary"
                                            onClick={e => actualizaBuscador('trabajador_reportado_id', null)}>
                                        <FaUserTie/>
                                    </button>
                                    <button className="btn btn-sm btn-outline-secondary"
                                            onClick={e => actualizaBuscador('contratista_reportado_id', null)}>
                                        <FaWrench/>
                                    </button>
                                </td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador('tipo', e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador('tipo_aplica', e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador('rubro', e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador('departamento', e.target.value)}/></td>
                            </tr>
                        }

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
                                    <td>{hallazgo.descripcion}</td>
                                    <td>{
                                        (hallazgo.trabajador_reportado_id) ?
                                            <span>
                                                <TooltipHover
                                                    texto={trans('hallazgo.empleado')}>  <FaUserTie/></TooltipHover>
                                            </span> :
                                            <span>
                                                <TooltipHover
                                                    texto={trans('hallazgo.contratista')}> <FaWrench/></TooltipHover>
                                            </span>
                                    }</td>
                                    <td>{trans(`hallazgo.${hallazgo.tipo}`)}</td>
                                    <td>{(hallazgo.tipo_aplica || {}).nombre}</td>
                                    <td>{(hallazgo.rubro || {}).nombre}</td>
                                    <td>{(hallazgo.departamento || {}).nombre}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-secondary"
                                                onClick={e => abrirAcciones(hallazgo)}>
                                            {
                                                ((hallazgo || {}).acciones_correctivas || []).length === 0 ?
                                                    <FaPlus></FaPlus> :
                                                    <FaFileAlt></FaFileAlt>
                                            }</button>

                                    </td>
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
