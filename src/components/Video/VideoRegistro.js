import React, {useEffect, useState} from "react";
import {useGlobal} from "reactn";
import Template from "../Template/Template";
import {trans} from "../../services/lang.service";
import produce from "immer";
import Video from "../Home/Video";
import {getVideo} from "../../api/reportesApi";
import {noop} from "../../helpers/generalHelper";
import {guardarGenerico} from "../../api/catalogosApi";

export const VideoRegistro = () => {
    const [control, setControl] = useGlobal('control');
    const [video, setVideo] = useState({});

    useEffect(()=>{
        cargarVideo();
    }, []);

    const actualizaVideo = (propiedad, valor) => {
        console.log(propiedad, valor);
        setVideo(produce(draft => {
                draft[propiedad] = valor
            })
        );
    }

    const cargarVideo = () => getVideo().then(res => setVideo(res)).catch(noop);
    const guardarVideo = () => guardarGenerico('video', video).then(res => window.location.reload()).catch(noop);

    return <Template>
        <div className="d-flex justify-content-around pt-4">
            <div className="pt-2">
                <div className="d-flex justify-content-center flex-column card border-primary ">
                    <div className="card-header">
                        {trans('indicador.direccionVideo')}
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-around">
                            <div className="pr-2">{trans('indicador.urlMp4')}</div>
                            <div><input className="input-sm" value={video.url1}
                                        onChange={e => actualizaVideo('url1', e.target.value)}/></div>
                        </div>
                        <div className="d-flex justify-content-around">
                            <div className="pr-2">{trans('indicador.urlOgg')}</div>
                            <div><input className="input-sm" value={video.url2}
                                        onChange={e => actualizaVideo('url2', e.target.value)}/></div>
                        </div>
                        <div className="d-flex justify-content-around">
                            <div className="pr-2">{trans('indicador.urlWeb')}</div>
                            <div><input className="input-sm" value={video.url3}
                                        onChange={e => actualizaVideo('url3', e.target.value)}/></div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-success" onClick={e=>guardarVideo()}>
                                {trans('general.guardar')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <video controls={true} className="w-50 h-50 card border-primary" key={video.id}>
                <source src={video.url1} type="video/mp4"/>
                <source src={video.url2} type="video/ogg"/>
                <source src={video.url3} type="video/webm"/>
                <em>No puede ver el video en este navegador, instale Chrome o contacte al área de sistemas</em>
            </video>
        </div>
    </Template>
};


export default VideoRegistro;
