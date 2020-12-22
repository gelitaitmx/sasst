import React, {useEffect, useState} from "react";
import Template from "../Template/Template";
import {useGlobal} from "reactn";
import {trans} from "../../services/lang.service";
import moment from "moment";
import DatePicker from "react-datepicker";
import produce from "immer";
import {getAllHallazgos, guardarAccion} from "../../api/hallazgoApi";
import {FaSearch, FaUserTie, FaEdit, FaCheckCircle, FaTimesCircle} from "react-icons/all";
import TooltipHover from "../Template/TooltipHover";
import {getCatalogos, getTrabajadoresActivos} from "../../api/catalogosApi";
import $ from "jquery";
import ModalEdit from "./ModalEdit";

const Control = () => {
    const [control, setControl] = useGlobal("control");
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
        console.log(hallazgo_select);
        if (hallazgo_select.id != null){
            $("#ModalEdit").modal("show");
        }else{
            $("#ModalEdit").modal("hide");
        }

    }, [hallazgo_select.id]);

    const consultarhallazgos = () => {
        getAllHallazgos(fechas, ["rubro", "tipo_aplica", "departamento", "contratista_reportado", "trabajador_reportado", "lugar", "acciones_correctivas", "nivel_riesgo"]).then(res => {
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
            {nombre: "departamento", relaciones: []}
        ]).then(res => {
            setCats({
                contratistas: res.contratista.data,
                lugares: res.lugar.data,
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
    const editarHallazgo = (hallazgos) => setHallazgoSelect(hallazgos);


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
                return hallazgo.[propiedad].nombre.toLowerCase().indexOf(valor.toLocaleString()) > -1;
            }
        });
        if (valor != null && valor.length > 0) {
            setHallazgos(filter);
        } else {
            setHallazgos(hallazgosAll);
        }
    };


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
                            <th>{trans("hallazgo.nivelRiego")}</th>
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
                                           onChange={e => actualizaBuscador("tipo", e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador("tipo_aplica", e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador("rubro", e.target.value)}/></td>
                                <td><input className="form-control-sm w-100"
                                           onChange={e => actualizaBuscador("departamento", e.target.value)}/></td>
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
                                        <button className="btn btn-sm btn-outline-secondary"
                                                onClick={e => console.log()}><FaCheckCircle/></button>
                                        <button className="btn btn-sm btn-outline-secondary"
                                                onClick={e => console.log()}><FaTimesCircle/></button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                {
                    hallazgo_select.id && <ModalEdit hallazgo={hallazgo_select} cats={cats}/>
                }

            </div>
        </Template>
    );
};


export default Control;
