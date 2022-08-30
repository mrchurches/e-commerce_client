
import { useState } from "react"
import { useDispatch } from "react-redux";
import { searchProduct } from "../../redux/actions.js"
const SearchBar = () => {
  let [name, setName] = useState("");
  let dispatch = useDispatch();
    function handleChange(e){
        e.preventDefault();
        if(e.target.value){
          setName(e.target.value)
        }
    }

    function handleSubmit(e){
      e.preventDefault();
      alert("buscando...")
      // dispatch(searchProduct(name));
      setName("");
    }
  
    return (
    <div className="search">
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search a videogame..." value={name} onChange={handleChange}/>
                <button type="submit" >Search</button>
            </form>
        </div>
            {/* <div className="clear">
            <button onClick={handleClick}>Clear</button>
            </div> */}
</div>
  )
}

export default SearchBar