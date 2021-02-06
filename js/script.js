
let pokemonList = []; //I defined the variable pokemon list as an blank Array


// I created different variables with the name of the Pokémon, then assigned them a object with its different properties.
let pikachu =  {
    name: 'Pikachu', 
    height:  0.4, type: 'electric', 
    abilities: ['Static', 'Lightningrod']
}; 

let bulbasaur=  {
    name: 'Bulbasaur', 
    height:  0.7, 
    type: ['grass', 'poison'], 
    abilities: ['Chlorophyll', 'Overgrow']};

let charmander=  {
    name: 'Charmander', 
    height:  0.6, 
    type: 'fire', 
    abilities: ['Blaze', 'Solar-power']};

let squirtle=  {
    name: 'Squirtle', 
    height:  0.5, 
    type: 'water', 
    abilities: ['Rain-dish', 'Torrent']
};



pokemonList.push(pikachu, bulbasaur, charmander, squirtle); //with the function .push() I pushed the pokemons into the Aray pokemonList;


console.log(pokemonList);


