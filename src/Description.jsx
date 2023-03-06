
import  {Component}  from 'react';

class Description extends Component{  

    render(){
        return (
        <h3>
            {this.props.description}
        </h3>
        )
    }

}
export default Description