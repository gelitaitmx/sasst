import {cargando, cerrarAlert, ocultableDanger} from "../helpers/swalHelper";
import API from "./axios";
import {returnGuardadoCorrecto, mostrarErrorCargar, mostrarErrorGuardar, returnCargadoCorrecto} from "./responsesApi";

export const getTrabajadoresAll = (mostrar_cargando = true, mostrar_correcto = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('trabajadores/getTrabajadoresAll', {}).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};
export const guardarRelTrabajadorDepartamento = (rel_trabajador_departamento, mostrar_cargando = true, mostrar_correcto = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('trabajadores/guardarRel', {rel_trabajador_departamento}).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};
export const restableceConteo = (trabajador_id, mostrar_cargando = true, mostrar_correcto = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('trabajadores/restablecerConteo', {trabajador_id}).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};
