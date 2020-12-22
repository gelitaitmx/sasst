import React from 'react';
import {FaBan} from "react-icons/fa";
import accessDenied from "../../img/access-denied.jpg";
import {trans} from "../../services/lang.service";

function SinSesion() {
    return (
        <div className="container d-flex justify-content-center pt-5">
            <div className="d-flex flex-column">
                <h3 className="text-danger">
                    <FaBan/>
                    {trans('general.sinPermiso')}
                    <FaBan/>
                </h3>
                <br/>
                <div className="text-center">
                    <img src={accessDenied} className="img-"/>
                </div>
            </div>
        </div>

    );
}

export default SinSesion;
