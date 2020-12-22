import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Aras from "./components/Aras/Aras";
import Control from "./components/Admin/Control";
import EnConstruccion from "./components/Template/EnConstruccion";
import Home from './components/Template/Home';
import Listado  from './components/Hallazgos/Listado'
import Registro from "./components/Hallazgos/Registro";



const ROUTES = [
    { exact: true, path: '/admin/control', component: Control },
    { exact: true, path: '/aras', component: Aras },
    { exact: true, path: '/aras/consultar/:id', component: EnConstruccion },
    { exact: true, path: '/documentos', component: EnConstruccion },
    { exact: true, path: '/documentos/{tipo_documento}', component: EnConstruccion },
    { exact: true, path: '/hallazgo/listado', component: Listado },
    { exact: true, path: '/hallazgo/registro', component: Registro },
    { exact: true, path: '/hallazgo/consulta/{id}', component: Registro },
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
