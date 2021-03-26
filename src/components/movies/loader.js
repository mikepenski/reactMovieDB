//import React, { useState } from 'react';
//import './card.css';

const Loader = (props) => {

    document.body.classList.add('loading');

    return <div className="lds-roller">

                <></><div></div><div></div><div></div><div></div><div></div><div></div><div></div>

           </div>
           
    }
    
export default Loader;

