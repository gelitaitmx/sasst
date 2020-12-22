//|------Librerias------|//
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//|------Css-------|//
import '../src/styles/animate.css';
import '../src/styles/gelita.css';
import '../src/styles/mdb.css';
import '../src/styles/modal-sidebar.css';
import 'react-tippy/dist/tippy.css';
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-datepicker/dist/react-datepicker.css";

//|------React-------|//
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//|------Misc-------|//
import {setGlobal} from 'reactn';
import {cargarStrings} from "./services/lang.service";
import {isLogged} from "./helpers/authHelper";
import {cargarPermisos} from "./services/seguridad.service";

//|------Init-------|//
setGlobal({control: {strings: null, permisos: null}});
cargarStrings();
if (isLogged())
    cargarPermisos();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
