import React, {useState, useEffect} from 'react';
import {trans} from "../../services/lang.service";
import {noop} from "../../helpers/generalHelper";
import {getUltimos5} from "../../api/hallazgoApi";
import {FaExclamationTriangle} from "react-icons/all";
import moment from "moment";

const PanelUltimos5 = () => {
//|------Hooks------|//
    const [hallazgos, setHallazgos] = useState([]);

//|------UseEffects------|//
    useEffect(() => void(consultarUltimos5()), []);

//|------Funciones------|//
    //|------API------|//
    const consultarUltimos5 = () => getUltimos5().then(res => setHallazgos(res)).catch(noop);

    return (<div className='col-xs-12 col-sm-4'>
        <div className='card border-danger mx-3'>
            <div className='card-header bg-danger text-white'>{trans('navbar.ultimos5Hallazgos')}</div>
            <div className='card-body d-flex flex-column'>
                {(hallazgos || []).map((hallazgo, idx) => <Hallazgo hallazgo={hallazgo} key={idx}/>)}
            </div>
        </div>
    </div>);
};

const Hallazgo = ({hallazgo}) => <div className='d-flex flex-column font-small'>
    <div className='d-flex'>
        <span>{moment(hallazgo.fecha).format('DD/MM/YYYY HH:mm')}</span>
        <span className='font-weight-bold mx-2'> {hallazgo.nombre_reportado}</span>
    </div>
    <span className='pl-5'><FaExclamationTriangle/> {hallazgo.descripcion.slice(0,50)}</span>
</div>;

export default PanelUltimos5;
