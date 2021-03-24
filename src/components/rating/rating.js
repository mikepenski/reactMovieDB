import starFullIcon from '../../star_full.svg';
import starEmptyIcon from '../../star_empty.svg';
import starHalfIcon from '../../star_half.svg';

const Rating = (props) => {

    console.log(props.stars)

    const hasHalfStar = (props.stars % 1 !== 0);
    const stars = parseInt(props.stars);

    const starsArray = [];
 
    for (let i = 0; i < 10; i++) {

        let star = starFullIcon;

        //if(i > rating - 1){

        if(i == stars && hasHalfStar){
            star = starHalfIcon;
        } else if (i > stars - 1){
            star = starEmptyIcon;
        }

        starsArray.push(<img key={i} src={star} style={{ width: "auto", height: "20px" }} />)
    }


    /*
    
    old one 

     let starsArray = [];

     
    // calc the half stars
    
     let myrating = props.stars;
     let ratingDecimal = myrating.toString().slice(2, 3);

  
    
    // if rating have half -1 full star
    
    let stars; 
    if(ratingDecimal > 0){
        stars = parseInt(props.stars) -1;
    } else {
        stars = parseInt(props.stars);
    }

    // loop for full stars
    
    for(let i = 0; i < stars; i++){

        let fullStar = (
            <img key={i} style={{ width: "auto", height: "20px" }} src={starFullIcon} alt=""></img>
        );
          starsArray.push(fullStar);
    }

    
    // add the half star to array

    if(ratingDecimal > 0){
        let halfStar = (
            <img key={"halfStar"} style={{ width: "auto", height: "20px" }} src={starHalfIcon} alt=""></img>
        );
        starsArray.push(halfStar);
    }

    
    // calc the empty stars and loop for empty stars 

    let emptyStars = 10 - props.stars;

    for(let i = 0; i < emptyStars; i++){
        let emptyStar = (
            <img key={"emptyStar" + i} style={{ width: "auto", height: "20px" }} src={starEmptyIcon} alt=""></img>
       );
          starsArray.push(emptyStar);
    }

    */

    //console.log(starsArray);
    
    /*

      return <div className="rating">
            {starsArray.map((item, index) => item)}
         </div>

    */

    return (
        <div className="rating">
        {starsArray.map(item => item)}
    </div>

    );
    }
  
export default Rating;
