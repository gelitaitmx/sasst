import {setGlobal, getGlobal} from 'reactn';
import {getUId} from "../helpers/authHelper";
import API from "../api/axios";

const TIEMPO_ESPERA_REGARGA = 500;
const INTENTOS_CARGA_PERMISOS = 5;

export const cargarPermisos = () => {
    setGlobal({...getGlobal(), control: {...getGlobal().control, permisos: []}});//Inicio el arreglo vacío
    const username_id = getUId();
    return API.post('getAllPermisos', {usernameId: username_id}).then((res) => {
        let permisos = res.data.map(permiso => `${permiso.seccion.nombre}.${permiso.nombre}`);
        setGlobal({...getGlobal(), control: {...getGlobal().control, permisos}});
    });
};

export const permisosCargados = () => getGlobal().control.permisos != null;

export const can = (permiso) => (getGlobal().control.permisos || []).indexOf(permiso) >= 0;
