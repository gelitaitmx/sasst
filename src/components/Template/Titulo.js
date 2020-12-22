import React from 'react';

const Titulo = ({titulo, children, container = true}) => {
    return (
        <div className={`${container ? 'container' : ''} d-flex flex-row justify-content-between w-100`}>
            <div className="deep-purple-text txts_gray  animated bounceInLeft py-2 d-flex justify-content-around w-100">
                <h1 className="txts_gray d-flex py-0 flex-nowrap flex-shrink-0">
                    <div className="mr-2">{titulo}</div>
                </h1>
                <div className='w-100'>{children}</div>
            </div>

        </div>
    );
};

export default Titulo;
