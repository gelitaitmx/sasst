import {cargando, cerrarAlert, ocultableDanger} from "../helpers/swalHelper";
import API from "./axios";
import moment from "moment";
import {isLogged} from "../helpers/authHelper";
import {trans} from "../services/lang.service";


export const getAllHallazgos = (fechas, relaciones, msg_cargando = true) => {
    if (msg_cargando)
        cargando();
    return API.post('hallazgos/consultar', {
        'filtros': {
            fecha_inicio: moment(fechas.inicio).format('YYYY-MM-DD'),
            fecha_fin: moment(fechas.fin).format('YYYY-MM-DD')
        }, relaciones: relaciones
    })
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                ocultableDanger(trans('general.errorAlCargar'), trans('general.error'));
            throw (error);
        });
};

export const guardarHallazgo = (hallazgo, msg_cargando = true) => {
    if (msg_cargando)
        cargando();
    return API.post('hallazgos/guardarHallazgo', {hallazgo: hallazgo})
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                ocultableDanger(trans('general.errorAlCargar'), trans('general.error'));
            throw (error);
        });
};


export const guardarAccion = (accion, hallazgo_id, msg_cargando = true) => {

    let accion_guardar = {descripcion:accion.descripcion, fecha_verificacion: moment(accion.fecha_verificacion).format('YYYY-MM-DD')};
    if (msg_cargando)
        cargando();

    return API.post('hallazgos/guardarAccionCorrectiva', {'accion_correctiva': accion_guardar, 'hallazgo_id': hallazgo_id})
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                ocultableDanger(trans('general.errorAlCargar'), trans('general.error'));
            throw (error);
        });
};
