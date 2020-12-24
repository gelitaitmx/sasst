import React, {useState} from "react";
import Template from "../Template/Template";
import moment from "moment";
import {useGlobal} from "reactn";
import Titulo from "../Template/Titulo";
import {trans} from "../../services/lang.service";
import DatePicker from "react-datepicker";


const PiramideResultados = () => {
    const [control, setControl] = useGlobal('control');
    const [fecha_inicio, setFechaInicio] = useState(moment().startOf('year').toDate());
    const [fecha_fin, setFechaFin] = useState(moment().endOf('year').toDate());
    return <Template>
        <Titulo titulo={trans('indicador.piramide')}/>
        <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center p-2">
                <strong className="p-2">
                    {trans('indicador.fecha_inicio')}
                </strong>
                <DatePicker
                    dateFormat="dd/mm/yyyy"
                    selected={fecha_inicio}
                    className={`form-control`}
                    onChange={(e) => setFechaInicio(e)}/>
            </div>
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
    return <div>
        {trans('indicador.diasSinAcciodentes')} {moment(fecha_fin).lang('es').format('LLL')}
    </div>
}

export default PiramideResultados;
