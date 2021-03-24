import React from 'react';
import './assets/css/style.css';
import './App.css';

import Header from './components/header/header.js';

//movies
import MovieData from './components/movies/moviedata.js';
import Movies from './components/movies/movies.js';
import MoviesAPI from './components/movies/moviesapi.js';
//import Filter from './components/filter/filterAPI.js';

class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      inputValueState: 'spider man',
      movies : [],
      currentPageState: 1,
      pagevalue: 0
    }
  }



  state = {
    inputValueState: 'spider man',
    movies : [],
    currentPageState: 1
  }
  

  componentDidMount(){

    fetch('https://www.omdbapi.com/?s=' + this.state.inputValueState +'&apikey=81f86f7d&type=movie&page=' + this.state.currentPageState, {
        method: 'GET',
        })
        .then(response => response.json())
        .then((movies) => {
            //MovieDataAPI.push(movies)
            //console.log(movies)

            console.log(movies)

            if(movies.Response !== "False"){
  
              let posts = movies.Search;
  
              let movieData = []
    
              posts.forEach(element => {
    
                movieData.push(element)
                  
              });
    
              this.setState({
                //currentPageState: currentPage,
                movies:movieData
              })
  
            }

        });

  }


  reset(e){
    this.setState({
      moviesAPI: []
    })
  }



  updateInputValue(e){

    let currenPage = this.state.currentPageState;
    let inputValue = "";
    inputValue += e.target.value;

    this.setState({
      inputValueState: inputValue,
      currentPageState: 1
    }, () => {
      this.fetchPosts();
  });

  }
  

  pagination(e){
      this.setState({currentPageState: this.state.currentPageState + 1}, () => {
        this.fetchPosts();
    });

  }

 

  fetchPosts(){

    fetch('https://www.omdbapi.com/?s=' + this.state.inputValueState +'&apikey=81f86f7d&type=movie&page=' + this.state.currentPageState, {
      method: 'GET',
      })
      .then(response => response.json())
      .then((movies) => {
          //MovieDataAPI.push(movies)

          console.log(movies)

          if(movies.Response !== "False"){

            let posts = movies.Search;

            let movieData = []
  
            posts.forEach(element => {
  
              movieData.push(element)
                
            });
  
            this.setState({
              //currentPageState: currentPage,
              movies:movieData
            })

          }

       
         

      });


  }

/*
  handleKeyDown(e) {

    let inputValue = e.target.value;

    this.setState({ inputValue: inputValue })

    fetch('https://www.omdbapi.com/?s='+ inputValue +'&apikey=81f86f7d&type=movie&page=1', {
        method: 'GET',
        })
        .then(response => response.json())
        .then((moviesAPI) => {
            
            if(moviesAPI.Response !== "False"){

                let posts = moviesAPI.Search;

                let movieAPIData = []
    
                posts.forEach(element => {
    
                  movieAPIData.push(element)
                    
                });

                this.setState({moviesAPI:movieAPIData})

            }


        });

  }

  */

 


  render(){

    return (
      <div className="App">
    
        <Header />
    
        <h1 className="mt-4 pt-5 pb-4">movieDB</h1>

        <h3 className="mb-4">Data from api</h3>

        <div className="filterAPI my-4">

         <div className="container px-4">

           <input type="text" value={this.state.inputValue} onChange={/*(e) => this.handleKeyDown(e),*/ (e) => this.updateInputValue(e)} placeholder="Suchbegriff..." className="w-50 p-1"  />

         </div>

        </div>

        {(!this.state.movies) ? '': <MoviesAPI data={this.state.movies} /> }

        <button onClick={e => this.reset()}>Reset</button>

        <button>Back</button>

        <button onClick={e => this.pagination(this)}>Next</button>


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
