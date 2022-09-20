import { useState } from "react"
import { useDispatch } from "react-redux";
import { clear, searchProduct, setCurrentPage } from "../../redux/actions.js"

const SearchBar = ({button}) => {
  let [name, setName] = useState("");
  let dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
      setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchProduct(name));
    dispatch(setCurrentPage(1));
    setName("");
  }

  function handleClick(e) {
    dispatch(clear())
  }
  var buttonStyle = 'btn-secondary'
  if(button === 'admin'){
    buttonStyle = 'btn-secondary'
  }

  return (
    <div class="d-flex">
      <div>
        <form class="d-flex" role="search" onSubmit={handleSubmit}>
          <input class="form-control me-2" type="search" placeholder="Search a videogame..." required aria-label="Search" value={name} onChange={handleChange} />
          <button class={`btn ${buttonStyle}`} type="submit">Search</button>
        </form>
      </div>
      <div className="clear">
        <button class={`btn ${buttonStyle}`} onClick={handleClick}>Clear</button>
      </div>
    </div>
  )
}

export default SearchBar