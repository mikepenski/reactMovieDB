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
      pagevalue: 0,
      totalResultsState: '',
      currentOptionsState: []
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

              let options = [];
              for(let i = 0; i <= movies.totalResults; i++){
                options.push(i);
               }
    
              this.setState({
                //currentPageState: currentPage,
                movies:movieData,
                totalResultsState: movies.totalResults,
                currentOptionsState: options
              })
  
            }

        });

  }

  reset(e){
    this.setState({
      movies: []
    })
  }



  updateInputValue(e){

    let inputValue = "";
    inputValue += e.target.value;

    this.setState({
      inputValueState: inputValue,
      currentPageState: 1
    }, () => {
      this.fetchPosts();
  });

  }
  

  pagination(value){

    if(value === "plus"){
      this.setState({currentPageState: this.state.currentPageState + 1}, () => {
        this.fetchPosts();
      });
    }

    if(value === "minus"){
      this.setState({currentPageState: this.state.currentPageState - 1}, () => {
        this.fetchPosts();
      });
    }
   

  }

 

  fetchPosts(){

    fetch('https://www.omdbapi.com/?s=' + this.state.inputValueState +'&apikey=81f86f7d&type=movie&page=' + this.state.currentPageState, {
      method: 'GET',
      })
      .then(response => response.json())
      .then((movies) => {

          console.log(movies)

          if(movies.Response !== "False"){

            let posts = movies.Search;

            let movieData = []
  
            posts.forEach(element => {
  
              movieData.push(element)
                
            });


            let options = [];
            for(let i = 1; i <= movies.totalResults; i++){
              options.push(i);
             }
  
            this.setState({
              //currentPageState: currentPage,
              movies:movieData,
              totalResultsState: movies.totalResults,
              currentOptionsState: options
            })

          }

      });


  }

  render(){

    return (

      <div className="App">

             {/*
        
        <button onClick={e => this.selectMenu()}>test</button>

        */}

        <Header />

        <h3 className="mb-4 pt-6">Data from api</h3>
        

        <div className="container mb-4">

          <div className="row">

            <div className="col-md-8 col-lg-9 order-2 order-md-1">

            <div className="filterAPI">

                  <input type="text" value={this.state.inputValue} onChange={/*(e) => this.handleKeyDown(e),*/ (e) => this.updateInputValue(e)} placeholder="Suchbegriff..." className="form-control w-100 w-md-50"  />
           
                </div>

            </div>

            <div className="col-md-4 col-lg-3 d-flex justify-content-md-end order-1 order-md-2 mb-2 mb-md-0">

              <div className="d-flex align-items-center">

                <span className="pr-4">Seite:</span>

                <select className="form-control d-inline-block w-auto">

                  {this.state.currentOptionsState.map((item, index) => (
                  <option key={index}>
                    {item}
                  </option>
                  ))}

                </select>

                </div>

            </div>

          </div>

  


        </div>
        

        {(!this.state.movies) ? '': <MoviesAPI data={this.state.movies} /> }

        <div className="my-2">TotalResults: {this.state.totalResultsState}</div>

        <div className="my-2">CurrentPage: {this.state.currentPageState}</div>

          <div className="row">

              <div className="col-4">

                {this.state.currentPageState > 1 ? <button className="btn btn-primary" onClick={e => this.pagination("minus")}>&#8249; <span className="d-none d-mdblock">Back</span></button> : <button className="btn btn-primary" disabled>&#8249; <span className="d-none d-mdblock">Back</span></button> }

              </div>

              <div className="col-4">

              <button className="btn btn-primary" onClick={e => this.reset()}>Clear</button>

              </div>

              <div className="col-4">

              <button className="btn btn-primary" onClick={e => this.pagination("plus")}><span className="d-none d-mdblock">Next</span> &#8250;</button>

              </div>

          </div>

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
