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


const Indicadores = () => {
    const [control, setControl] = useGlobal('control');
    const [monthYear, setMonthYear] = useState(null);
    const [parametros_indicadores, setParametrosIndicadores] = useState([]);

    useEffect(() => {
        if (monthYear != null) consultaIndicadores()
    }, [monthYear]);
    useEffect(() => cargarCatalogos(), []);

    const consultaIndicadores = () => consultar(monthYear).then(res => {
        console.log(res);
        let fecha = moment(monthYear).format('MM/YYYY');
        setParametrosIndicadores(produce(draft => {
            draft.map(par => {
                par.parametro_indicador_id = par.id;
                par.mes = fecha.split('/')[0];
                par.anyo = fecha.split('/')[1];
                let ind = res.length >  0 ? (res || []).filter(ind => {
                    if (ind.parametro_indicador_id == par.id)
                        return ind
                })[0] : null;
                par.valor = ind != null ? ind.valor : null;
                par.id = null;
            })
        }));
    });

    const cargarCatalogos = () => {
        getCatalogos([{nombre: 'parametro_indicador', relaciones: []}]).then(res => {
            setParametrosIndicadores(res.parametro_indicador.data);
        });
    };


    const guardaIndicadores = () => {
        guardarIndicadores(parametros_indicadores).then(res => {
          consultaIndicadores();
        })
    };

    const actualizaParametros = (idx, valor) => {
        setParametrosIndicadores(produce(draft => {
            draft[idx].valor = valor
        }));
    };
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
        {
            monthYear &&
            <div className="d-flex justify-content-center">
                <div className="card border-primary ">
                    <div className="card card-header">
                        {trans('indicador.parametros')}
                    </div>
                    <div className="p-3">
                        {
                            (parametros_indicadores || []).map((parametro, key) =>
                                <div className="d-flex justify-content-between" key={key}>
                                    <span className="text-nowrap">{trans(`indicador.${parametro.nombre}`)}</span>
                                    <input className="form-control w-25" type="number"
                                           onChange={e => actualizaParametros(key, e.target.value)}
                                           value={parametro.valor}/>
                                </div>
                            )
                        }

                    </div>
                    <div className="card-footer d-flex justify-content-end">
                        <button className="btn btn-outline-success" onClick={e => guardaIndicadores()}>
                            <FaSave/> {trans('general.guardar')}</button>
                    </div>
                </div>
            </div>
        }

    </Template>
}

export default Indicadores;
