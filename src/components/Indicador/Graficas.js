import React, {useEffect, useState} from "react";
import Template from "../Template/Template";
import {useGlobal} from "reactn";
import {trans} from "../../services/lang.service";
import DatePicker from "react-datepicker";
import moment from "moment";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {indicador} from "../../lang/es";
import {consutarReportePorAnyo} from "../../api/indicadorApi";

const Graficas = () => {
        const [control, setControl] = useGlobal('control');
        const [anio, setAnio] = useState(moment().toDate());
        const [datos, setDatos] = useState([]);
        const [indicador, setIndicador] = useState({});


        useEffect(() => {
            if (anio != null) cargarDatos()
        }, [anio]);


        const cargarDatos = () => {
            consutarReportePorAnyo(anio).then(res => {
                console.log(res);
                setIndicador(res);
            })
        }


        return <Template>
            <div className="d-flex justify-content-center p-2">
                <strong className="p-2">
                    {trans('indicador.fecha')}
                </strong>
                <DatePicker
                    showYearPicker
                    dateFormat="yyyy"
                    yearItemNumber={9}
                    selected={anio}
                    className={`form-control`}
                    onChange={(e) => setAnio(e)}/>
            </div>
            <div className="container">
                <div id="accordion">
                    <Acordion id={'ACCID'} heading={`headingETC`} indicador={indicador.dpa} clave="dpa"/>
                    <Acordion id={'ACTIN'} heading={`headingETC`} indicador={indicador.ais} clave="ais"/>
                    <Acordion id={'CAPAC'} heading={`headingETC`} indicador={indicador.capacitacion} clave="capacitacion"/>
                    <Acordion id={'CONIN'} heading={`headingETC`} indicador={indicador.ect} clave="ect"/>
                    <Acordion id={'TRARI'} heading={`headingETC`} indicador={indicador.efectividad_riesgo}
                              clave="efectividad_riesgo"/>
                    <Acordion id={'USEPP'} heading={`headingETC`} indicador={indicador.efectividad_epp}
                              clave="efectividad_epp"/>

                </div>
            </div>
        </Template>
    }
;


const Acordion = ({id, heading, indicador = [], clave = ''}) => {
    const crearData = () => {
       return [
           indicador[1] != null && indicador[1][clave] !== null ? indicador[1][clave] : 0,
           indicador[2] != null && indicador[2][clave] !== null ? indicador[2][clave] : 0,
           indicador[3] != null && indicador[3][clave] !== null ? indicador[3][clave] : 0,
           indicador[4] != null && indicador[4][clave] !== null ? indicador[4][clave] : 0,
           indicador[5] != null && indicador[5][clave] !== null ? indicador[5][clave] : 0,
           indicador[6] != null && indicador[6][clave] !== null ? indicador[6][clave] : 0,
           indicador[7] != null && indicador[7][clave] !== null ? indicador[7][clave] : 0,
           indicador[8] != null && indicador[8][clave] !== null ? indicador[8][clave] : 0,
           indicador[9] != null && indicador[9][clave] !== null ? indicador[9][clave] : 0,
           indicador[10] != null && indicador[10][clave] !== null ? indicador[10][clave] : 0,
           indicador[11] != null && indicador[11][clave] !== null ? indicador[11][clave] : 0,
           indicador[12] != null && indicador[12][clave] !== null ? indicador[12][clave] : 0,
       ]
    }
    return <div className="card">
        <div className="card-header" id={heading}>
            <h5 className="mb-0">
                <button className="btn btn-link collapsed" data-toggle="collapse" data-target={`#${id}`}
                        aria-expanded="false" aria-controls={id}>
                    ${trans('indicador.comportamiento')} ${trans(`indicador.${id}`)}
                </button>
            </h5>
        </div>

        <div id={id} className="collapse" aria-labelledby={heading}
             data-parent="#accordion">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div className="w-25">
                        <div className="card border-primary p-2 ">
                            {
                                ( [1,2,3,4,5,6,7,8,9,10,11,12]).map(mes =>
                                    <div className="d-flex justify-content-between w-100">
                                        <div><strong>{trans(`indicador.${mes}`)}</strong></div>
                                        <div> {indicador[mes] != null && indicador[mes][clave] != null ? indicador[mes][clave] :''}</div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    <div>
                        <HighchartsReact highcharts={Highcharts} options={{
                            chart: {
                                type: 'spline'
                            },
                            title: {
                                text: `${trans('indicador.comportamiento')} -${trans(`indicador.${id}`)}`
                            },
                            subtitle: {
                                text: `${process.env.REACT_APP_EMPRESA} - ${process.env.REACT_APP_LOCATION} `
                            },
                            xAxis: {

                                categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Novimebre', 'Diciembre'],
                                title: {
                                    text: 'Meses'
                                }
                            },
                            yAxis: {
                                title: {
                                    text: 'Valor'
                                }
                            },
                            series: [
                                {
                                    name: `${trans(`indicador.${id}`)}`,
                                    data: crearData()
                                }
                            ]
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Graficas;
