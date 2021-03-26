//import React, {useState} from 'react';
import Card from '../cards/card.js';
import Col from '../bootstrap/col.js';


const MoviesAPI = (props) => { 

    document.body.classList.remove('loading');

    return <div className="movie-container">
                 <div className="container">

                     <div className="row">

                        {props.data.map((item, index) => {
                        return  <Col key={index + "col"} class="col-12 col-md-3 mb-4">
                                    <Card key={index} data={item} />
                                </Col>
                        })}
                        
                     </div>
                 
                </div>
             
           </div>
           
    }
  
export default MoviesAPI;
