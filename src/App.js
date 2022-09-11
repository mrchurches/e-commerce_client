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
import PostGame from './Components/Admin/src/CreateGame/CreateGame';
import MyStore from './Components/MyStore/MyStore';
import Account from './Components/Account/Account';
import WishList from "./Components/WishList/WishList.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Pasarela from "./Components/Checkout/Checkout";

import Admin from './Components/Admin/Admin';

import { useSelector } from 'react-redux';
import Checkout from './Components/Checkout/Checkout';
import Verify from './Components/Verify/Verify.jsx';
import VerifyAuth from './Components/Verify/VerifyAuth';



function App() {
let users = useSelector(state=>state.users);

console.log(users)
  return (
    <div className="App">

        <Route path="/" component={NavBar}/>
        <Route path="/" component={LandingPage} />
        <Route path="/detail/:id" component={ProductDetails} />
        <Route path="/shopping_cart" component={ShoppingCart} />
        <Route path="/my_store" component={MyStore} />
        <Route path="/create_user"component={CreateUser} />
        <Route path="/wish_list" component={WishList}/>
        <Route path="/account" component={Account}/>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/verify/:email" component={Verify} />
        <Route path="/oauth2/:token" component={VerifyAuth} />
        {/* <Route path="/checkout/:id" component={Checkout}/> */}
        { users && users.user && users.user.isAdmin ? <Route path="/admin" component={Admin}/> : null }
        <Route path="/:id" component={NotFound}/>
        <div className='footer'>
        <Footer />
        </div>
    </div>
  );
}

export default App;
