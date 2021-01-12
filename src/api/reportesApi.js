import {cargando, cerrarAlert, ocultableDanger} from "../helpers/swalHelper";
import API from "./axios";
import {returnGuardadoCorrecto, mostrarErrorCargar, mostrarErrorGuardar, returnCargadoCorrecto} from "./responsesApi";

export const getAtendidosPorDepto = (anyo, mes, mostrar_cargando = false, mostrar_correcto = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('reportes/getAtendidosPorDepto', {anyo, mes}).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};

export const getPiramide = (fecha, mostrar_cargando = false, mostrar_correcto = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('reportes/getPiramide', {fecha}).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};

export const getVideo = ( mostrar_cargando = false, mostrar_correcto = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('reportes/getVideo', {}).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};
