import React, {useEffect, useState} from "react";
import Template from "../Template/Template";
import Titulo from "../Template/Titulo";
import {trans} from "../../services/lang.service";
import {useGlobal} from "reactn";
import moment from "moment";
import {FaDownload, FaPlusCircle, FaSave, FaTrash} from "react-icons/all";
import {consultaPorTipo, consultar, descarga, guardarAdjuntoConTipo} from "../../api/documentoApi";
import {getCatalogos} from "../../api/catalogosApi";
import DatePicker from "react-datepicker";
import filtrarArreglo from "../../helpers/filterHelper";
import {Typeahead} from "react-bootstrap-typeahead";
import produce from "immer";
import FilesDropzone from "../Template/FilesDropzone";
import Agregar from "./Agregar";
import {noop} from "../../helpers/generalHelper";
import {consulta} from "../../api/araApi";


const Listado = () => {
    const [control, setControl] = useGlobal('control');
    const [new_documento, setDocumento] = useState(null);
    const [documentos, setDocumentos] = useState([]);
    const [tipos_documento, setTiposDocumentos] = useState([]);
    const [tipos_documento_all, setTiposDocumentosAll] = useState([]);
    const [buscador, setBuscador] = useState({});
    const [fecha_moment, setFechaMoment] = useState(null);
    const [fecha_inicio, setFechaInicio] = useState(moment().startOf('year').toDate());
    const [fecha_fin, setFechaFin] = useState(moment().endOf('year').toDate());

    useEffect(() => {
        cargarCatalogos();
    }, []);

    useEffect(() => setDocumentos(filtrarArreglo(tipos_documento_all, buscador)), [tipos_documento_all, buscador]);

    const cargarCatalogos = () => {
        getCatalogos([{nombre: 'tipo_documento', relaciones: []}]).then(res => {
            setTiposDocumentos(res.tipo_documento.data);
            consultarDocumentos(res.tipo_documento.data);
        });
    };


    const consultarDocumentos = () => {
        consultar().then(res => {
            setDocumentos(res);
            setTiposDocumentosAll(res);
        });
    };

    const agregarDocumento = () => setDocumento({tipo_documento: {nombre: ''}});

    const actualizarDocumento = (propiedad, valor) => {
        setDocumento(produce(draft => {
            if (valor !== 'undefined')
                draft[propiedad] = valor;
            if (valor != null && valor.id != null && propiedad === 'tipo_documento')
                draft.tipo_documento_id = valor.id;
        }));
    };

    const guardarDocumento = () => {
        guardarAdjuntoConTipo(new_documento).then(res => {
            consultarDocumentos();
            setDocumento(null)
        });
    }
    const descargarDocumento = (documento) => {
        descarga(documento.id, documento.nombre);
    }


    return <Template>
        <div>
            <Titulo titulo={trans('documento.documentos')}/>
            <div className="container">
                <div className='d-flex justify-content-around'>

                </div>
                <div className="d-flex justify-content-center">
                    <div className="card border-primary">
                        <table className="table table-condensed ">
                            <thead className="table-dark">
                            <tr>
                                <th>{trans('documento.fecha')}</th>
                                <th>{trans('documento.nombre')}</th>
                                <th>{trans('documento.acciones')}</th>
                            </tr>
                            <tr>
                                <th><DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    selected={fecha_moment}
                                    className={`form-control-sm`}
                                    onChange={(e) => {
                                        e !== null ?
                                            setBuscador({...buscador, 'fecha': moment(e).format('YYYY-MM-DD')}) :
                                            setBuscador({});
                                        setFechaMoment(e);
                                    }}/></th>
                                <th>
                                    <input className='form-control form-control-sm'
                                           onChange={(e) => setBuscador({...buscador, nombre: e.target.value})}/>
                                </th>
                                <th>  <button className="btn btn-outline-success text-small text-nowrap" onClick={(e) => agregarDocumento()}>
                                    <FaPlusCircle/>{trans('documento.agregar')}
                                </button></th>
                            </tr>
                            </thead>
                            <tbody className="table-hover">
                            {
                                (documentos || []).map((doc, key) =>
                                    <tr key={key}>
                                        <td>{moment(doc.fecha).format('DD/MM/YYYY')}</td>
                                        <td>{doc.nombre}</td>
                                        <td>
                                            <button className="btn btn-outline-success btn-sm"
                                                    onClick={e => descargarDocumento(doc)}><FaDownload/></button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    {
                        new_documento != null &&
                        <Agregar actualizarDocumento={actualizarDocumento} documento={new_documento}
                                 guardarDocumento={guardarDocumento} tipos_documento={tipos_documento}/>
                    }
                </div>
            </div>
        </div>
    </Template>
};

export default Listado;
