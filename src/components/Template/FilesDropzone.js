import React, {useState} from 'react';
import Dropzone from 'react-dropzone'
import {
    FaPaperclip, FaRegFileAlt, FaFileDownload
} from "react-icons/fa";
import {buscarTexto, noop} from "../../helpers/generalHelper";

const FilesDropzone = ({onChange = noop, multiple = false}) => {

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="w-100 px-2">
                    <Dropzone onDrop={acceptedFiles => onChange(acceptedFiles)} multiple={multiple}>
                        {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                            <div {...getRootProps()}
                                 className="cursor w-100"
                                 style={isDragActive ? {border: '4px dashed  #007E33'} : {border: '2px dashed #0d47a1'}}>
                                <input {...getInputProps()} />
                                <div className="text-small px-4 py-5 d-flex flex-column justify-content-center w-100"> {
                                    isDragActive ?
                                        <div className="d-flex justify-content-center flex-column text-primary w-100">
                                            <div className="d-flex justify-content-center text-dark">
                                                Suelte para agregar los archivos
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <FaFileDownload size={30}/>
                                            </div>
                                        </div> :
                                        <div>
                                            Arrastre y suelte alguno(s) archivo(s) aquí,<br/> o haga clic para seleccionar archivo(s)
                                        </div>
                                } </div>
                            </div>
                        )}
                    </Dropzone>
                </div>
            </div>
        </div>
    );
};

export default FilesDropzone;
