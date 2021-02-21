
let pokemonRepository = (function() {
    let pokemonList = [];                //defining the variable pokemon list as an blank Array
    let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=150'; //the API
        
        // this wraps the pokemonList array in an Immediately Invoked Function Expression (IIFE) to avoid accidentally accessing the global state.
    function add(pokemon) {
        properties = Object.keys(pokemon)
        console.log(properties);
                //the first conditional control if the pokemon that is trying to be added is an object. the second controls if the properties match the desired properties. 
            if (typeof pokemon === 'object'){ 
                if( properties[0] === "name" && 
                properties[1] === "detailsUrl" 
                ) {
                    pokemonList.push(pokemon);
                } else {
                    let stringifiedObject = JSON.stringify(pokemon);
                   console.log(`${stringifiedObject} wrong format, the pokemon can not be added`)
                    }
            } else {
                console.log(`${pokemon} is not a pokemon`);        
            }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon){
        let ulItem = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        ulItem.appendChild(listItem);
        listItem.classList.add('pokemon-li');
    
        let newButton = document.createElement('button');
        newButton.innerText = `${pokemon.name}`;  
        listItem.appendChild(newButton);
        newButton.classList.add('pokemon-button');

        newButton.addEventListener('click', function () {
            console.log('name: ' + pokemon.name)
            if (pokemon.name === 'pikachu') {
                newButton.appendChild(pikachu);
            } else if (pokemon.name === 'bulbasaur') {
                newButton.appendChild(bulbasaur);
            }else if (pokemon.name === 'charmander') {
                    newButton.appendChild(charmander);// adding img from js ( just to practice)
            }          
        });  // creates a event listener, when the button is clicked console logs the name... here the function is define as the second parameter.
        
        newButton.addEventListener('click', function () {
            showDetails(pokemon)               
        }); // creates a event listener, when the button is clicked console logs the type... similar to the last one but here the function is define outside the addListItem fuction. and called as 2d parameter
        
        showDetailsFromOutside(newButton, pokemon); // here the event listener is declare as a function outside, when the button is clicked console logs the height... 
    }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            console.log('type: '+ pokemon.types);
        })
        } 
    

    function showDetailsFromOutside (button, pokemon) {
        button.addEventListener('click', function () {
            loadDetails(pokemon).then(function(){
                console.log('height '+ pokemon.height);
            });
    })}; // this funcion is to be called from addListItem to listen to the click of a previously created button 
     
    
    //----- adding img from js---------------- ( just to practice)
    var pikachu = document.createElement("img"); 
    pikachu.src = 'js/pikachu.png'; 

    var bulbasaur = document.createElement('img');
    bulbasaur.src = 'js/bulbasaur.png'
    
    var charmander = document.createElement('img');
    charmander.src = 'js/charmander.png'



    //-------------------fetch pokemon list from API----

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) { //json is the API object in json format. result is the Key of the object whose values are the pokemons. this also creates an object forEach pokemon
                let pokemon = {
                name: item.name,
                detailsUrl: item.url
                };
                add(pokemon); // add the newly created object to the pokemon list array
            });
        }).catch(function (e) {
            console.error(e);
        })
      }

      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) { //details is the parameter that would be the return value of the previous function
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default; //sprites is the key of the object with the imgs
          item.height = details.height;
          item.types = []; 
          
          details.types.forEach(function(pokemon){
              item.types.push(pokemon.type.name)
          })
        }).catch(function (e) {
          console.error(e);
        });
      }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        showDetailsFromOutside: showDetailsFromOutside,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){  
        pokemonRepository.addListItem(pokemon)
    });    
});
console.log(pokemonRepository.getAll());









/*

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




var bugPokemon = pokemonRepository.getAll().filter(function(bugs) {
    return bugs.type == "bug";
}); 

// filter bug type pokemons 
 console.log(bugPokemon)


 let examplePromise = new Promise(function (resolve, reject) {
    let sum;
    setTimeout(function(){
      sum = 5 + 4;
      if(sum > 10) {
        resolve(sum);
      }else{
        reject('The promise has been rejected');
      }     
    }, 0);
  });
  
  console.log('some piece of code');

  examplePromise
  .then(function(result){
    console.log(result);
  })
  .catch(function(error){
    console.log(error);
  });
  
  console.log('another piece of code');



  let venonat = {
    NAME: 'Venonat', // the Key is Uppercase. it sould show an alert when trying to add it to pokemonRepository
    height:  1.0, 
    type: 'bug', 
    abilities: ['Compoundeyes', 'Tinted-lens']
};
pokemonRepository.add(venonat);
 
// -------------------------------------------------------this code was replaced by the IIFE     and the for each loop---------------------
//
// pokemonList.unshift(pikachu); // similar to push but adds the element at the biginnin

// pokemonList[4] = caterpie; // this comand adds an element at the specified index [4] of the array;

// console.log(pokemonList); 

// function printPokemonList(list/*parameter*///){  declaring a the function
// for (let i = 0; i < list.length; i++) {
//     if (list[i].height <= 0.3 ) {
//         document.write(`<p> ${list[i].name} (height: ${list[i].height}m) - So cute! That's a really tiny Pokémon! </p>`);   
//     } else {
//     document.write(`<p> ${list[i].name} (height: ${list[i].height}m)</p>`);    
//     }
//   } //this loop write the name of the pokemos and their height in the DOM also uses conditional to determinate the pokemon with a height < or = to 0.3
// }// printPokemonList()allows us to print in the DOM the list of pokemons from diferent arrays without having to write the loop again.
  
// printPokemonList(pokemonList/*argument*/); // calling a the function; */


/*   objects with wrong format  to check if the conditionals inside IIFE works.
pokemonRepository.add('tomate') // this is not a pokemon

let venonat = {
    NAME: 'Venonat', // the Key is Uppercase. it sould show an alert when trying to add it to pokemonRepository
    height:  1.0, 
    type: 'bug', 
    abilities: ['Compoundeyes', 'Tinted-lens']
};

pokemonRepository.add(venonat);

//pokemonRepository.unshiftPokemon(venonat);
*/
// -------------------------- here I change the "for loop" to a "forEach loop" the result is the same. 

