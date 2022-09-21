import ProductCard from "../Cards/ProductCard/ProductCard"


export function RandomHelper(games){
    // console.log(games)
    let arrGames=[];
    if(games.games.length>0){
        for(let i=0; i<6;i++){
        let number = Math.floor(Math.random() * 100)
        // console.log(games.games[number])
        let { id, id_api, name, background_image, rating, platforms, price, fromApi, isDisabled, genres } = games.games[number];
        arrGames.push(<div>
            <ProductCard id={id}
            name={name} img={background_image} rating={rating} platforms={platforms} price={price}
            fromApi={fromApi} isDisabled={isDisabled} genres={genres} />
        </div>)
    }}
    return arrGames;
}