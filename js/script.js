
let pokemonList = []; //I defined the variable pokemon list as an blank Array

// I created different variables with the name of the Pokémon, then assigned them a object with its different properties.
let pikachu =  {
    name: 'Pikachu', 
    height:  0.4, type: 'electric', 
    abilities: ['Static', 'Lightningrod']
}; 

let bulbasaur =  {
    name: 'Bulbasaur', 
    height:  0.7, 
    type: ['grass', 'poison'], 
    abilities: ['Chlorophyll', 'Overgrow']
};

let charmander =  {
    name: 'Charmander', 
    height:  0.6, 
    type: 'fire', 
    abilities: ['Blaze', 'Solar-power']
};

let squirtle =  {
    name: 'Squirtle', 
    height:  0.5, 
    type: 'water', 
    abilities: ['Rain-dish', 'Torrent']
};

let caterpie = {
    name: 'Caterpie', 
    height:  0.3, 
    type: 'bug', 
    abilities: ['Shield-dust', 'Run-away']
};

pokemonList.push(bulbasaur, charmander, squirtle); //with the function .push() I pushed the pokemons into the Aray pokemonList;

pokemonList.unshift(pikachu); // similar to push but adds the element at the biginnin

pokemonList[4] = caterpie; // this comand adds an element at the specified index [4] of the array;

console.log(pokemonList); 


for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height <= 0.3 ) {
        document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}m) - So cute! That's a really tiny Pokémon! </p>`);   
    } else {
    document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}m)</p>`);    
    }
  } //this loop write the name of the pokemos and their height in the DOM also uses conditional to determinate the pokemon with a height < or = to 0.3

  
