import React, {useEffect, useState} from "react";
import Template from "../Template/Template";
import {useGlobal} from "reactn";
import {trans} from "../../services/lang.service";
import DatePicker from "react-datepicker";
import moment from "moment";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {indicador} from "../../lang/es";

const Graficas = () => {
        const [control, setControl] = useGlobal('control');
        const [anio, setAnio] = useState(moment().toDate());
        const [indicadores, setIndicadores] = useState({
            condiciones_inseguras: {
                enero: 1,
                febrero: 2,
                marzo: 5,
                abril: 2,
                mayo: 8,
                junio: 2,
                julio:7,
                agosto: 2,
                septiembre:12,
                octubre: 20,
                novimebre:12,
                diciembre: 52,
            }
        });


        useEffect(() => {
            if (anio != null) cargarDatos()
        }, [anio]);


        const cargarDatos = () => {

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
                    <Acordion id={'CONIN'} heading={'headingCONIN'} indicador={indicadores.condiciones_inseguras}/>
                    <Acordion id={'ACTIN'} heading={'headingACTIN'}/>
                    <Acordion id={'ACCID'} heading={'headingACCID'}/>
                    <Acordion id={'TRARI'} heading={'headingTRARI'}/>
                    <Acordion id={'USEPP'} heading={'headingUSEPP'}/>
                    <Acordion id={'CAPAC'} heading={'headingCAPAC'}/>
                </div>
            </div>
        </Template>
    }
;


const Acordion = ({id, heading, indicador = {}}) => {
    const crearData = () => {
        return  [
            indicador.enero,
            indicador.febrero,
            indicador.marzo,
            indicador.abril,
            indicador.mayo,
            indicador.junio,
            indicador.julio,
            indicador.agosto,
            indicador.septiembre,
            indicador.octubre,
            indicador.novimebre,
            indicador.diciembre,
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
                   <div>
                       <div className="card border-primary p-2">
                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.enero')}</strong></div>
                               <div>{indicador.enero}</div>
                           </div>
                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.febrero')}</strong></div>
                               <div>{indicador.febrero}</div>
                           </div>
                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.marzo')}</strong></div>
                               <div>{indicador.marzo}</div>
                           </div>
                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.abril')}</strong></div>
                               <div>{indicador.abril}</div>
                           </div>
                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.mayo')}</strong></div>
                               <div>{indicador.mayo}</div>
                           </div>
                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.junio')}</strong></div>
                               <div>{indicador.junio}</div>
                           </div>
                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.julio')}</strong></div>
                               <div>{indicador.julio}</div>
                           </div>
                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.agosto')}</strong></div>
                               <div>{indicador.agosto}</div>
                           </div>
                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.septiembre')}</strong></div>
                               <div>{indicador.septiembre}</div>
                           </div>
                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.octubre')}</strong></div>
                               <div>{indicador.octubre}</div>
                           </div>

                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.novimebre')}</strong></div>
                               <div>{indicador.novimebre}</div>
                           </div>
                           <div className="d-flex justify-content-between">
                               <div><strong>{trans('indicador.diciembre')}</strong></div>
                               <div>{indicador.diciembre}</div>
                           </div>
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
                            subtitle:{
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
                                    data:crearData()
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
