import React from 'react';
import './assets/css/style.css';
import './App.css';

import Header from './components/header/header.js';

//movies
import MovieData from './components/movies/moviedata.js';
import Movies from './components/movies/movies.js';
import MoviesAPI from './components/movies/moviesapi.js';
import Filter from './components/filter/filterAPI.js';

class App extends React.Component {

  state = {
    movies : [],
    moviesAPI: []
  }

  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      movies : [],
      moviesAPI: false
    }
  }

  handleKeyDown(e) {

    let inputValue = e.target.value;

    this.setState({ inputValue: inputValue })

    fetch('http://www.omdbapi.com/?s='+ inputValue +'&apikey=81f86f7d&type=movie&page=1', {
        method: 'GET',
        })
        .then(response => response.json())
        .then((moviesAPI) => {
            
            if(moviesAPI.Response != "False"){

                let posts = moviesAPI.Search;

                let movieAPIData = []
    
                posts.forEach(element => {
    
                  movieAPIData.push(element)
                    
                });

                this.setState({moviesAPI:movieAPIData})

            }


        });

  }

  componentDidMount(){

    fetch('http://www.omdbapi.com/?s=abc&apikey=81f86f7d&type=movie', {
        method: 'GET',
        })
        .then(response => response.json())
        .then((movies) => {
            //MovieDataAPI.push(movies)
            console.log(movies)

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

        <div className="filterAPI my-4">

         <div className="container px-4">

           <input type="text" onChange={(e) => this.handleKeyDown(e)} placeholder="Suchbegriff..." className="w-50 p-1"  />

         </div>

        </div>

        {(!this.state.moviesAPI) ? <MoviesAPI data={this.state.movies} /> : <MoviesAPI data={this.state.moviesAPI} /> }


       <div className="container">
         <hr className="my-4" />
       </div>

        <h3 className="mb-4">Data from js file</h3>

        <Movies data={MovieData} />
       
      </div>
      );

  }


  





  
}


export default App;
