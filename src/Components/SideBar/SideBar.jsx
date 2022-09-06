import React from "react";
import { getAllProducts, filterByGenres, filterByPlatforms, getGenres, getPlatforms, setCurrentPage, orderEsrb, clear} from '../../redux/actions';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SideBar.css"

/* const esrbMock = [ "Teen", "Mature", "Not rated", "Adults Only", "Everyone", "Everyone 10+", "Rating Pending" ] */

export default function SideBar (){
  const products = useSelector((state) => state.products)
  let genres = [...new Set(products.map(e => e.genres).flat().map(e => e.name))]
  let platforms = [...new Set(products.map(e => e.platforms).flat().map(e => e.name))]
  let esrb = [...new Set(products.map(e => e.esrb_rating))]

  /* const genres = useSelector((state => state.genres));
  const platforms = useSelector ((state => state.platforms)); */

const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getAllProducts())
    /* dispatch(getGenres());
    dispatch(getPlatforms()); */
},[dispatch])

function handleFilterByGenre(e){
  e.preventDefault();
  if(e.target.value!=="default"){
    dispatch(filterByGenres(e.target.value));
    dispatch(setCurrentPage(1))
  }
};

function handleFilterByPlatforms(e){
    e.preventDefault();
    if(e.target.value!=="default"){
      dispatch(filterByPlatforms(e.target.value));
      dispatch(setCurrentPage(1))
    }
  };

  function esrbContent(e) {
    e.preventDefault()
    let value = e.target.value
    if(value !== "default"){
      console.log(value)
      dispatch(orderEsrb(value))
    };
  };

  function handleClick(e) {
    dispatch(clear())
  }

  return (
    <div >
        <div>
          <select class="form-select" aria-label="Default select example" style={{ marginTop: '15px' }} onChange={(e) => handleFilterByGenre(e)}>
            <option value="default">Genres</option>
            {genres.length && genres.map(e => (
              <option key={e.name} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div>
          <select  class="form-select" aria-label="Default select example" style={{ marginTop: '15px' }} onChange={(e) => handleFilterByPlatforms(e)}>
            <option value="default">Platforms</option>
            {platforms.length && platforms.map(e => (
              <option key={e.name} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div>
          <select class="form-select" aria-label="Default select example" style={{ marginTop: '15px' }} onChange={(e) => esrbContent(e)}>
            <option value="default">ESRB Rating</option>
            {esrb?.map((esrb, index) => (
              <option key={index} value={esrb}> {esrb} </option>
            ))}
          </select>
        </div>

        <div className="clear mt-2">
        <button class="btn btn-outline-success bg-white w-100" onClick={handleClick}>Reset Filters</button>
      </div>
    </div>
    )
}