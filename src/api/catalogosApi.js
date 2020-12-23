import API from './axios';
import {
    cargando,
    ocultableDanger,
    guardadoCorrecto,
    cerrarAlert,
    cargadoCorrecto, errorCargar, errorGuardar
} from "../helpers/swalHelper";
import {isLogged} from "../helpers/authHelper";
import {trans} from "../services/lang.service";

//----------Métodos Generales-------------------//
export const getCatalogos = (solicitados, msg_cargando = true) => {
    if (msg_cargando)
        cargando();
    return API.post('catalogos/getMultiAllGenerico', {'peticiones': solicitados})
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                errorCargar(error);
            throw (error);
        });
};

export const getTrabajadoresActivos = (solicitados, msg_cargando = true) => {
    if (msg_cargando)
        cargando();
    return API.post('catalogos/getTrabajadoresActivos')
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                errorCargar(error);
            throw (error);
        });
};


export const getPermiso = (relaciones, msg_cargando) => {
    if (msg_cargando)
        cargando();
    return API.post(`catalogos/getAllGenerico/permiso`, {'relaciones': relaciones})
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                ocultableDanger(trans('navbar.errorDesconocido'), trans('navbar.errorAuth'));
            throw (error);
        });
};

export const guardarGenerico = (catalogo, datos) => {
    let direccion = 'catalogos/guardarGenerico/';
    let url = direccion + catalogo;
    return API.post(url, datos)
        .then(
            (res) => {
                guardadoCorrecto();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged()) {
                errorGuardar(error);
                throw (error);
            }
        });
};


export const getTrabajadorPorId = (id, relaciones, msg_cargando = false) => {
    if (msg_cargando)
        cargando();
    return API.post('catalogos/getTrabajador', {'trabajador_id': id, 'relaciones': relaciones})
        .then(
            (res) => {
                cerrarAlert();
                return res.data;
            }
        ).catch((error) => {
            if (isLogged())
                errorCargar(error);
            throw (error);
        });
};
