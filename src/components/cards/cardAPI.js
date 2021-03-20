//import React, { useState } from 'react';
//import './card.css';

import starFull from '../../star_full.svg';

const Card = (props) => {

    //let rating = props.data.rate;

    return <div className="card h-100 bg-dark text-white">

                <div className="card-body">

                <div className="title mb-1">{props.data.Title}</div>
                <div className="year mb-1">{props.data.Year}</div>
                <div className="year mb-1">imdb ID: {props.data.imdbID}</div>

                <a href={props.data.imdbID} target="_blank">more Infos</a>
                
                
                 

                </div>
       
           </div>
           
    }
    
  
export default Card;

