import React, {useState, useEffect} from 'react';
import {trans} from "../../services/lang.service";
import {noop} from "../../helpers/generalHelper";
import {getAtendidosPorDepto} from "../../api/reportesApi";
import {FaExclamationTriangle} from "react-icons/all";
import moment from "moment";

const PorDepto = () => {
//|------Hooks------|//
    const fecha_m = moment();
    const [departamentos, setDepartamentos] = useState([]);

//|------UseEffects------|//
    useEffect(() => void (cargarPorDepto()), []);

//|------Funciones------|//
    //|------API------|//
    const cargarPorDepto = () => getAtendidosPorDepto(fecha_m.year(), fecha_m.format('MM')).then(res => setDepartamentos(res)).catch(noop);

    return (<div className='col-xs-12 col-sm-4'>
        <div className='card border-danger mx-3'>
            <div className='card-header bg-danger text-white'>{trans('navbar.hallazgosAtendidos')}</div>
            <div className='card-body d-flex flex-column'>
                <table>
                    <thead>
                    <tr>
                        <th className='text-center'>{trans('navbar.departamento')}</th>
                        <th className='text-center'>{trans('navbar.porcentajeActos')}</th>
                        <th className='text-center'>{trans('navbar.porcentajeCondiciones')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(departamentos || []).map((depto, idx)=><tr key={idx}>
                        <td>{depto.nombre}</td>
                        <td className={`text-right ${depto.porcentaje_actos == 100 ? 'table-success' : 'table-danger'}`}>
                            {depto.porcentaje_actos} %
                        </td>
                        <td className={`text-right ${depto.porcentaje_condiciones == 100 ? 'table-success' : 'table-danger'}`}>
                            {depto.porcentaje_condiciones} %
                        </td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};


export default PorDepto;
