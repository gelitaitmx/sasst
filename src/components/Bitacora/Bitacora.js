import React, {useEffect, useState} from "react";
import {useGlobal} from "reactn";
import Template from "../Template/Template";
import Titulo from "../Template/Titulo";
import {trans} from "../../services/lang.service";
import DatePicker from "react-datepicker";
import moment from "moment";
import {FaSave, FaTrash} from "react-icons/all";
import {consultarBitacora, guardarBitacora} from "../../api/bitacoraApi";
import {can} from "../../services/seguridad.service";

const Bitacora = () => {
    const [control, setControl] = useGlobal('control');
    const [datos, setDatos] = useState([]);
    const [bita, setBita] = useState({fecha: moment().toDate()});

    useEffect(() => {
        consultaBitacora();
    }, []);

    const consultaBitacora = () => {
        console.log('sadasdsa');
        consultarBitacora().then(res => {
            console.log(res);
            setDatos(res);
        });
    };

    const guardaBitacora = () => {
        guardarBitacora(bita).then(res => {
            setBita({fecha: moment().toDate(), descripcion: ''});
            consultaBitacora();
        })
    };

    const seleccionaBita = (bita) => {
        bita.fecha = moment(bita.fecha).toDate();
        setBita(bita);
    }


    return <Template>
        <Titulo titulo={trans('bita.bitacora')}/>
        <div className="d-flex justify-content-around container">
            <div>
                <div className="card border-primary mr-2">
                    <div className="card-body">
                        <div>
                            <div className="d-flex justify-content-between row">
                                <div>
                                    <strong>{trans('bita.fecha')} :</strong>
                                </div>
                                <DatePicker
                                    selected={bita.fecha}
                                    dateFormat="dd/MM/yyyy"
                                    className={`form-control form-control-sm w-100`}
                                    onChange={(e) => setBita({...bita, fecha: e})}/>

                            </div>
                            <div className="d-flex justify-content-between row">
                                <div>
                                    <strong>{trans('bita.fechaInicio')} :</strong>
                                </div>
                                <DatePicker
                                    selected={bita.fecha_inicio}
                                    dateFormat="dd/MM/yyyy"
                                    className={`form-control form-control-sm w-100`}
                                    onChange={(e) => setBita({...bita, fecha_inicio: e})}/>

                            </div>
                            <div className="d-flex justify-content-between row">
                                <div>
                                    <strong>{trans('bita.fechaFin')} :</strong>
                                </div>
                                <DatePicker
                                    selected={bita.fecha_fin}
                                    dateFormat="dd/MM/yyyy"
                                    className={`form-control form-control-sm w-100`}
                                    onChange={(e) => setBita({...bita, fecha_fin: e})}/>

                            </div>
                        </div>
                        <div className="d-flex justify-content-between row">
                            <div className="text-nowrap">
                                <strong>{trans('bita.descripcion')} :</strong>
                            </div>
                            <textarea className="form-control"
                                      onChange={(e) => setBita({...bita, descripcion: e.target.value})}
                                      value={bita.descripcion}
                                      typeof="text"/>
                            <div className="d-flex justify-content-end w-100">
                                {
                                    can("admin.guardar_bitacora") &&
                                    <button className="btn btn-outline-success mt-1" onClick={e => guardaBitacora()}>
                                        <FaSave/> {trans('general.guardar')}</button>
                                }

                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div>
                <div className="card border-dark">
                    <table className="table table-condensed table-hover">
                        <thead className="table-dark  thead-dark">
                        <tr>
                            <td>{trans('bita.fecha')}</td>
                            <td>{trans('bita.fechaInicio')}</td>
                            <td>{trans('bita.fechaFin')}</td>
                            <td>{trans('bita.descripcion')}</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (datos || []).map((bitacora, key) =>
                                <tr key={key} onClick={e => seleccionaBita(bitacora)}>
                                    <td>{moment(bitacora.fecha).format('DD/MM/YYYY')}</td>
                                    <td>{moment(bitacora.fecha_inicio).format('DD/MM/YYYY')}</td>
                                    <td>{moment(bitacora.fecha_fin).format('DD/MM/YYYY')}</td>
                                    <td>{bitacora.descripcion}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Template>
}

export default Bitacora;
