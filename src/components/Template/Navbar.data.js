import {trans} from "../../services/lang.service";
import {
    FaList,
    FaWrench,
    FaAutoprefixer,
    FaGripVertical,
    FaFileAlt,
    FaHammer,
    FaFire,
    FaUser,
    FaPlusCircle, FaInfo, FaChartLine, FaGopuram
} from "react-icons/all";
import {can, permisosCargados} from "../../services/seguridad.service";

/**
 * Estructura de Menu
 * keyLang: Key a cargar en el lang
 * icono: Debe ser importado de react icons
 * visible: condicion para mostrar
 * tipo: navLink | simple | dropdown
 * nlOptions: Propiedades de navlink (to/)
 * onClick: Sólo funciona para tipo simple
 */

export const ITEMS_IZQUIERDA = {
    menus: [
        {
            keyLang: 'navbar.registrar',
            icono: FaPlusCircle,
            permiso: 'navbar.registrar_hallazgo',
            tipo: 'navlink',
            nlOptions: {to: '/hallazgo/registro'}
        },  {
            keyLang: 'navbar.hallazgo',
            icono: FaList,
            permiso: 'navbar.ver_hallazgos',
            tipo: 'navlink',
            nlOptions: {to: '/hallazgo/Listado'}
        }, {
            keyLang: 'navbar.acciones',
            icono: FaAutoprefixer,
            permiso:'navbar.ver_acciones',
            tipo: 'navlink',
            nlOptions: {to: '/acciones/Listado'}
        },
        {
            keyLang: 'navbar.admin',
            icono: FaWrench,
            permiso: 'navbar.ver_admin',
            tipo: 'dropdown',
            navlinks: [
                {keyLang: 'navbar.control', to: "/admin/control", 'icono': FaList, visible: true},
                {keyLang: 'navbar.acciones', to: "/admin/acciones/ADMIN", 'icono': FaAutoprefixer, visible: true},
                {keyLang: 'navbar.trabajadores', to: "/trabajadores", 'icono': FaUser, visible: true},
                {keyLang: 'navbar.bitacora', to: "/admin/bitacora", 'icono': FaUser, visible: true},
            ]
        },
        {
            keyLang: 'navbar.analisisRiesgo',
            icono: FaGripVertical,
            permiso: 'navbar.ver_analisis',
            tipo: 'dropdown',
            navlinks: [
                {keyLang: 'navbar.documentos', to: "/documentos", 'icono': FaFileAlt, visible: true},
                {keyLang: 'navbar.ara', to: "/aras", 'icono': FaHammer, visible: true},
                {keyLang: 'navbar.simulacros', to: "/documentos/SIMU", 'icono': FaFire, visible: true},
            ]
        }
    ]
};
export const ITEMS_DERECHA = {
    menus: [
        {
            keyLang: 'navbar.reportes',
            icono: FaList,
            permiso: 'navbar.ver_reportes',
            tipo: 'dropdown',
            navlinks: [
                {keyLang: 'navbar.piramide', to: "/indicadores/piramide", 'icono': FaGopuram},
                {keyLang: 'navbar.indicadoresAdmin', to: "/indicadores/listado", 'icono': FaInfo},
                {keyLang: 'navbar.indicadoresReporte', to: "/indicadores/reporte", 'icono': FaFileAlt},
                {keyLang: 'navbar.indicadoresGraficas', to: "/indicadores/graficas", 'icono': FaChartLine},
                {keyLang: 'navbar.video', to: "/indicadores/video", 'icono': FaChartLine},
            ]
        }
    //     {
    //         keyLang: 'general.admin',
    //         icono: FaList,
    //         visible: true,
    //         tipo: 'dropdown',
    //         navlinks: [
    //             {keyLang: 'nose.1', to: "reportes/uno"},
    //             {keyLang: 'nose.1', to: "reportes/dos", icono: FaList},
    //             {keyLang: 'nose.1', to: "reportes/tres"},
    //             {keyLang: 'nose.1', to: "reportes/cuatro"}
    //         ]
    //     },
    //     {
    //         keyLang: 'general.jobs',
    //         icono: FaList,
    //         visible: true,
    //         tipo: 'navlink',
    //         nlOptions: {to: 'jobs'}
    //     },
    ]
};
