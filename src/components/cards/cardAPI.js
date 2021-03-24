//import React, { useState } from 'react';
//import './card.css';

import starFull from '../../star_full.svg';

const Card = (props) => {

    //let rating = props.data.rate;

    const { Title, Year, imdbID } = props.data;

    return <div className="card h-100 bg-dark text-white">

                <div className="card-body">

                {props.data.Poster == "N/A" ? <div className="py-5">No Poster</div> : <a href={"https://www.imdb.com/title/" + imdbID} target="_blank" className="cover"><img src={props.data.Poster} className="mb-2" width="250" /></a> }

                <div className="title mb-1">{Title}</div>
                <div className="year mb-1">{Year}</div>
                <div className="year mb-1">imdb ID: {imdbID}</div>

                <a href={"https://www.imdb.com/title/" + imdbID} target="_blank">more Infos</a>
              
                </div>

           </div>
           
    }
    
  
export default Card;

