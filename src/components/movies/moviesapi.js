//import React, {useState} from 'react';
import CardAPI from '../cards/cardAPI.js';
//import Row from '../bootstrap/row.js';
import Col from '../bootstrap/col.js';


const MoviesAPI = (props) => { 

    return <div className="movie-container">
                 <div className="container">

                     <div className="row">

                        {props.data.map((item, index) => {
                        return  <Col key={index + "col"} class="col-12 col-md-3 mb-4">
                                    <CardAPI key={index} data={item} />
                                </Col>
                        })}
                        
                     </div>
                 
                </div>
             
           </div>
           
    }
  
export default MoviesAPI;
