import React, {useEffect, useState} from "react";
import Template from "../Template/Template";
import DatePicker from "react-datepicker";
import moment from "moment";
import {useGlobal} from "reactn";
import {trans} from "../../services/lang.service";
import {consultar, guardarIndicadores} from "../../api/indicadorApi";
import {getCatalogos} from "../../api/catalogosApi";
import produce from "immer";
import {FaSave} from "react-icons/all";
import {indicador} from "../../lang/es";


const Indicadores = () => {
    const [control, setControl] = useGlobal('control');
    const [monthYear, setMonthYear] = useState(null);
    const [indicadores, setIndicadores] = useState({});

    useEffect(() => {
        if (monthYear != null) cargarDatos()
    }, [monthYear]);

    const cargarDatos = () => {

    }

    return <Template>
        <div className="d-flex justify-content-center p-2">
            <strong className="p-2">
                {trans('indicador.fecha')}
            </strong>
            <DatePicker
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                showTwoColumnMonthYearPicker
                selected={monthYear}
                className={`form-control`}
                onChange={(e) => setMonthYear(e)}/>
        </div>
        <div className="container">
            <table className="table table-condensed">
                <tbody>
                <tr>
                    <th>{trans('indicador.CONIN')} =</th>
                    <th>{trans('indicador.100x')}</th>
                    <th>{trans('indicador.conInEli')}</th>
                    <th>{trans('indicador./')}</th>
                    <th>{trans('indicador.conInDet')}</th>
                    <th>{trans('indicador.total')}</th>
                </tr>
                <tr>
                    <td className="rgba-red-light">{trans('indicador.CONIN')}</td>
                    <td className="rgba-orange-light">{trans('indicador.100x')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-orange-light">{trans('indicador./')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-green-light">{(indicadores || {}).total}</td>
                </tr>
                <tr>
                    <th>{trans('indicador.ACTIN')} =</th>
                    <th>{trans('indicador.100x')}</th>
                    <th>{trans('indicador.actInCor')}</th>
                    <th>{trans('indicador./')}</th>
                    <th>{trans('indicador.actInRep')}</th>
                    <th>{trans('indicador.total')}</th>
                </tr>
                <tr>
                    <td className="rgba-red-light">{trans('indicador.ACTIN')}</td>
                    <td className="rgba-orange-light">{trans('indicador.100x')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-orange-light">{trans('indicador./')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-green-light">{(indicadores || {}).total}</td>
                </tr>
                <tr>
                    <th>{trans('indicador.ACCID')} =</th>
                    <th>{trans('indicador.100x')}</th>
                    <th>{trans('indicador.diasAccInc')}</th>
                    <th>{trans('indicador./')}</th>
                    <th>{trans('indicador.diasAccTot')}</th>
                    <th>{trans('indicador.total')}</th>
                </tr>
                <tr>
                    <td className="rgba-red-light">{trans('indicador.ACCID')}</td>
                    <td className="rgba-orange-light">{trans('indicador.100x')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-orange-light">{trans('indicador./')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-green-light">{(indicadores || {}).total}</td>
                </tr>
                <tr>
                    <th>{trans('indicador.TRARI')} =</th>
                    <th>{trans('indicador.100x')}</th>
                    <th>{trans('indicador.trabRiesNorm')}</th>
                    <th>{trans('indicador./')}</th>
                    <th>{trans('indicador.trabRiesIns')}</th>
                    <th>{trans('indicador.total')}</th>
                </tr>
                <tr>
                    <td className="rgba-red-light">{trans('indicador.TRARI')}</td>
                    <td className="rgba-orange-light">{trans('indicador.100x')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-orange-light">{trans('indicador./')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-green-light">{(indicadores || {}).total}</td>
                </tr>
                <tr>
                    <th>{trans('indicador.USEPP')} =</th>
                    <th>{trans('indicador.100x')}</th>
                    <th>{trans('indicador.usoEppNo')}</th>
                    <th>{trans('indicador./')}</th>
                    <th>{trans('indicador.numTrab')}</th>
                    <th>{trans('indicador.total')}</th>
                </tr>
                <tr>
                    <td className="rgba-red-light">{trans('indicador.USEPP')}</td>
                    <td className="rgba-orange-light">{trans('indicador.100x')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-orange-light">{trans('indicador./')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-green-light">{(indicadores || {}).total}</td>
                </tr>
                <tr>
                    <th>{trans('indicador.CAPAC')} =</th>
                    <th>{trans('indicador.100x')}</th>
                    <th>{trans('indicador.capacitacionTotal')}</th>
                    <th>{trans('indicador./')}</th>
                    <th>{trans('indicador.trabajadoresTotal')}</th>
                    <th>{trans('indicador.total')}</th>
                </tr>
                <tr>
                    <td className="rgba-red-light">{trans('indicador.CAPAC')}</td>
                    <td className="rgba-orange-light">{trans('indicador.100x')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-orange-light">{trans('indicador./')}</td>
                    <td className="rgba-orange-light">{(indicadores || {}).valor}</td>
                    <td className="rgba-green-light">{(indicadores || {}).total}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </Template>
}

export default Indicadores;
