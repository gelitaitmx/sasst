import React, {useEffect, useState} from 'react';
import {useGlobal} from "reactn";
import Titulo from "../Template/Titulo";
import {trans} from "../../services/lang.service";
import Template from "../Template/Template";
import {getTrabajadoresAll, guardarRelTrabajadorDepartamento, restableceConteo} from "../../api/trabajadorApi";
import {cerrarAlert} from "../../helpers/swalHelper";
import {getCatalogos, getTrabajadoresActivos} from "../../api/catalogosApi";
import Select from "../Template/Select";


const Trabajadores = () => {
//|------Hooks------|//
    const [control, setControl] = useGlobal('control');
    const [trabajadores, setTrabajadores] = useState([]);
    const [cats, setCats] = useState({departamentos: []});

//|------Useefects-------|//
    useEffect(() => {
        cargarCatalogos();
        consultarTrabajadores();
    }, []);

//|------Funciones------|//
    //|------API-------|//
    const consultarTrabajadores = () => getTrabajadoresAll().then(res => {
        cerrarAlert();
        setTrabajadores(res);
    });
    const cargarCatalogos = () => {
        getCatalogos([
            {nombre: 'departamento', relaciones: []},
        ]).then(res => {
            setCats({
                departamentos: res.departamento.data,
            })
        });
    }
    const guardarRel = (departamento_id, trabajador_id) => guardarRelTrabajadorDepartamento({
        trabajador_id,
        departamento_id
    }).then(() => {
        cerrarAlert();
        consultarTrabajadores();
    });
    const restablecerConteo = trabajador_id => restableceConteo(trabajador_id).then(() => {
        cerrarAlert();
        consultarTrabajadores();
    });

    return (<Template>
        <div className='d-flex flex-column'>
            <div className="container"><Titulo titulo={trans('navbar.trabajadores')}/></div>
            <table className='table table-bordered'>
                <thead className='thead-dark'>
                <tr>
                    <th>{trans('trabajador.noEmpleado')}</th>
                    <th>{trans('trabajador.trabajador')}</th>
                    <th>{trans('trabajador.departamento')}</th>
                    <th>{trans('trabajador.conteoHallazgos')}</th>
                </tr>
                </thead>
                <tbody>
                {(trabajadores || []).map((trabajador, idx) => <tr key={idx}>
                    <td>{trabajador.numero_empleado}</td>
                    <td>{trabajador.fullName}</td>
                    <td>
                        <Select options={cats.departamentos}
                                onSelect={e => guardarRel(e.id, trabajador.id)}
                                selected={(((trabajador || {}).rel_trabajador_departamento || {}).departamento || {})}/>
                    </td>
                    <td>
                        <span
                            className='badge badge-dark mr-5'>{(trabajador.rel_trabajador_departamento || {}).hallazgos_actual}</span>
                        {
                            (trabajador.rel_trabajador_departamento || {}).hallazgos_actual &&
                            <button className='btn btn-sm btn-outline-danger'
                                    onClick={() => restablecerConteo(trabajador.id)}>
                                {trans('trabajador.restablecer')}
                            </button>
                        }
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    </Template>);
};

export default Trabajadores;
