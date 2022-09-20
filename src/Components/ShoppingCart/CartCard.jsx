import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { $CombinedState } from "redux";
import { removeFromCart } from "../../redux/actions";
import styles from "./CartCard.module.css"

function CartCard({id, name, img, rating, platforms, price}) {
    let dispatch = useDispatch()
    let platformsString = "";
  platforms && platforms.forEach(e=> platformsString = platformsString + `  ${e.name}`);
    
    function handleRemove(){
        dispatch(removeFromCart(id))
        let LS = JSON.parse(localStorage.getItem("cart"));
        LS = LS.filter(e=> e!==id);
        localStorage.setItem("cart", JSON.stringify(LS))
        window.location.reload();
    }

    return (
    <div className={styles.conteiner}>
        <div  >
            <img className={styles.img} src={img} alt="gameimg"/>
        </div>
        <div className={styles.conteiner2}>
            <div>
                <Link to={`/detail/${id}` } style={{textDecoration:'none'}}>
                    <small>{name}</small>
                </Link>
                
            </div>
            <div>
                <div>
                    <h3>{`$ ${price}`}</h3>
                    <div className={styles.button}>
                    <button onClick={(e)=> handleRemove(e)} type="button" class="btn btn-secondary">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartCard