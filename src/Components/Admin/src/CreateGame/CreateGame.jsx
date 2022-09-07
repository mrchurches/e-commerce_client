import React, {useEffect} from "react"
import {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {getGenres, getPlatforms, Post_Game}  from "../../../../redux/actions";
import style from "./CreateGame.module.css";
//import {   useNavigate, NavLink } from "react-router-dom";

function validate(input){
    let error={};
    if(!input.name) error.name="Name required"
    if(!input.description) error.description ="Description required"
    if(!input.background_image) error.background_image="an image is required"
    if(!input.rating || input.rating < 0 || input.rating > 100 || input.rating.includes("."))error.rating = "Must rate the product with a number between 1 and 100"
    if(!input.price || input.price <= 0 )error.price = "Must put a price with a value higher than 0"
    if(!input.genres.length) error.genres="Must select at least one Genre"
    if(!input.released) error.released="Must select the release date of the product"
    if(!input.platforms.length) error.platforms="Must select at least one platform"
    return error
};

export default function PostGame(){
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    const [activeSubmit, SetactiveSubmit] = useState(true);
    const genres = useSelector((state)=>state.genres);
    const platform = useSelector((state)=>state.platforms);
    const [error, setError] = useState({});
    const [input, setInput] = useState({
        name:"",
        description:"",
        background_image:"",
        released:"",
        price:"",
        rating:"",
        //isDisabled:false,
        platforms:[],
        genres:[],
    });
    useEffect(()=>{
        dispatch(getGenres())
        dispatch(getPlatforms())
        const llaves = Object.keys(input)
        for (const key of llaves) {
            if (input[key] && !error[key]) { //si hay input y no hay errores --false
                SetactiveSubmit(false)
            }else {
                SetactiveSubmit(true)
                break;
            };
        };
    }, [input, error])

    function handlersubmit (e){
        e.preventDefault();
        dispatch(Post_Game(input));
        console.log("se envio el juego")
        /* ver si uso un dispatch para volver a cargar los juegos */
        //navigate("/home")
    };
    function handleChange(e){
        console.log(input)
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
        console.log(error)
    };
    function handleSelectGenres(e) {
        if (!input.genres.includes(e.target.value)) //evitar repetidos
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            });
        setError(validate({
            ...input,
            genres: [...input.genres, e.target.value]
        }));
        console.log(e.target.value)
        console.log(input.genres)
    }
    function handleSelectPlat(e) {
        if (!input.platforms.includes(e.target.value)) //evitar repetidos
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            });
        setError(validate({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }));
        console.log(e.target.value)
        console.log(input.platforms)
    };
    function handleDeleteGenre(e){
        setInput({
            ...input,
            genres: input.genres.filter( genres => genres !== e)
        })
    };
    function handleDeletePlat(e){
        setInput({
            ...input,
            platforms: input.platforms.filter( platform => platform !== e)
        })
    };
    
    return(
        <div class="mt-5 d-flex justify-content-center ">
        <div class="card shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '25rem'}}>
            <form onSubmit={(e)=>handlersubmit(e)}>
                <p>Add a new Game:</p>
                <div class="mb-3 w-100">
                {/*  <label  class="form-label">Name</label> */}
                    <input type="text" class="form-control" className={style.name} style={{width:"100%"}} placeholder="title of the game..." onChange={handleChange} value={input.name} name="name" />
                    {/* <small class="form-text">We'll never share your email with anyone else.</small> */}
                    {error.name? <label className={style.labelError}>{error.name}</label>:null}
                </div>
                <div class="mb-3">
                {/*  <label  class="form-label">Description</label> */}
                    <input type="text" class="form-control"  placeholder="a brief summary..." onChange={handleChange}  value={input.description} name="description" />
                    {error.description ? <label className={style.labelError}>{error.description}</label>:null}
                </div>
                <div class="mb-3">
                    {/* <label  class="form-label">Image</label> */}
                    <input type="text" class="form-control" placeholder="an image url..." onChange={handleChange} value={input.background_image} name="background_image" />
                    {error.background_image ? <label className={style.labelError}>{error.background_image}</label> : null}
                </div>
                <div class="mb-3">
                    {/* <label  class="form-label">Release Date</label> */}
                    <input type="date" class="form-control"  placeholder="Realese date..." onChange={handleChange} value={input.released} name="released" />
                    {error.released ? <label className={style.labelError}>{error.released}</label> : null}
                </div>
                <div class="mb-3">
                {/*  <label  class="form-label">Rating</label> */}
                    <input type="number" class="form-control" placeholder="Rating of the game..." onChange={handleChange} min="1" max="100" value={input.rating} name="rating" />
                    {error.rating ? <label className={style.labelError}>{error.rating}</label> : null}
                </div>
                <div class="mb-3">
                    {/* <label  class="form-label">Price</label> */}
                    <input type="number" class="form-control" placeholder="Price..." onChange={handleChange}  min="1" max="100" value={input.price} name="price" />
                    {error.price ? <label className={style.labelError}>{error.price}</label> : null}
                </div>
                <div class="mb-3">
                {/*  <label class="form-label">Genres</label> */}
                    <select  placeholder="Select at least one Genre..." class="form-select"  name="genres" value={input.genres} onChange={(e)=>handleSelectGenres(e)}>
                        <option>Select Genres</option > 
                        {genres && genres.map((e, pos)=>{ return <option id={pos} key={e.id} value={e.genres}>{e.name}</option>})}
                    </select>  
                    {error.genres ? <label className={style.labelError}>Select a Genre</label> : null}
                </div>
       
                <div class="mb-3">
                    {/* <label class="form-label">Platform</label> */}
                    <select placeholder="Select at least one Platform" class="form-select" name="platforms" value={input.platforms} onChange={(e)=>handleSelectPlat(e)}>
                        <option>Select Platforms</option>
                        {platform && platform.map((consola, pos)=>{
                            return <option id={consola.id} key={consola.id} value={consola.platforms}>{consola.name}</option>
                        })}
                    </select>
                    {error.platforms ? <label className={style.labelError}>{error.platforms}</label>:null}
                </div>
                <br></br>
                        {input.genres.map((genre, pos)=>
                            <div className={style.flex}>
                                <p id={pos} onClick={()=>handleDeleteGenre(genre)} class="font-family: fantasy">{genre}</p>
                                {/* <button onClick={()=>handleDeleteGenre(genre)}>X</button> */}
                            </div>
                        )}  
                {input.platforms.map((plataforma,pos)=>
                    <div className={style.flex}>
                        <p id={pos} onClick={()=>handleDeletePlat(plataforma)}>{plataforma}</p>
                    </div>
                )}
                <br></br>
                {/* <button type="submit" disabled={activeSubmit}>Create!!</button> */} 
                <button type="submit" class="btn btn-primary" disabled={activeSubmit}>Create</button>
            </form>
        </div>
    </div>
    )
};

