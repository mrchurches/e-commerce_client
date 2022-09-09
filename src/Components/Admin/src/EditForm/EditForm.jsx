import React, {useEffect} from "react"
import {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {getGenres, getPlatforms, Edit_Game}  from "../../../../redux/actions";
import style from './editForm.module.css'

function validate(input){
    let error={};
    if(!input.name) error.name="Name required"
    if(!input.description) error.description ="Description required"
    if(!input.background_image) error.background_image="an image is required"
    if(!input.rating || input.rating < 0 || input.rating > 100)error.rating = "Must rate the product with a number between 1 and 100"
    if(!input.price || input.price <= 0 )error.price = "Must put a price with a value higher than 0"
    if(!input.genres.length) error.genres="Must select at least one Genre"
    if(!input.released) error.released="Must select the release date of the product"
    if(!input.platforms.length) error.platforms="Must select at least one platform"
    return error
};

function getPayload(game,input){
    let payload = {}
    payload.id = game.id
    if (input.name !== game.name) payload.name =  input.name;
    if (input.isDisabled !== game.isDisabled) payload.isDisabled =  input.isDisabled;
    if (input.released !== game.released) payload.released =  input.released;
    if (input.description !== game.description) payload.description =  input.description;
    if (input.background_image !== game.background_image) payload.background_image =  input.background_image;
    if (''+input.rating !== ''+game.rating) payload.rating =  input.rating;
    if (''+input.price !== ''+game.price) payload.price =  input.price;
    let gameGenres = game.genres.map(e => e.name);
    const array2Sorted = gameGenres.slice().sort();
    const array1Sorted = input.genres.slice().sort();
    if (array1Sorted.length !== array2Sorted.length || array1Sorted.every((value, index) => value !== array2Sorted[index])){
        payload.addGenre = [];
        payload.rmvGenre = [];
        input.genres.forEach((e) => {
            if (!gameGenres.includes(e)) payload.addGenre.push(e);
        });
        gameGenres.forEach((e) => {
            if (!input.genres.includes(e)) payload.rmvGenre.push(e);
        });
    }
    let gamePlatforms = game.platforms.map(e => e.name);
    const plat2Sorted = gamePlatforms.slice().sort();
    const plat1Sorted = input.platforms.slice().sort();
    if (plat1Sorted.length !== plat2Sorted.length || plat1Sorted.every((value, index) => value !== plat2Sorted[index])){
        payload.addPlat = [];
        payload.rmvPlat = [];
        input.platforms.forEach((e) => {
            if (!gamePlatforms.includes(e)) payload.addPlat.push(e);
        });
        gamePlatforms.forEach((e) => {
            if (!input.platforms.includes(e)) payload.rmvPlat.push(e);
        });
    }
    return payload;
}

export default function EditForm({setRender, game}) {

    const goBack = () => {
        setRender({dash: false, add: false, edit: true, user: false, editForm: false});
    }
    //console.log(game);
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    const [activeSubmit, SetactiveSubmit] = useState(true);
    const genres = useSelector((state)=>state.genres);
    const platform = useSelector((state)=>state.platforms);
    const [error, setError] = useState({});
    const [input, setInput] = useState({
        name:game.name,
        description:game.description,
        background_image:game.background_image,
        released:game.released,
        price:game.price,
        rating:game.rating,
        isDisabled:game.isDisabled,
        platforms:game.platforms.map(e => e.name),
        genres:game.genres.map(e => e.name),
    });
    console.log()

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
        console.log(getPayload(game,input))
        if (Object.keys(getPayload(game,input)).length <= 1) SetactiveSubmit(true);
    }, [input, error])

    function handlersubmit (e){
        e.preventDefault();
        console.log(getPayload(game,input))
        dispatch(Edit_Game(getPayload(game,input)));
        console.log("se edito el juego")
        /* ver si uso un dispatch para volver a cargar los juegos */
        //navigate("/home")
    };
    function handleSwitch(e){
        setInput({
            ...input,
            isDisabled: !input.isDisabled,
        });
        console.log(input.isDisabled)
    }
    function handleChange(e){
        //console.log(input)
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
        //console.log(error)
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
        //console.log(e.target.value)
        //console.log(input.genres)
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
        //console.log(e.target.value)
        //console.log(input.platforms)
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

    var display = 'block'
    if (!activeSubmit) {
        display = 'none'
    }

  return (
    <div className={style.container}>
        <button value='test' class="btn btn-secondary" type="button" aria-expanded="false" style={{ marginBottom: '15px'}} onClick={goBack} className={style.goBack}>Go Back</button>
        <h1>Edit Game</h1>
        


        <div class="d-flex justify-content-center mt-3">
            <div class="card shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '25rem'}}>
                <form onSubmit={(e)=>handlersubmit(e)}>

                    <div class="d-flex" className={style.isDisabled}>
                        <div className={style.enabled}>Enabled:</div>
                    <div class="form-check form-switch ml-1">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleSwitch} name="isDisabled" checked={!input.isDisabled}/>
                        {/* <label class="form-check-label" for="flexSwitchCheckDefault"></label> */}
                    </div>
                    </div>
                    

                    <div class="mb-3 w-100">
                    {/*  <label  class="form-label">Name</label> */}
                        <input type="text" class="form-control" className={style.name} style={{width:"100%"}} placeholder="title of the game..." onChange={handleChange} value={input.name} name="name" />
                        {/* <small class="form-text">We'll never share your email with anyone else.</small> */}
                        {error.name? <label className={style.labelError}>{error.name}</label>:null}
                    </div>
                    <div class="mb-3">
                    {/*  <label  class="form-label">Description</label> */}
                        <textarea type="text" class="form-control"  placeholder="a brief summary..." onChange={handleChange}  value={input.description} name="description" />
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
                    <div class='d-flex just justify-content-center'><div className={style.type}>Genres:</div><div className={style.type}>Platforms:</div></div>
                    <div class='d-flex just justify-content-center'>
                    <div className={style.genresContainer}>
                    {input.genres.map((genre, pos)=>
                        <div className={style.flex}>
                            <p id={pos} onClick={()=>handleDeleteGenre(genre)} class="font-family: fantasy">{genre} X</p>
                            {/* <button onClick={()=>handleDeleteGenre(genre)}>X</button> */}
                        </div>
                    )}  
                    </div>
                    <div className={style.genresContainer}>
                    {input.platforms.map((plataforma,pos)=>
                        <div className={style.flex}>
                            <p id={pos} onClick={()=>handleDeletePlat(plataforma)}>{plataforma} X</p>
                        </div>
                    )}
                    </div>
                    </div>
                    <br></br>

                    <div style={{display: display, color:'red', marginBottom: '5px'}}>Must change at least one parameter</div>
                    {/* <button type="submit" disabled={activeSubmit}>Create!!</button> */} 
                    <button type="submit" class="btn btn-primary" disabled={activeSubmit}>EDIT</button>
                </form>
            </div>
        </div>





    </div>
  )
}
