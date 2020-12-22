import {trans} from "../services/lang.service";
import API from '../api/axios';
import {getLS, setLS, limpiarLs} from './localstorage';
import {cargando, cerrarAlert, ocultableDanger} from "./swalHelper";

export const attemp = (username, password) => {
    cargando();
    return API.post('iniciarSesion', {username, password})
        .then((res) => {
            cerrarAlert();
            return res.data;
        }).catch((err) => {
            cerrarAlert();
            switch (err.response.status) {
                case 401:
                    ocultableDanger(trans('navbar.sinUsuarioAsignado'), trans('navbar.errorAuth'));
                    break;
                case 403:
                    ocultableDanger(trans('navbar.credencialesIncorrectas'), trans('navbar.errorAuth'));
                    break;
                case 500:
                default:
                    ocultableDanger(trans('navbar.errorDesconocido'), trans('navbar.errorAuth'));
                    break;
            }
            return err.response;
        });
};

export const loginTrabajador = (username, trabajador_id, password2) => {
    cargando();
    return API.post('logInTrabajador', {username, trabajador_id, password2})
        .then(
            (res) => {
                cerrarAlert()
                return res.data;
            }
        ).catch((error) => {
            ocultableDanger(trans('navbar.errorDesconocido'), trans('navbar.errorAuth'));
            console.error(error);
        });
};

export const creaSesion = (token) => {
    setLS('token', token);
    console.log("Voy a refrescar la pagina");
    window.location.reload();
    //recargaPermisos(secciones_permiso);
};

export const cerrarSesion = () => {
    limpiarLs('token');
};

//|-------Funciones del token------|//
const urlBase64Decode = (str) => {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }
    return window.atob(output);
};

export const getTId = () => getClaim('tId');

export const getUId = () => getClaim('uId');

export const getN = () => getClaim('n');

export const getU = () => getClaim('u');

export const getClaim = (claim) => getClaims()[claim];

const getClaims = () => {
    let token = getLS('token');
    let claims = {};
    if (typeof token !== 'undefined' && token !== null) {
        let payload = token.split('.');
        if (typeof payload[1] !== 'undefined' && payload[1] !== null) {
            claims = JSON.parse(urlBase64Decode(payload[1]));
        }
    }
    return claims;
};

export const isLogged = () => {
    let token = getLS('token');
    return typeof token !== 'undefined' && token !== null;
};

export const getToken = () => {
    let token = getLS('token');
    return token;
};
