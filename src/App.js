import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route path="/" component={LandingPage} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
