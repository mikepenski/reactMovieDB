const Col = (props) => {
    
    return <div className={ props.class ? "col " + props.class: 'col' }>
                 {props.children }
           </div>
    }
  
export default Col;
