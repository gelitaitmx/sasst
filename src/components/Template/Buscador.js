import React from 'react';
import {useState, useEffect} from 'react';
import useDebounce from "../../helpers/debounce";
import filtrarArreglo from "../../helpers/filterHelper";

const Buscador = ({setFiltrado, arr_sin_filtrar, buscadores, estado_inicial}) => {
//|------State-------|//
    const [buscador_previo, setBuscadorPrevio] = useState({});
    const buscador = useDebounce(buscador_previo, 200);

//|------Actions------|//
    const handleChange = (alias, value) => {
        let idx_campo = (buscadores || []).map(item => item.alias).indexOf(alias);
        let keys = buscadores[idx_campo].posicion.split(".");
        let obj = value;
        let aux = {};
        for (let i = keys.length - 1; i >= 0; i--) {
            aux[keys[i]] = obj;
            obj = Object.assign({}, aux);
            aux = {};
        }
        setBuscadorPrevio(Object.assign({}, buscador_previo, obj));
    };

    useEffect(() => {
        if (buscador) {
            let nuevo_array = arr_sin_filtrar != null ? filtrarArreglo(arr_sin_filtrar, buscador) : [];
            setFiltrado(nuevo_array);
        }
    }, [buscador]);
    useEffect(()=>{
        setBuscadorPrevio(estado_inicial);
    },[estado_inicial]);

//|------Render------|//
    return (
        <tr className="w-100">{
            (buscadores || []).map((buscador) => {
                return (
                    <td key={buscador.alias}>
                        <input className={`form-control form-control-sm ${buscador.mostrar === false ? 'd-none' : ''}`}
                               placeholder={buscador.placeholder}
                               hidden={buscador.mostrar}
                               onChange={e => {
                                   handleChange(buscador.alias, e.target.value)
                               }}/>
                    </td>

                )
            })
        }</tr>
    );
};


export default Buscador;
