import {trans} from "../../services/lang.service";
import {FaList, FaWrench} from "react-icons/all";
import {can} from "../../services/seguridad.service";

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
            keyLang: 'navbar.hallazgo',
            icono: FaList,
            visible: true,
            tipo: 'navlink',
            nlOptions: {to: '/hallazgo/Listado'}
        },
        {
            keyLang: 'navbar.admin',
            icono: FaWrench,
            visible: true,
            tipo: 'dropdown',
            navlinks: [
                {keyLang: 'navbar.control', to: "/admin/control",'icono': FaList , visible :true},
            ]
        }
    ]
};
export const ITEMS_DERECHA = {
    // menus: [
    //     {
    //         keyLang: 'general.catalogos',
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
    // ]
};
