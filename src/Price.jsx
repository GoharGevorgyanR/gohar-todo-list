import  {Component}  from 'react';

class Price extends Component{

    constructor(props){
        super(props);
        this.state = {
            price: `${props.text}`,
            exchangeRate: 390,
        };
    }

    changeCurrency = ()=>{
        const {price, exchangeRate} = this.state;
        if(price.endsWith('$')){ 
          let priceAMD = parseFloat(price) * exchangeRate;
          this.setState({
            price: `${priceAMD}֏`
          });

        }
        else {
            let priceUSD = parseFloat(price)/exchangeRate;
            this.setState({
                price: `${priceUSD}$ `
              });
        }
    };
   
    render(){
        return (
        <div>
            Price: {this.state.price}
            <br />
            <button onClick = {this.changeCurrency}>Change the currency</button>
        </div>
        )
    }

}
export default Price 