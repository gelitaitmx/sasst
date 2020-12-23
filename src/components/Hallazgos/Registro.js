import React, {useEffect, useState} from 'react';
import Template from "../Template/Template";
import {getClaim, isLogged} from "../../helpers/authHelper";
import SinSesion from "../Template/SinSesion";
import Titulo from "../Template/Titulo";
import {trans} from "../../services/lang.service";
import {useGlobal} from "reactn";
import Detalle from "./Detalle";
import moment from "moment";
import produce from "immer";
import {getCatalogos, getTrabajadoresActivos} from "../../api/catalogosApi";
import {CLAVEINICIO, CLAVERIESGO} from "../../helpers/hallazgoHelper";
import {getHallazgoId, guardarHallazgo} from "../../api/hallazgoApi";
import Select from "../Template/Select";
import Llenado from "./Llenado";


const Registro = ({match}) => {
    //-----------Hooks---------------------//
    const [control, setControl] = useGlobal('control');
    const [editable, setEditable] = useState(CLAVEINICIO);
    const [hallazgo, setHallazgo] = useState({
        nivel_riesgo: {},
        reporto: {fullName: getClaim('n'), id: getClaim('tId')},
        fecha: moment().toDate(),
        es_trabajador: null
    });
    const [trabajadores_activos, setTrabajadoresActivos] = useState([]);
    const [cats, setCats] = useState({
        trabajadores: [],
        contratistas: [],
        tipo_acto: [],
        lugares: [],
        tipos_aplica: [],
        aplicaciones: [],
        rubros: [],
        departamentos: []
    });


    const cargarCatalogos = () => {
        getCatalogos([
            {nombre: 'contratista', relaciones: []},
            {nombre: 'lugar', relaciones: []},
            {nombre: 'tipo_aplica', relaciones: []},
            {nombre: 'rubro', relaciones: []},
            {nombre: 'departamento', relaciones: []},
            {nombre: 'probabilidad', relaciones: []},
            {nombre: 'consecuencia', relaciones: []},
            {nombre: 'formula_nivel_riesgo', relaciones: ['nivel_riesgo']},
        ]).then(res => {
            setCats({
                contratistas: res.contratista.data,
                lugares: res.lugar.data,
                tipos_aplica: res.tipo_aplica.data,
                tipos_acto: [{'id': 'AI', nombre: 'Acto Inseguro'},
                    {'id': 'AC', nombre: 'Accidente'},
                    {'id': 'CI', nombre: 'Condicion Insegura'},
                    {'id': 'IN', nombre: 'Incidente'}],
                rubros: res.rubro.data,
                departamentos: res.departamento.data,
                consecuencias: res.consecuencia.data,
                probabilidades: res.probabilidad.data,
                formulas_nivel_riesgo: res.formula_nivel_riesgo.data,
            })
        });
        getTrabajadoresActivos().then(res => {
            setTrabajadoresActivos(res);
        })
    }
    //----------------useEffect------------//
    useEffect(() => {
        console.log(match.params.id);
        if (match.params.id)
            consultarHallazgo();
        cargarCatalogos();
    }, []);

    useEffect(() => {
        if ((hallazgo.consecuencia || {}).id != null && (hallazgo.probabilidad || {}).id != null) {
            let niv = cats.formulas_nivel_riesgo.filter(nr => nr.consecuencia_id === hallazgo.consecuencia.id && nr.probabilidad_id === hallazgo.probabilidad.id);
            actualizarHallazgo('nivel_riesgo', niv[0].nivel_riesgo, CLAVERIESGO);
        }
    }, [hallazgo.consecuencia, hallazgo.probabilidad]);

    //------------------Operaciones---------//
    const consultarHallazgo = () => {
        getHallazgoId(match.params.id,
            ['rubro', 'nivel_riesgo', 'reporto', 'departamento', 'responsable', 'contratista_reportado', 'trabajador_reportado', 'lugar', 'acciones_correctivas']).then(
            res => {
                res.fecha = moment(res.fecha).toDate();
                res.es_trabajador = res.trabajador_reportado_id != null ? true : false;
                setEditable(null);
                setHallazgo(res)
            })
    }

    const actualizarHallazgo = (propiedad, valor, clave) => {
        let valido = false;
        setHallazgo(produce(hallazgo, draft => {
            if (propiedad == 'tipo_acto')
                draft.tipo = valor.id;
            draft[propiedad] = valor;
        }));
        if ((valor != null && valor.id !== null || propiedad === 'es_trabajador') && propiedad != 'descripcion')
            actualizaEditable(clave);
    };

    const actualizaEditable = (valor) => {
        setEditable(valor);
    };

    const guardar = () => guardarHallazgo(hallazgo).then(res => window.open(`${process.env.REACT_APP_BASE_NAME}/hallazgo/consultar/${res.id}`, '_self'));

    return (
        <Template>
            {
                (isLogged()) ?
                    <div>
                        {
                            match.params.id != null ?
                                <Titulo titulo={trans("hallazgo.editar")}/> :
                                <Titulo titulo={trans("hallazgo.titulo")}/>

                        }
                        <div className="d-flex justify-content-center">
                            <div className="w-25 pr-5">
                                {
                                    editable != null &&
                                    <Llenado hallazgo={hallazgo} actualizarHallazgo={actualizarHallazgo} cats={cats}
                                             trabajadores_activos={trabajadores_activos} editable={editable}
                                             actualizaEditable={actualizaEditable}/>
                                }

                            </div>
                            <div className="w-25">
                                <Detalle hallazgo={hallazgo} actualizaEditable={actualizaEditable} onClick={guardar}/>
                            </div>

                        </div>
                    </div> :

                    <SinSesion/>
            }

        </Template>
    );
};

export default Registro;
