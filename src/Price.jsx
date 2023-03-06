import  {Component}  from 'react';

class Price extends Component{
   
    render(){
        return (
        <h3>
            {this.props.price}
        </h3>
        )
    }

}
export default Price