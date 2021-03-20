const Row = (props) => {
    
    return <div className={ "row" + props.class ? props.class: 'row' }>
                 {props.children }
           </div>
    }
  
export default Row;
