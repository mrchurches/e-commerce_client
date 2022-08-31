import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import CreateUser from './Components/CreateUser/CreateUser';
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/shopping_cart" component={ShoppingCart} />
        <Route path="/create_user"component={CreateUser} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
