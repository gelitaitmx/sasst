import React, {useState} from "react";
import moment from "moment";
import {trans} from "../../services/lang.service";
import DatePicker from "react-datepicker";
import {hallazgo} from "../../lang/es";
import produce from "immer";
import {FaSave} from "react-icons/all";
import {guardarAccion} from "../../api/hallazgoApi";

const Acciones = ({acciones, guardarAccionCorrectiva , edicion = false}) => {
    return <div>
        {
            edicion &&  <div>
                {
                    (acciones || []).map((accion, id) =>
                        <Accion key={id} accion={accion}/>
                    )
                }
            </div>
        }

        {
            acciones.length > 0 &&
            <hr/>
        }

        <AgregarAccion guardarAccionCorrectiva={guardarAccionCorrectiva}/>
    </div>
};

export default Acciones;

const Accion = ({accion}) => {
    return <div>
        <div>
            <strong>{trans('hallazgo.descripcion')} : </strong>
            <span>  {accion.descripcion}  </span>
            <span className="text-secondary text-small">{moment(accion.fecha_verificacion).format('DD/MM/YYYY')}</span>
        </div>
    </div>
};


const AgregarAccion = ({guardarAccionCorrectiva}) => {
    const [accion, setAccion] = useState({});
    const actualizaAccion = (propiedad, valor) => {
        setAccion(produce(draft => {
            draft[propiedad] = valor;
        }));
    };

    return <div>
        <div>
            <strong>{trans('hallazgo.fecha')} : </strong>
            <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={accion.fecha_verificacion}
                className={`form-control w-100`}
                onChange={(e) => actualizaAccion( 'fecha_verificacion', e)}/>
        </div>
        <div>

            <strong>{trans('hallazgo.descripcion')} : </strong>
            <textarea className="form-control" value={accion.descripcion}
                      onChange={(e) => actualizaAccion('descripcion', e.target.value)}/>
        </div>
        <div className="pt-3">
            <button className="btn w-100 btn-success"
                    onClick={e=>guardarAccionCorrectiva(accion)}
                    disabled={!accion.fecha_verificacion && !accion.descripcion}>
                <FaSave/>{trans('general.guardar')}
            </button>
        </div>
    </div>
};
