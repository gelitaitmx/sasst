import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Template/Home';
import Listado  from './components/Hallazgos/Listado'
import Registro from "./components/Hallazgos/Registro";
import Control from "./components/Admin/Control";

const ROUTES = [
    { exact: true, path: '/hallazgo/listado', component: Listado },
    { exact: true, path: '/hallazgo/registro', component: Registro },
    { exact: true, path: '/hallazgo/consulta/{id}', component: Registro },
    { exact: true, path: '/admin/control', component: Control },
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
