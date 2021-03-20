import React from 'react';
import './assets/css/style.css';
import './App.css';

import Header from './components/header/header.js';

//movies
import MovieData from './components/movies/moviedata.js';
import Movies from './components/movies/movies.js';
import MoviesAPI from './components/movies/moviesapi.js';

class App extends React.Component {

  state = {
    movies : []
  }

  componentDidMount(){

    fetch('http://www.omdbapi.com/?s=abc&apikey=81f86f7d&type=movie', {
        method: 'GET',
        })
        .then(response => response.json())
        .then((movies) => {
            //MovieDataAPI.push(movies)
            //console.log(movies)

            let posts = movies.Search;

            let movieData = []

            posts.forEach(element => {

              movieData.push(element)
                
            });

            this.setState({movies:movieData})

        });

  }

  render(){

    return (
      <div className="App">
    
        <Header />
    
        <h1 className="mt-4 pt-5 pb-4">movieDB</h1>

        <h3 className="mb-4">Data from api</h3>

        <MoviesAPI data={this.state.movies} />

       <div className="container">
         <hr className="my-4" />
       </div>

        <h3 className="mb-4">Data from js file</h3>

        <Movies data={MovieData} />
       
    
        {/*

         <MoviesAPI data={this.state.movies} />

      
        
        */}
      
        
      </div>
      );

  }

  
}

export default App;
