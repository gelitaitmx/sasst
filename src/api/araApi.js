import {cargando, cerrarAlert, ocultableDanger} from "../helpers/swalHelper";
import API from "./axios";
import {returnGuardadoCorrecto, mostrarErrorCargar, mostrarErrorGuardar, returnCargadoCorrecto} from "./responsesApi";


export const consulta = (filtros =[], relaciones = [], mostrar_cargando = true, mostrar_correcto = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('ara/consultar', {filtros, relaciones}).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};

export const getAra = (ara_id, relaciones = [], mostrar_cargando = true, mostrar_correcto = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('ara/getAra', {ara_id, relaciones}).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};
