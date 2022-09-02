import React from "react";
import { getAllVideogames, filterByGenres, filterByPlatforms, getGenres, getPlatforms} from '../../redux/actions';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SideBar.css"

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
  dispatch(filterByGenres(e.target.value));
  console.log(e.target.value)
}
function handleFilterByPlatforms(e){
    e.preventDefault();
    dispatch(filterByPlatforms(e.target.value));
    console.log(e.target.value)
  }

    return (
        <div>
          <div>
            <select onChange={handleFilterByGenre}>
              <option value="default">Genres</option>
              {genres.length&&genres.map(e=>(
                <option key={e.name} value={e.name}>{e.name}</option>
              ))}
            </select>
          </div>
          {console.log(platforms)}
          <div>
            <select onChange={handleFilterByPlatforms}>
                <option value="default">Platforms</option>
                {platforms.length&&platforms.map(e=>(
                  <option key={e.name} value={e.name}>{e.name}</option>
                ))}
            </select>
          </div>
          {/* <div>
           <label>Genres</label> 
            <select onChange={e=> handleFilterByGenre(e)}>
                {genres?.map((g,index) => (<option key ={index} value={g.name}>{g.name}</option>))}
            </select>
          </div>
          <div>
            <label>Platforms</label>
            <select onChange={e=> handleFilterByPlatforms(e)}>
                {platforms?.map((g,index) => (<option key ={index}value={g.name}>{g.name}</option>))}
            </select>
          </div> */}
          
          {/* <div class="w-48 text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <button type="button" class="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        <svg aria-hidden="true" class="mr-2 w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
        Genero
    </button>
    <button type="button" class="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        <svg aria-hidden="true" class="mr-2 w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
        Genero
    </button>
    <button type="button" class="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        <svg aria-hidden="true" class="mr-2 w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
        Genero
    </button>
</div>
<div>

<button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown divider <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>


<div id="dropdownDivider" class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" className="dropdown">
    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
      <li class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
      <button class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</button>
      </li>
      <li class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
      <button class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</button>
      </li>
      <li class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
      <button class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</button>
      </li>
    </ul>
</div> */}

{/* </div> */}

        </div>
    )
}