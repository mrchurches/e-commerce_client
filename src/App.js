import { Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Footer from "./Components/Footer/Footer";
import ProductDetails from './Components/ProductDetails/ProductDetails';
import NavBar from './Components/NavBar/NavBar';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';
import CreateUser from './Components/CreateUser/CreateUser';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import PostGame from './CreateGame/CreateGame';


function App() {
  return (
    <div className="App">
        <Route path="/" component={NavBar}/>
        <Route path="/" component={LandingPage} />
        <Route path="/detail/:id" component={ProductDetails} />
        <Route path="/shopping_cart" component={ShoppingCart} />
        <Route path="/create_user"component={CreateUser} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/admin/create" component={PostGame}/>
        <div className='footer'>
        <Footer />
        </div>
    </div>
  );
}

export default App;
