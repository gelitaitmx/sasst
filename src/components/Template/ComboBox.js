import React from 'react';

const ComboBox = ({setActualizar, campoActualizar, catalogo, seleccionado, posicionNombre = 'nombre',  posicionId = 'id'} ) =>
{
    return (
        <div className="w-100">
            <select className="form-control form-control-sm text-center"
                    onChange={(e) => {
                        setActualizar(catalogo[e.target.value])
                    }}>
                <option value="" key={`empty`}>{getValor(seleccionado, posicionNombre)}</option>
                {(catalogo || []).map((item, idx) =>
                    validaId(seleccionado, posicionId) !==  validaId(item, posicionId) &&
                    <option key={`${idx}`} value={idx}>{getValor(item, posicionNombre)}</option>
                )}
            </select>
        </div>
    );
}
;


const getValor = (obj, buscado) => {
    let propiedades = buscado.split(".");
    let valor = '';
    let obj_buscado = obj;
    if (typeof obj_buscado !== "undefined" && obj_buscado !== null) {
        propiedades.forEach((prop, index) => {
            if (typeof obj_buscado[prop] !== 'undefined' && obj_buscado[prop] !== null) {
                obj_buscado = obj_buscado[prop];
                if (index == propiedades.length - 1)
                    valor = obj_buscado;
            }
        });
    }
    return valor;
}

const validaId = (seleccionado, posicionId) => {
    let id = null;
    id = getValor(seleccionado, posicionId);
    id = parseInt(id);
    return id;
};

export default ComboBox;
