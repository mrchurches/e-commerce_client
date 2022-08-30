import React from "react";
import { getAllVideogames, filterByGenres, filterByPlatforms} from '../../redux/actions';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export default function SideBar (){
  const genres= useSelector((state=>state.genres));
  const platforms = useSelector ((state =>state.plataforms))
  const dispatch = useDispatch()
  

  useEffect(()=>{
    dispatch(("PLATFORMS"));
    dispatch(("GENEROS"))
},[dispatch])

function handleFilterByGenre(e){
  e.preventDefault();
  dispatch(filterByGenres(e.target.value));
}
function handleFilterByPlatforms(e){
    e.preventDefault();
    dispatch(filterByPlatforms(e.target.value));
  }

    return (
        <div>
            <select onChange={e=> handleFilterByGenre(e)}>
                {genres?.map((g,index) => (<option key ={index}value={g.name}>{g.name}</option>))}
            </select>
            <select onChange={e=> handleFilterByPlatforms(e)}>
                {platforms?.map((g,index) => (<option key ={index}value={g.name}>{g.name}</option>))}
            </select>

        </div>
    )
}