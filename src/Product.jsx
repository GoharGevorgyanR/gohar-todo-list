import  {Component}  from 'react';
import Price  from './Price';
import Name from './Name';
import Description from './Description';

class Product extends Component{
    
     render(){
        return (
        <div>
            
            <Name text = {this.props.name} />
            <Price text = {this.props.price} />
            <Description text = {this.props.description}/>
            <hr />

        </div>
        )
     }
}

export default Product