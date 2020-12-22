import React from 'react';
import {useGlobal} from 'reactn';
import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {FaHome} from "react-icons/fa";
import {ModalLogin} from "./ModalLogin";
import Avatar from "./Avatar";
import {isLogged, getN, getTId, cerrarSesion} from "../../helpers/authHelper";
import {trans} from '../../services/lang.service'
import $ from 'jquery';
import {ITEMS_IZQUIERDA, ITEMS_DERECHA} from "./Navbar.data";


function Navbar({lang, lang_ok, permisos_ok, setPermisosOk}) {
    //|------Hooks------|//
    const [control, setControl] = useGlobal('control');
    return (
        <nav className="navbar navbar-expand-lg navbar-dark danger-color-dark darken-3 py-0 text-small">
            <NavLink to="/" className="nav-link navbar-brand" href="#">
                <span><FaHome/>{` ${process.env.REACT_APP_APP_NAME}`}<Env env={process.env.REACT_APP_ENV}/></span>
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Izquierda/>
                <Derecha/>
            </div>
            <ModalLogin/>
        </nav>
    );
};

const Izquierda = () => {
    return (<ul className="navbar-nav mr-auto">
        {(ITEMS_IZQUIERDA.menus || []).map((menu, key) => <Menu menu={menu} key={key}/>)}
    </ul>);
}
const Derecha = () => {
    return (<ul className="navbar-nav navbar-right">
        {(ITEMS_DERECHA.menus || []).map((menu, key) => <Menu menu={menu} key={key}/>)}
        <SesionNav/>
    </ul>);
}

const Menu = ({menu}) => <React.Fragment>
    {menu.tipo == 'navlink' && menu.visible && <NavLinkMenu menu={menu}/>}
    {menu.tipo == 'simple' && menu.visible && <SimpleMenu menu={menu}/>}
    {menu.tipo == 'dropdown' && menu.visible && <DropdownMenu menu={menu}/>}
</React.Fragment>


const SimpleMenu = ({menu}) => {
    const Icono = menu.icono;
    return (<li className="nav-item">
        <a className="nav-link" href="#" onClick={() => menu.onClick()}>
            {Icono && <Icono/>} {trans(menu.keyLang || '')}
        </a>
    </li>)
};
const NavLinkMenu = ({menu}) => {
    const Icono = menu.icono;
    return (<li className="nav-item">
        <NavLink className="nav-link" href="#link" to={((menu || {}).nlOptions || {}).to || ''}>
            {Icono && <Icono/>} <span className="py-1">  {trans(menu.keyLang || '')}  </span>
        </NavLink>
    </li>)
};
const DropdownMenu = ({menu}) => {
    const Icono = menu.icono;
    return (<li className="nav-item dropdown ">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {Icono && <Icono/>} <span className="py-1">  {trans(menu.keyLang || '')}  </span>
        </a>
        <div className="dropdown-menu dropdown-menu-right text-small" aria-labelledby="navbarDropdown">
            {(menu.navlinks || []).map((nl, key) => <DropdownNl nl={nl} key={key}/>)}
        </div>
    </li>)
};
const DropdownNl = ({nl}) => {
    const Icono = nl.icono;
    return (
        <NavLink className="dropdown-item" to={nl.to}>
            {Icono && <Icono/>} <span className="ml-2">{trans(nl.keyLang)}</span>
        </NavLink>
    );
}

const SesionNav = () => {
    const handleCerrarSesion = () => cerrarSesion();
    const handleModalIniciar = () => {
        $('#modalLogin').modal('show');
        $('#modalLogin').on('shown.bs.modal', () => $('#username').focus());
    }
    return (<React.Fragment>
        {!isLogged() ?
            <li className="nav-item"
                onClick={() => handleModalIniciar()}>
                <a className="nav-link" href="#">{trans('navbar.iniciarSesion')}</a>
            </li> :
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Avatar texto={getTId()} width={'1.5rem'}/> {getN()}
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#" onClick={() => handleCerrarSesion()}>
                        {trans('navbar.cerrarSesion')}
                    </a>
                </div>
            </li>}
    </React.Fragment>)
}


const Env = ({env}) => {
    if (env != 'prod') {
        const tipo_badge = env === 'dev' ? 'warning' : 'danger';
        return (<span className={`p-1 ml-1 badge badge-${tipo_badge}`}>{env}</span>);
    }
    return ('');
};

export default Navbar;
