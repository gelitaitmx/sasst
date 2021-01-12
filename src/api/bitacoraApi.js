import {cargando, cerrarAlert, ocultableDanger} from "../helpers/swalHelper";
import API from "./axios";
import {returnGuardadoCorrecto, mostrarErrorCargar, mostrarErrorGuardar, returnCargadoCorrecto} from "./responsesApi";

export const getDisponibles = (mostrar_cargando = false, mostrar_correcto = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post('bitacora/getDisponibles', {}).then(res => mostrar_correcto ? returnCargadoCorrecto(res.data) : res.data).catch((err) => mostrar_error ? mostrarErrorCargar(err) : err);
};

