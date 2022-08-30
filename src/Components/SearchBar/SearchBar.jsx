
import { useState } from "react"
const SearchBar = () => {
  let [name, setName] = useState()
    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(){

    }
  
    return (
    <div className="search">
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search a country..." value={name} onChange={handleChange}/>
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