//import React, { useState } from 'react';
//import './card.css';

import starFull from '../../star_full.svg';
import Rating from '../rating/rating.js';

const Card = (props) => {

    //let rating = props.data.rate;

    const { title, year, director, duration, rate} = props;

    return <div className="card h-100 bg-dark text-white">

       
                <div className="card-body">

                <div className="title mb-1">{props.data.title ? props.data.title : 'Title Lorem Ipsum'}</div>
                <div className="year mb-1">{props.data.year}</div>
                <div className="director mb-1">{props.data.director}</div>
                <div className="duration mb-1">{props.data.duration}</div> 
                <div className="rating">{props.data.rate}</div>

                   <Rating stars={props.data.rate} />


                   {/*
                       <select defaultValue={'DEFAULT'}>
                   <option value="DEFAULT" disabled>See genres</option>
                           </select>
                   */}

                   <ul className="mt-1">
                        {props.data.genre.map((genre, index) => {
                        return  <li key={index}>
                            {genre}
                        </li>
                        })}
                    </ul>

                </div>
       

                {/*

                 <img src={'../../logo.svg'} height="30" />

                <p>
                    <img src={starFull} />
                </p>

             
                
                */}
             
           </div>
           
    }
    
  
export default Card;

