import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Ara from "./components/Aras/Ara";
import Aras from "./components/Aras/Aras";
import Control from "./components/Admin/Control";
import EnConstruccion from "./components/Template/EnConstruccion";
import Home from './components/Template/Home';
import Listado  from './components/Hallazgos/Listado'
import Registro from "./components/Hallazgos/Registro";
import ListadoAcciones  from './components/Acciones/Listado'
import Docuementos  from './components/Documentos/Listado'
import Indicadores  from './components/Indicador/Indicadores'



const ROUTES = [
    { exact: true, path: '/admin/control', component: Control },
    { exact: true, path: '/acciones/listado', component: ListadoAcciones },
    { exact: true, path: '/admin/acciones/:opcion', component: ListadoAcciones },
    { exact: true, path: '/aras', component: Aras },
    { exact: true, path: '/aras/consultar/:id', component: Ara },
    { exact: true, path: '/documentos', component: Docuementos },
    { exact: true, path: '/documentos/:tipo_documento', component: Docuementos },
    { exact: true, path: '/hallazgo/listado', component: Listado },
    { exact: true, path: '/hallazgo/registro', component: Registro },
    { exact: true, path: '/hallazgo/consultar/:id', component: Registro },
    { exact: true, path: '/indicadores', component: Indicadores },
    { exact: true, path: '/404', component: NotFound },
    { exact: true, path: '/', component: Home },
];

function NotFound() {
    return (
        <div>
            <h1>Page not found</h1>
            <a onClick={() => BrowserRouter.goBack()}>Presione aquí para regresar</a>
        </div>
    )
}

export default ROUTES;
