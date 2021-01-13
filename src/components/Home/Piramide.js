import React, {useState, useEffect} from 'react';
import {trans} from "../../services/lang.service";
import {noop} from "../../helpers/generalHelper";
import {getPiramide} from "../../api/reportesApi";
import {FaExclamationTriangle} from "react-icons/all";
import moment from "moment";
import 'moment/locale/es-mx';

const Piramide = ({fecha}) => {
    moment.locale('es-mx')
//|------Hooks------|//
    const [piramide, setPiramide] = useState([]);
    const [fecha_m, setFechaM] = useState(moment(fecha));

//|------UseEffects------|//
    useEffect(() => void (consultarPiramide()), []);

//|------Funciones------|//
    //|------API------|//
    const consultarPiramide = () => getPiramide(fecha_m.format('YYYY-MM-DD')).then(res => setPiramide(res)).catch(noop);

    return (<div className='col-xs-12 col-sm-4 pt-0'>
        <div className='card border-success mx-3 text-small'>
            <div className='card-header bg-success text-white'>{trans('navbar.piramideSeguridad')}</div>
            <div className='card-body py-0'>
                <div className='col-md-12 col-sm-12 col-xs-12 col-lg-12 text-center'>
                    <div className="etiqueta">
                        <u>{trans('navbar.diasSinAccidentes')} {fecha_m.format('D [de] MMMM [de] YYYY')}</u></div>
                    <div className='barraPiramide barra1'>
                        <div className="rotuloBlanco">{trans('navbar.record')}</div>
                        <div className="cajaBlancaDato">{piramide.dias_record}</div>
                        <div className="rotuloBlanco">{trans('navbar.actual')}</div>
                        <div className="cajaBlancaDato">{piramide.dias_sin_accidentes}</div>
                    </div>
                    <div className="etiqueta"><u>{trans('navbar.accidentes')}</u></div>
                    <div className='barraPiramide barra2'>
                        <div className="rotuloBlanco">{trans('navbar.mes')} {fecha_m.format('MMMM')}:</div>
                        <div className="cajaBlancaDato">{piramide.accidentes_mes}</div>
                        <div className="rotuloBlanco">{trans('navbar.acumulado')} {fecha_m.year()}:</div>
                        <div className="cajaBlancaDato">{piramide.accidentes_anyo}</div>
                    </div>
                    <div className="etiqueta"><u>{trans('navbar.incidentes')}</u></div>
                    <div className='barraPiramide barra3'>
                        <div className="rotuloNegro">{trans('navbar.mes')} {fecha_m.format('MMMM')}:</div>
                        <div className="cajaBlancaDato">{piramide.incidentes_mes}</div>
                        <div className="rotuloNegro">{trans('navbar.acumulado')} {fecha_m.year()}:</div>
                        <div className="cajaBlancaDato">{piramide.incidentes_anyo}</div>
                    </div>
                    <div className="etiqueta">
                        <u>{trans('navbar.actosInsegurosDia')}&nbsp;
                            {fecha_m.startOf('month').format('DD/MM/YYYY')} al&nbsp;
                            {moment(fecha).format('DD/MM/YYYY')}</u>
                    </div>
                    <div className='barraPiramide barra4'>
                        <div className="rotuloNegro">{trans('navbar.mes')} {fecha_m.format('MMMM')}:</div>
                        <div className="cajaBlancaDato">{piramide.actos_inseguros_mes}</div>
                        <div className="rotuloNegro">{trans('navbar.acumulado')} {fecha_m.year()}:</div>
                        <div className="cajaBlancaDato">{piramide.actos_inseguros_anyo}</div>
                    </div>
                    <div className="etiqueta"><u>{trans('navbar.condicionesInsegurasDia')}&nbsp;
                        {fecha_m.startOf('month').format('DD/MM/YYYY')} al&nbsp;
                        {moment(fecha).format('DD/MM/YYYY')}</u>
                    </div>
                    <div className='barraPiramide barra5'>
                        <div className="rotuloNegro">{trans('navbar.mes')} {fecha_m.format('MMMM')}:</div>
                        <div className="cajaBlancaDato">{piramide.condiciones_inseguras_mes}</div>
                        <div className="rotuloNegro">{trans('navbar.acumulado')} {fecha_m.year()}:</div>
                        <div className="cajaBlancaDato">{piramide.condiciones_inseguras_anyo}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};


export default Piramide;
