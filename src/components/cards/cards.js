//import React, { Component } from 'react';
//import Card from '../card/card.js';

const Cards = (props) => {
    
    return <section className={ props.class ? "cards " + props.class: 'cards' }>
                <div className="container">
                    {props.title ? <h4 class="pb-3 text-uppercase font-weight-bold">{props.title}</h4>: '' }
                    <div className="row">
                        {props.children }
                    </div>
                </div>
           </section>
    }
  
export default Cards;
