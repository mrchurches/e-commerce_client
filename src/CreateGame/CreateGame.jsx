import React, {useEffect} from "react"
import {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {getGenres, Post_Game}  from "../redux/actions";
//import {   useNavigate, NavLink } from "react-router-dom";

function validate(input){
    let error={};
    if(!input.name) error.name="Name required"
    if(!input.description) error.description ="Description required"
    if(!input.background_image) error.background_image="an image is required"
    if(!input.genres.length) error.genres="Select at least one Genre"
    return error
};

export default function PostGame(){
    const dispatch = useDispatch();
   // const navigate = useNavigate();
    const [activeSubmit, SetactiveSubmit] = useState(true);
    const genres = useSelector((state)=>state.genres);
    const [error, setError] = useState({});
    const [input, setInput] = useState({
        name:"",
        description:"",
        platforms:"",
        background_image:"",
        released:"",
        price:"",
        isDisabled:false,
        genres:[]
    });
    useEffect(()=>{
        dispatch(getGenres())
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
        /* ver si uso un dispatch para volver a cargar los juegos */
        //navigate("/home")
    };
    function handleChange(e){
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
    function handleDelete(e){
        setInput({
            ...input,
            genres: input.genres.filter( genres => genres !== e)
        })
    }

    
    return(

    <div class="mt-5 d-flex justify-content-center ">
        <div class="card shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '25rem' }}>
            <form onSubmit={(e)=>handlersubmit(e)}>
            <div class="mb-3">
                <label  class="form-label">Name</label>
                <input type="text"  aria-describedby="" placeholder="title of the game" onChange={handleChange} value={input.name} name="name" />
                {/* <small class="form-text">We'll never share your email with anyone else.</small> */}
            </div>
            <div class="mb-3">
                <label  class="form-label">Description</label>
                <input type="text" class="form-control"  onChange={handleChange}  value={input.description} name="description" />
            </div>
            <div class="mb-3">
                <label  class="form-label">Image</label>
                <input type="text" class="form-control"  onChange={handleChange} value={input.background_image} name="background_image" />
            </div>
            <div class="mb-3">
                <label  class="form-label">Release Date</label>
                <input type="date" class="form-control"  onChange={handleChange} value={input.released} name="released" />
            </div>
            <div class="mb-3">
                <label  class="form-label">Price</label>
                <input type="interger" class="form-control"  onChange={handleChange} value={input.price} name="price" />
            </div>
            <div class="mb-3">
                <label class="form-label">Genres</label>
                <select  placeholder="Select at least one Genre"   name="genres" value={input.genres} onChange={(e)=>handleSelectGenres(e)}>
                    <option>Select Genres</option > 
                    {genres && genres.map((e, pos)=>{ return <option id={pos} key={pos} value={e.genres}>{e.name}</option>})}
                </select>  
                {error.genres ? <label>Select at leats one diet</label> : null}
            </div>
            <input disabled={activeSubmit} type="submit" class="btn btn-primary" value="Create" />
            </form><br />
            {input.genres.map((genre, pos)=>
                <div>
                    <p id={pos}>{genre}</p>
                    <button onClick={()=>handleDelete(genre)}>X</button>
                </div>
            )}  
            </div>
    </div>
    )
}

