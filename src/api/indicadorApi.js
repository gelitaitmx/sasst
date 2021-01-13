import {cargando, cerrarAlert, errorGuardar, ocultableDanger} from "../helpers/swalHelper";
import API from "./axios";
import {returnGuardadoCorrecto, mostrarErrorCargar, mostrarErrorGuardar, returnCargadoCorrecto} from "./responsesApi";
import moment from "moment";
import axios from 'axios';
import {getLS} from "../helpers/localstorage";


export const consultar = ( fecha,  relaciones = [], mostrar_cargando = true, mostrar_correcto = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    let fecha_consulta = moment(fecha).format('MM/YYYY');
    return API.post('reportes/getReporteIndicadoresPorMesAnyo', {
        mes: fecha_consulta.split('/')[0],
        anyo: fecha_consulta.split('/')[1],
        relaciones
    }).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};

export const consutarReportePorAnyo  = ( fecha,  relaciones = [], mostrar_cargando = true, mostrar_correcto = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    let anyo = moment(fecha).format('YYYY');
    return API.post('reportes/getReporteIndicadoresPorAnyo', {
        anyo: anyo,
        relaciones
    }).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};


export const consultaPiramide  = ( fecha,  relaciones = [], mostrar_cargando = true, mostrar_correcto = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    let anyo = moment(fecha).format('YYYY-MM-DD');
    return API.post('reportes/getPiramide', {
        fecha: fecha,
        relaciones
    }).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};


export const guardarIndicadores = (indicadores, mostrar_cargando = true, mostrar_correcto = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('indicador/guardar', {indicadores}).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};


