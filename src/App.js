import React from 'react';
import './assets/css/style.css';
import './App.css';

import Header from './components/header/header.js';
import Movies from './components/movies/movies.js';

class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      inputValueState: 'spider man',
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
                totalPagesState: Math.ceil(movies.totalResults/10)
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
            for(let i = 1; i <= Math.ceil(movies.totalResults/10); i++){
              options.push(i);
             }

            this.setState({
              //currentPageState: currentPage,
              movies:movieData,
              totalResultsState: movies.totalResults,
              currentOptionsState: options,
              totalPagesState: Math.ceil(movies.totalResults/10)
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
                    <input type="text" value={this.state.inputValue} onChange={/*(e) => this.handleKeyDown(e),*/ (e) => this.updateInputValue(e)} placeholder="Suchbegriff..." className="form-control w-100 w-md-50"  />
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
        

        {(!this.state.movies) ? '': <Movies data={this.state.movies} /> }

        <div className="my-2">TotalResults: {this.state.totalResultsState}</div>

        <div className="my-2">Page: {this.state.currentPageState} / {this.state.totalPagesState}</div>

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

       {/*

 <h3 className="mb-4">Data from js file</h3>

        <Movies data={MovieData} />
       

       */}
      </div>
      );

  }

  
}


export default App;
