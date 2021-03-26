import React from 'react';
import './assets/css/style.css';
import './App.css';

import Header from './components/header/header.js';
import Movies from './components/movies/movies.js';
import Loader from './components/movies/loader.js';

class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      inputValueState: 'Batman',
      movies : [],
      currentPageState: 1,
      pagevalue: 0,
      totalResultsState: '',
      currentOptionsState: [],
      totalPagesState: ''
    }
  }

  state = {
    inputValueState: 'spider man',
    movies : [],
    currentPageState: 1,
    fetchInProgress: false,
  }

  componentDidMount(){ 

    this.setState({
      fetchInProgress: true,
    })

    fetch('https://www.omdbapi.com/?s=' + this.state.inputValueState +'&apikey=81f86f7d&type=movie&page=' + this.state.currentPageState, {
        method: 'GET',
        })
        .then(response => response.json())
        .then((movies) => {
            //MovieDataAPI.push(movies)
            //console.log(movies)

            //console.log(movies)

            if(movies.Response !== "False"){
  
              let posts = movies.Search;
  
              let movieData = []
    
              posts.forEach(element => {
    
                movieData.push(element)
                  
              });

              let options = [];
              for(let i = 1; i <= Math.ceil(movies.totalResults/10); i++){
                options.push(i);
               }

    
              this.setState({
                //currentPageState: currentPage,
                movies:movieData,
                totalResultsState: movies.totalResults,
                currentOptionsState: options,
                totalPagesState: Math.ceil(movies.totalResults/10),
                fetchInProgress: false,
              })
  
            }

            console.log(this.state.movies);

        });

  }



/*
* reset button
*/

  reset(e){

    this.setState({
      movies: [],
      currentPageState: 1,
      inputValueState: 'Batman',
    }, () => {
      this.fetchPosts();
    });

  }

/*
* search field / input 
*/

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


/*
* Order select 
*/

  orderMovies(e) {
  const order = e.target.value;

  if (order === 'YEAR_OLD') {
    this.setState({
      movies: this.state.movies.sort((a, b) => a.Year - b.Year)
    })
  }

  if (order === 'YEAR_NEW') {
    this.setState({
      movies: this.state.movies.sort((a, b) => b.Year - a.Year)
    })
  }

  if (order === 'ASC') {
    
    this.setState({
      movies: this.state.movies.sort((a, b) => a.Title.localeCompare(b.Title))
    })
  }

  if (order === 'DESC') {
    this.setState({
      movies: this.state.movies.sort((a, b) => b.Title.localeCompare(a.Title))
    })
  }

  console.log(this.state.movies);

}

/*
* Pagination links back / forward 
*/

  pagination(value){

    if(value === "plus"){
      this.setState({currentPageState: parseInt(this.state.currentPageState )+ 1}, () => {
        this.fetchPosts();
      });
    }

    if(value === "minus"){
      this.setState({currentPageState: parseInt(this.state.currentPageState ) - 1}, () => {
        this.fetchPosts();
      });
    }
   

  }

/*
* Select Page 
*/

  setPage(e){
    this.setState({
      currentPageState: e.target.value
    }, () => {
      this.fetchPosts();
    });

  }


/*
* fetch posts again
*/

  fetchPosts(){

    this.setState({
      fetchInProgress: true,
    })


    fetch('https://www.omdbapi.com/?s=' + this.state.inputValueState +'&apikey=81f86f7d&type=movie&page=' + this.state.currentPageState, {
      method: 'GET',
      })
      .then(response => response.json())
      .then((movies) => {

          if(movies.Response !== "False"){

            let posts = movies.Search;

            let movieData = []
  
            posts.forEach(element => {
  
              movieData.push(element)
                
            });


            let options = [];
            for(let i = 1; i <= Math.ceil(movies.totalResults/10); i++){
              options.push(i);
             }

            this.setState({
              //currentPageState: currentPage,
              movies:movieData,
              totalResultsState: movies.totalResults,
              currentOptionsState: options,
              totalPagesState: Math.ceil(movies.totalResults/10),
              fetchInProgress: false,
            })

          } else {

            this.setState({
              //currentPageState: currentPage,
              movies:[],
              fetchInProgress: false,
            })

          }

      });


  }

  render(){

    return (

      <div className="App">

             {/*
        
        <button onClick={e => this.selectMenu()}>test</button>

        https://blog.bitsrc.io/build-a-simple-modal-component-with-react-16decdc111a6

        */}

        <Header />

        <h3 className="mb-4 pt-6">Data from api</h3>
        

        <div className="container mb-4">

          <div className="row">

            <div className="col-md-8 col-lg-6 order-2 order-md-1">

              <div className="filterAPI">
                    <input type="text" value={this.state.inputValueState} onChange={/*(e) => this.handleKeyDown(e),*/ (e) => this.updateInputValue(e)} placeholder="Suchbegriff eingeben..." className="form-control w-100 w-md-50"  />
              </div>

            </div>

            <div className="col-md-4 col-lg-3 d-flex justify-content-md-end order-1 order-md-2 mb-2 mb-md-0">

              <select onChange={e => this.orderMovies(e)} className="form-control d-inline-block w-auto">
                <option value="YEAR_NEW">Neueste zuerst</option>
                <option value="YEAR_OLD">Ältere zuerst</option>
                <option value="ASC">A-Z</option>
                <option value="DESC">Z-A</option>
              
              </select>

            </div>

            <div className="col-md-4 col-lg-3 d-flex justify-content-md-end order-1 order-md-2 mb-2 mb-md-0">

              <div className="d-flex align-items-center">

                <select onChange={e => this.setPage(e)} className="form-control d-inline-block w-auto" value={this.state.currentPageState}>
´´
                  {this.state.currentOptionsState.map((item, index) => (
                  <option key={index} value={index + 1} >
                    Seite: {item}
                  </option>
                  ))}

                </select>

              </div>

            </div>

          </div>

        </div>

        <div className="container">

         <strong className="mb-3 d-block text-left">Suchergebnisse für: {this.state.inputValueState}</strong> 

        </div>
        { this.state.fetchInProgress == true ? <Loader /> : <Movies data={this.state.movies} />  }
        {this.state.movies.length === 0 && <p className="no-results">Leider keine Filme gefunden</p>}

        {this.state.movies.length > 0 && <div className="my-2">TotalResults: {this.state.totalResultsState}</div>}


        
        {this.state.movies.length > 0 && <div className="my-2">Page: {this.state.currentPageState} / {this.state.totalPagesState}</div>}

          <div className="row">

              <div className="col-4">
                

                
              {this.state.movies.length === 0 ?
              ''
              :   [this.state.currentPageState > 1 ?  <button key="next-d-none" className="btn btn-primary" onClick={e => this.pagination("minus")}>&#8249; <span className="d-none d-mdblock">Back</span></button> 
              : <button key="next-d" className="btn btn-primary" disabled>&#8249; <span className="d-none d-mdblock">Back</span></button> ]
              }


              </div>

              <div className="col-4">

              <button className="btn btn-primary" onClick={e => this.reset()}>Clear</button>

              </div>

              <div className="col-4">

              {this.state.movies.length > 0 &&  <button className="btn btn-primary" onClick={e => this.pagination("plus")}><span className="d-none d-mdblock">Next</span> &#8250;</button>}
             

              </div>

          </div>

       <div className="container">
         <hr className="my-4" />
       </div>

      </div>
      );

  }

  
}


export default App;
