import React, {useEffect, useState} from "react";
import Template from "../Template/Template";
import {useGlobal} from "reactn";
import moment from "moment";
import {getCatalogos} from "../../api/catalogosApi";
import {consultarAtendidosPorDepto} from "../../api/indicadorApi";
import DatePicker from "react-datepicker";
import {trans} from "../../services/lang.service";

const AtendidoPorMes = () => {
    const [control, setControl] = useGlobal('control');
    const [catalogos, setCatalogos] = useState([]);
    const [departamento, setDepartamento] = useState({});
    const [bita, setBita] = useState([]);
    const [fecha, setFecha] = useState(moment().toDate());
    const  [meses , setMeses] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);

    useEffect(() => {
       // consultarCatalogos();
        consultarResultados();
    }, []);


    const consultarCatalogos = () => {
        getCatalogos([{nombre: 'departamento', relaciones: []}]).then(res => {
            console.log(res);
            setCatalogos(res);
        })
    };

    const consultarResultados  = () => {
        consultarAtendidosPorDepto().then( res => {
            console.log(res);
            setBita(res);
        })
    }


    const seleccionaDepartamento = (dep) => {
        setDepartamento(dep);
        console.log(dep);
    }



    return <Template>
        <div className="d-flex justify-content-around">
            <div>
                <div className="pb-1 pt-1">
                    <DatePicker
                        showYearPicker
                        dateFormat="yyyy"
                        yearItemNumber={9}
                        selected={fecha}
                        className={`form-control`}
                        onChange={(e) => setFecha(e)}/>
                </div>
                <div className="card pl-1 pr-1 ">
                    {
                        (bita  || []).map(dep =>
                            <div onClick={e => seleccionaDepartamento(dep)}
                                 className={dep.nombre === departamento.nombre ? 'bg-primary text-white rounded text-center' : 'text-center'}>
                                {dep.nombre}
                                <hr className="primary-color p-0 m-1 "/>
                            </div>
                        )
                    }

                </div>
            </div>
            <div>
                <div>
                    <table className="table table-hover table-bordered  table-condensed">
                        <thead className="thead-dark">
                        <tr>
                            <th>{trans('indicador.mes')}</th>
                            <th>{trans('indicador.actos')}</th>
                            <th>{trans('indicador.condiciones')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {

                            (meses || []).map( mes =>
                            <tr>
                                <td>{trans( `indicador.${mes}`)}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div>

                </div>
            </div>
        </div>
    </Template>
};

export default AtendidoPorMes;
