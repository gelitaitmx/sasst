import {cargando, cerrarAlert, errorGuardar, ocultableDanger} from "../helpers/swalHelper";
import API from "./axios";
import {returnGuardadoCorrecto, mostrarErrorCargar, mostrarErrorGuardar, returnCargadoCorrecto} from "./responsesApi";
import moment from "moment";
import axios from 'axios';
import {getLS} from "../helpers/localstorage";


export const consultar = ( relaciones = [], mostrar_cargando = true, mostrar_correcto = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('adjuntos/getAll', {
        order: 'asc',
        relaciones
    }).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};

export const consultaPorTipo = (tipo_documento_id, relaciones = [], mostrar_cargando = true, mostrar_correcto = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('adjuntos/getPorTipo', {
        tipo_documento_id,
        relaciones
    }).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};

export const guardarAdjuntoConTipo = (documento, mostrar_cargando = true, mostrar_correcto = true, mostrar_error = true) => {
    console.log(documento);
    var formData = new FormData();
    formData.append(`adjuntos[${0}]`, documento.adjunto);
    formData.append(`adjunto[tipo_documento_id]`, documento.tipo_documento_id);
    formData.append(`adjunto[fecha]`, moment(documento.fecha).format('YYYY-MM-DD'));
    if (mostrar_cargando)
        cargando();
    return API.post('adjuntos/guardarAdjuntoConTipo', formData).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};


export const descarga = (adjunto_id, adjunto_nombre) => {
    cargando();
    axios({
        url: `${process.env.REACT_APP_URL_API}/adjuntos/descargar/${adjunto_id}`,
        method: 'POST',
        responseType: 'blob',
        headers: {Authorization: `Bearer ${getLS('token')}`}
    }).then((response) => {
        validaExtencionAdjunto(adjunto_nombre, response.data);
        cerrarAlert();
    }).catch(() => mostrarErrorCargar())
};


const validaExtencionAdjunto = (adjunto_nombre, data) => {
    var extencion = adjunto_nombre.split('.')[1];
    switch (extencion) {
        case 'pdf':
            BlobAdjunto(data, `application/Pdf`);
            break;
        case 'png':
            BlobAdjunto(data, 'image/png');
            break;
        case 'jpg':
            BlobAdjunto(data, 'image/jpg');
            break;
        case 'jpeg':
            BlobAdjunto(data, 'image/jpeg');
            break;
        default:
            descargarAdjunto(data, adjunto_nombre);
            break;
    }
}


const BlobAdjunto = (data, type) => {
    var file = new Blob([data], {type: type});
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
};

const descargarAdjunto = (data, nombre) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', nombre);
    document.body.appendChild(link);
    link.click();
};
