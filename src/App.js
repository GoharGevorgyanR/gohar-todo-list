import logo from './logo.svg';
import './App.css';
import Hello from './Hello.jsx';
import Job from './Job'


function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        
        <Hello name = "Ann" age = {20}/>
        <Job job="logistik"/>
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
