
import logo from './logo.svg';
import './App.css';

import Product from './Product';




function App() {
  return (
    <div className="App">
      
      <header className="App-header">

        <Product  price = "5$"  name = "bananas" description = "fresh bananas"/>
        
        <Product  price = "780֏"  name = "apple" description = "fresh apple"/>
        

      
        <img src={logo} className="App-logo" alt="logo" />
        
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
