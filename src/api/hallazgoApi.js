import {cargando, cerrarAlert, ocultableDanger} from "../helpers/swalHelper";
import API from "./axios";
import moment from "moment";
import {isLogged} from "../helpers/authHelper";
import {trans} from "../services/lang.service";
import {mostrarErrorCargar, mostrarErrorGuardar} from "./responsesApi";


export const getAllHallazgos = (filtros, relaciones, msg_cargando = true) => {
    if (msg_cargando)
        cargando();
    return API.post('hallazgos/consultar', {
        'filtros': {
            fecha_inicio: moment(filtros.fechas.inicio).format('YYYY-MM-DD'),
            fecha_fin: moment(filtros.fechas.fin).format('YYYY-MM-DD'),
            departamento_id: filtros.departamento_id,
        }, relaciones: relaciones
    })
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                mostrarErrorCargar(error);
            throw (error);
        });
};

export const getHallazgoId = (id, relaciones = [], msg_cargando = true) => {
    if (msg_cargando)
        cargando();
    return API.post('hallazgos/get', {
        hallazgo_id: id, relaciones: relaciones
    })
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                mostrarErrorCargar(error);
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
                mostrarErrorGuardar(error);
            throw (error);
        });
};

export const validaHallazgo = (hallazgo_id, responsable_id, msg_cargando = true) => {
    if (msg_cargando)
        cargando();
    return API.post('hallazgos/validarHallazgo', {'hallazgo_id': hallazgo_id, 'responsable_id': responsable_id})
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                mostrarErrorGuardar(error);
            throw (error);
        });
};


export const quitarValidacion = (hallazgo_id, msg_cargando = true) => {
    if (msg_cargando)
        cargando();
    return API.post('hallazgos/quitarValidacion', {'hallazgo_id': hallazgo_id})
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                mostrarErrorGuardar(error);
            throw (error);
        });
};

export const validarAccionCorrectiva = (accion_id, msg_cargando = true) => {
    if (msg_cargando)
        cargando();
    return API.post('hallazgos/validarAccionCorrectiva', {'accion_correctiva_id': accion_id})
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                mostrarErrorGuardar(error);
            throw (error);
        });
};


export const guardarAccion = (accion, hallazgo_id, msg_cargando = true) => {
    let accion_guardar = {
        descripcion: accion.descripcion,
        fecha_verificacion: moment(accion.fecha_verificacion).format('YYYY-MM-DD')
    };
    if (msg_cargando)
        cargando();
    return API.post('hallazgos/guardarAccionCorrectiva', {
        'accion_correctiva': accion_guardar,
        'hallazgo_id': hallazgo_id
    })
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                mostrarErrorGuardar(error);
            throw (error);
        });
};
