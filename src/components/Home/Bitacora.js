import React, {useState, useEffect} from 'react';
import {trans} from "../../services/lang.service";
import {noop} from "../../helpers/generalHelper";
import {getDisponibles} from "../../api/bitacoraApi";
import {FaClock} from "react-icons/all";
import moment from "moment";

const Bitacora = () => {
//|------Hooks------|//
    const [registros, setRegistros] = useState([]);

//|------UseEffects------|//
    useEffect(() => void (cargarRegistros()), []);

//|------Funciones------|//
    //|------API------|//
    const cargarRegistros = () => getDisponibles().then(res => setRegistros(res)).catch(noop);

    return (<div className='col-xs-12 col-sm-4'>
        <div className='card border-info mx-3'>
            <div className='card-header bg-info text-white'>{trans('navbar.bitacora')}</div>
            <div className='card-body d-flex flex-column'>
                {(registros || []).map((reg, idx)=><div className='d-flex' key={idx}>
                    <FaClock/>
                    <span className='mx-2'>{moment(reg.fecha).format('DD/MM/YYYY HH:mm')}</span>
                    <span className='font-weight-bold'>{reg.descripcion}</span>
                </div>)}
            </div>
        </div>
    </div>);
};


export default Bitacora;
