
let pokemonRepository = (function() {
    let pokemonList = [];                //defining the variable pokemon list as an blank Array
    
        // this wraps the pokemonList array in an Immediately Invoked Function Expression (IIFE) to avoid accidentally accessing the global state.
    function add(pokemon) {
        
    properties = Object.keys(pokemon)
            //the first conditional control if the pokemon that is trying to be added is an object. the second controls if the properties match the desired properties. 
        if (typeof pokemon === 'object'){ 
            if( properties[0] === "name" && properties[1] === "height" && properties[2] === "type" && properties[3] === "abilities") {
                pokemonList.push(pokemon);
            } else {
                let stringifiedObject = JSON.stringify(pokemon);
                alert(`${stringifiedObject} wrong format, the pokemon can not be added`)
                }
        } else {
            alert(`${pokemon} is not a pokemon`)        
        }
    }

    function unshiftPokemon(pokemon) {
        return pokemonList.unshift(pokemon)
    }

    function remove(pokemon) {
        return pokemonList.pop(pokemon);
    }
    
    function getAll() {
        return pokemonList;
    }
   
    return {
        add: add,
        getAll: getAll,
        remove: remove,
        unshiftPokemon: unshiftPokemon
    };
})();

// I created different variables with the name of the Pokémon, then assigned them a object with its different properties.
let pikachu =  {
    name: 'Pikachu', 
    height:  0.4, 
    type: 'electric', 
    abilities: ['Static', 'Lightningrod']
}; 

let bulbasaur =  {
    name: 'Bulbasaur', 
    height:  0.7, 
    type: 'grass',
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

pokemonRepository.add(pikachu); //with the function .push() I pushed the pokemons into the Aray pokemonList;

pokemonRepository.add(bulbasaur);

pokemonRepository.add(charmander);

pokemonRepository.add(squirtle);

pokemonRepository.add(caterpie);

console.log(pokemonRepository.getAll())


// pokemonList.unshift(pikachu); // similar to push but adds the element at the biginnin

// pokemonList[4] = caterpie; // this comand adds an element at the specified index [4] of the array;

// console.log(pokemonList); 

// function printPokemonList(list/*parameter*/){ // declaring a the function
// for (let i = 0; i < list.length; i++) {
//     if (list[i].height <= 0.3 ) {
//         document.write(`<p> ${list[i].name} (height: ${list[i].height}m) - So cute! That's a really tiny Pokémon! </p>`);   
//     } else {
//     document.write(`<p> ${list[i].name} (height: ${list[i].height}m)</p>`);    
//     }
//   } //this loop write the name of the pokemos and their height in the DOM also uses conditional to determinate the pokemon with a height < or = to 0.3
// }// printPokemonList()allows us to print in the DOM the list of pokemons from diferent arrays without having to write the loop again.
  
// printPokemonList(pokemonList/*argument*/); // calling a the function; */


pokemonRepository.add('tomate') // this is not a pokemon

let venonat = {
    NAME: 'Venonat', // the Key is Uppercase. it sould show an alert when trying to add it to pokemonRepository
    height:  1.0, 
    type: 'bug', 
    abilities: ['Compoundeyes', 'Tinted-lens']
};

pokemonRepository.add(venonat);

//pokemonRepository.unshiftPokemon(venonat);


// -------------------------- here I change the "for loop" to a "forEach loop" the result is the same. 
pokemonRepository.getAll().forEach(function(item){  
    if (item.height <= 0.3 ) {
        document.write(`<p> ${item.name} (height: ${item.height}m) - So cute! That's a really tiny Pokémon! </p>`);   
    } else {
    document.write(`<p> ${item.name} (height: ${item.height}m)</p>`);    
    }
})


var bugPokemon = pokemonRepository.getAll().filter(function(bugs) {
    return bugs.type == "bug";
}); 

// filter bug type pokemons 
 console.log(bugPokemon)  


 
