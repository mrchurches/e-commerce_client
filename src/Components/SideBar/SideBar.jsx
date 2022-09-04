import React from "react";
import { getAllVideogames, filterByGenres, filterByPlatforms, getGenres, getPlatforms, setCurrentPage, orderEsrb} from '../../redux/actions';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SideBar.css"

const esrbMock = [ "Teen", "Mature", "Not rated", "Adults Only", "Everyone", "Everyone 10+", "Rating Pending" ]

export default function SideBar (){
  const genres= useSelector((state=>state.genres));
  const platforms = useSelector ((state =>state.platforms));

  const dispatch = useDispatch();
  

  useEffect(()=>{
    dispatch(getGenres());
    dispatch(getPlatforms());
},[dispatch])

function handleFilterByGenre(e){
  e.preventDefault();
  if(e.target.value!=="default"){
    dispatch(filterByGenres(e.target.value));
    dispatch(setCurrentPage(1))
  }
}
function handleFilterByPlatforms(e){
    e.preventDefault();
    if(e.target.value!=="default"){
      dispatch(filterByPlatforms(e.target.value));
      dispatch(setCurrentPage(1))
    }
  }

  function esrbContent(e) {
    e.preventDefault()
    let value = e.target.value
    if(value !== "default"){
      console.log(value)
      dispatch(orderEsrb(value))
    };
  };

  return (
    <div >
        <div>
          <select class="form-select" aria-label="Default select example" style={{ marginTop: '15px' }} onChange={(e) => handleFilterByGenre(e)}>
            <option value="default">Genres</option>
            {genres.length && genres.map(e => (
              <option key={e.name} value={e.name}>{e.name}</option>
            ))}
          </select>
        </div>
        <div>
          <select class="form-select" aria-label="Default select example" style={{ marginTop: '15px' }} onChange={(e) => handleFilterByPlatforms(e)}>
            <option value="default">Platforms</option>
            {platforms.length && platforms.map(e => (
              <option key={e.name} value={e.name}>{e.name}</option>
            ))}
          </select>
        </div>
        <div>
          <select class="form-select" aria-label="Default select example" style={{ marginTop: '15px' }} onChange={(e) => esrbContent(e)}>
            <option value="default">ESRB Rating</option>
            {esrbMock?.map((esrb, index) => (
              <option key={index} value={esrb}> {esrb} </option>
            ))}
          </select>
        </div>
    </div>
    )
}