import React, {useState} from 'react';
import Card from '../cards/card.js';
import Row from '../bootstrap/row.js';
import Col from '../bootstrap/col.js';


const Movies = (props) => { 

    return <div className="movie-container">
                 <div className="container">

                     <div className="row">

                        {props.data.map((item, index) => {
                        return  <Col key={index + "col"} class="col-md-3 mb-4">
                                    <Card key={index} data={item} />
                                </Col>
                        })}

                        
                     </div>
                 
                </div>
             
           </div>
           
    }
  
export default Movies;
