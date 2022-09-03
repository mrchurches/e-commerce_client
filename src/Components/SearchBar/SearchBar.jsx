import { useState } from "react"
import { useDispatch } from "react-redux";
import { clear, searchProduct } from "../../redux/actions.js"

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
      dispatch(searchProduct(name));
      setName("");
    }

    function handleClick(e){
      dispatch(clear())
    }
  
    return (
    <div class="d-flex">
      <div>
        <form class="d-flex" role="search" onSubmit={handleSubmit}>
          <input class="form-control me-2" type="search" placeholder="Search a videogame..." required aria-label="Search" value={name} onChange={handleChange}/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
      <div className="clear">
        <button class="btn btn-outline-success" onClick={handleClick}>Clear</button>
      </div>
    </div>
  )
}

export default SearchBar