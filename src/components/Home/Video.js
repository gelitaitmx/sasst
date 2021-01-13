import React, {useState, useEffect} from 'react';
import {trans} from "../../services/lang.service";
import {noop} from "../../helpers/generalHelper";
import {getVideo} from "../../api/reportesApi";
import {FaExclamationTriangle} from "react-icons/all";
import moment from "moment";

const Video = () => {
//|------Hooks------|//
    const [video, setVideo] = useState({});

//|------UseEffects------|//
    useEffect(() => void (cargarVideo()), []);

//|------Funciones------|//
    //|------API------|//
    const cargarVideo = () => getVideo().then(res => setVideo(res)).catch(noop);

    return (<div className='col-xs-12 col-sm-4'>
        <div className='card border-info mx-3'>
            <div className='card-header bg-info text-white'>{trans('navbar.ultimos5Hallazgos')}</div>
            <div className='card-body d-flex flex-column'>
                <video width="100%" height="35%" controls={true} key={video.id}>
                    <source src={video.url1} type="video/mp4"/>
                    <source src={video.url2} type="video/ogg"/>
                    <source src={video.url3} type="video/webm"/>
                    <em>No puede ver el video en este navegador, instale Chrome o contacte al área de sistemas</em>
                </video>
            </div>
        </div>
    </div>);
};


export default Video;
