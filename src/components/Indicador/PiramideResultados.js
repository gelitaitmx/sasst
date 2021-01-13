import React, {useEffect, useState} from "react";
import Template from "../Template/Template";
import moment from "moment";
import {useGlobal} from "reactn";
import Titulo from "../Template/Titulo";
import {trans} from "../../services/lang.service";
import DatePicker from "react-datepicker";
import {consultaPiramide} from "../../api/indicadorApi";


const PiramideResultados = () => {
    const [control, setControl] = useGlobal('control');
    const [fecha_fin, setFechaFin] = useState(moment().toDate());
    return <Template>
        <Titulo titulo={trans('indicador.piramide')}/>
        <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center p-2">
                <strong className="p-2">
                    {trans('indicador.fecha_fin')}
                </strong>
                <DatePicker
                    dateFormat="dd/mm/yyyy"
                    selected={fecha_fin}
                    className={`form-control`}
                    onChange={(e) => setFechaFin(e)}/>
            </div>
        </div>
        <div>
            <Piramide fecha_fin={fecha_fin}/>
        </div>
    </Template>
};

export const Piramide = ({fecha_fin}) => {
    const [info, setInfo] = useState({});

    useEffect(() => {
        consultaPiramide(fecha_fin).then(res => {
            console.log(res);
            setInfo(res)
        });
    }, [fecha_fin]);

    return <div className="container border-primary">
        <div className="d-flex justify-content-center flex-column">
            <div
                className="d-flex justify-content-center text-center">{trans('indicador.diasSinAccidentes')}{moment(fecha_fin).format('DD/MM/YYYY')}
            </div>
            <div className="d-flex justify-content-center  ">
                <div className="bg-success w-25 d-flex flex-row justify-content-around   p-2 card border-dark">
                    <div className="text-center ">
                        <div><strong>{trans('indicador.record')} :</strong></div>
                        <div><strong>{trans('indicador.actual')} :</strong></div>
                    </div>
                    <div className="text-center w-50 bg-white rounded">
                        <div> {info.dias_record}</div>
                        <div> {info.dias_sin_accidentes}</div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div className="d-flex justify-content-center flex-column">
            <div className="d-flex justify-content-center text-center">
                {trans('indicador.accidentes')}{moment(fecha_fin).format('DD/MM/YYYY')}
            </div>
            <div className="d-flex justify-content-center">
                <div className="bg-danger w-50  d-flex flex-row justify-content-around   p-2 card border-dark">
                    <div className="text-center ">
                        <div><strong>{trans('indicador.mes')} {trans(`indicador.${moment(fecha_fin).format('M')}`)} :</strong></div>
                        <div><strong>{trans('indicador.acumulado')} {moment(fecha_fin).format('YYYY')} :</strong></div>
                    </div>
                    <div className="text-center w-50 bg-white rounded">
                        <div> {info.accidentes_mes}</div>
                        <div> {info.accidentes_anyo}</div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div className="d-flex justify-content-center flex-column">
            <div className="d-flex justify-content-center text-center">
                {trans('indicador.incidente')}{moment(fecha_fin).format('DD/MM/YYYY')}
            </div>
            <div className="d-flex justify-content-center">
                <div className="bg-warning light w-75 d-flex flex-row justify-content-around  p-2 card border-dark">
                    <div className="text-center ">
                        <div><strong>{trans('indicador.mes')} {trans(`indicador.${moment(fecha_fin).format('M')}`)} </strong></div>
                        <div><strong>{trans('indicador.acumulado')} {moment(fecha_fin).format('YYYY')} :</strong></div>
                    </div>
                    <div className="text-center w-50 bg-white rounded">
                        <div> {info.actos_inseguros_mes}</div>
                        <div> {info.actos_inseguros_anyo}</div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div className="d-flex justify-content-center flex-column">
            <div className="d-flex justify-content-center text-center">
                {trans('indicador.actosInseguros')}{moment(fecha_fin).format('DD/MM/YYYY')}
            </div>
            <div className="d-flex justify-content-center">
                <div className="rgba-yellow-light w-85 d-flex flex-row justify-content-around   p-2 card border-dark">
                    <div className="text-center ">
                        <div><strong>{trans('indicador.mes')} {trans(`indicador.${moment(fecha_fin).format('M')}`)} :</strong></div>
                        <div><strong>{trans('indicador.acumulado')} {moment(fecha_fin).format('YYYY')} :</strong></div>
                    </div>
                    <div className="text-center w-50 bg-white rounded">
                        <div> {info.condiciones_inseguras_mes}</div>
                        <div> {info.condiciones_inseguras_anyo}</div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div className="d-flex justify-content-center flex-column">
            <div className="d-flex justify-content-center text-center">
                {trans('indicador.condicionesInseguras')}{moment(fecha_fin).format('DD/MM/YYYY')}
            </div>
            <div className="rgba-yellow-strong w-100 d-flex flex-row justify-content-around  p-2 card border-dark">
                <div className="text-center">
                    <div><strong>{trans('indicador.mes')} {trans(`indicador.${moment(fecha_fin).format('M')}`)} :</strong></div>
                    <div><strong>{trans('indicador.acumulado')} {moment(fecha_fin).format('YYYY')} :</strong></div>
                </div>
                <div className="text-center w-50 bg-white rounded">
                    <div> {info.incidentes_anyo}</div>
                    <div> {info.incidentes_mes}</div>
                </div>
            </div>
        </div>
    </div>
}

export default PiramideResultados;
