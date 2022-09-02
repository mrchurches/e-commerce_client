import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Footer from "./Components/Footer/Footer";
import CreateUser from './Components/CreateUser/CreateUser';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/create_user"component={CreateUser} />
    {/*     <Route path="/shopping_cart" component={ShoppingCart} />
        <Route path="/login" component={Login} /> */}
      </Switch>
    </div>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
