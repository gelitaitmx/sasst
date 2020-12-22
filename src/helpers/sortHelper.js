export const ordenarArrPorKey = (arr_a_ordenar = [], key, asc_or_desc = 'asc') => {
    const factor = asc_or_desc == 'asc' ? 1 : -1;
    (arr_a_ordenar || []).forEach((obj) => obj.valor_sort = getValorSort(obj, key));
    let ordenado = (arr_a_ordenar || []).sort(
        (a, b) => {
            if (a.valor_sort < b.valor_sort)
                return -1 * factor;
            if (a.valor_sort > b.valor_sort)
                return 1 * factor;
            return 0;
        }
    );
    return [...ordenado];
};

const getValorSort = (obj, buscado) => {
    let propiedades = buscado.split(".");
    let valor = null;
    let obj_buscado = obj;
    propiedades.forEach((prop, index) => {
        if (typeof obj_buscado[prop] !== 'undefined' && obj_buscado[prop] !== null) {
            obj_buscado = obj_buscado[prop];
            if (index == propiedades.length - 1)
                valor = obj_buscado;
        }
    });
    if (valor != null) {
        if (isNaN(valor)) {
            valor = valor.toLowerCase();
        }
    }
    return valor;
}

export default ordenarArrPorKey;
