import React, {useState, useEffect} from 'react';
import {trans} from "../../services/lang.service";
import {noop} from "../../helpers/generalHelper";
import {getTrabajadoresMasHallazgos} from "../../api/hallazgoApi";
import {FaUserTimes} from "react-icons/all";
import moment from "moment";

const MasHallazgos = () => {
//|------Hooks------|//
    const [rels, setRels] = useState([]);

//|------UseEffects------|//
    useEffect(() => void (consultarTrabajadores()), []);

//|------Funciones------|//
    //|------API------|//
    const consultarTrabajadores = () => getTrabajadoresMasHallazgos().then(res => setRels(res)).catch(noop);

    return (<div className='col-4'>
        <div className='card border-danger mx-3'>
            <div className='card-header bg-danger text-white'>{trans('navbar.trabajadoresMasHallazgos')}</div>
            <div className='card-body d-flex flex-column'>
                {(rels || []).map((rel, idx) => <div key={idx} className='d-flex justify-content-between mb-2'>
                    <div className='d-flex'>
                        <span className=''><FaUserTimes/></span>
                        <span className='pt-1 ml-2'>{rel.trabajador.fullName}</span>
                    </div>
                    <div className='badge badge-danger px-2 py-1'>{rel.hallazgos_actual}</div>
                </div>)}
            </div>
        </div>
    </div>);
};


export default MasHallazgos;
