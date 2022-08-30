import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <h1>PF</h1>
      <Route exact path="/landing" component={LandingPage}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
