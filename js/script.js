
let pokemonRepository = (function() {
  let pokemonList = [];                //defining the variable pokemon list as an blank Array
  let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=150'; //the API
        
  // this wraps the pokemonList array in an Immediately Invoked Function Expression (IIFE) to avoid accidentally accessing the global state.
  function add(pokemon) {
    let properties = Object.keys(pokemon)

    //the first conditional control if the pokemon that is trying to be added is an object. the second controls if the properties match the desired properties. 
    if (typeof pokemon === 'object'){ 
      if( properties[0] === 'name' && 
                properties[1] === 'detailsUrl' 
      ) {
        pokemonList.push(pokemon);
      } else {
        let stringifiedObject = JSON.stringify(pokemon);
        alert(`${stringifiedObject} wrong format, the pokemon can not be added`)
      }
    } else {
      alert(`${pokemon} is not a pokemon`);        
    }
  }

  function getAll() {
    return pokemonList;
  }

  function loadList() { 
        
    showLoadingMessage();
                
    return fetch(apiUrl).then(function (response) {

      return response.json();

    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) { //json is the API object in json format. result is the Key of the object whose values are the pokemons. this also creates an object forEach pokemon
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon); // add the newly created object to the pokemon list array
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
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

    // newButton.addEventListener('click', function () { //----this code is to practice the createEventListener() inside the function and outside the function and  
    //     console.log('name: ' + pokemon.name) 
    //     //showModal (showModal (pokemon.name, 'height: ' + pokemon.height, 'type: ' + pokemon.types, pokemon.image));       
    // });  // creates a event listener, when the button is clicked console logs the name... here the function is define as the second parameter.
        
    newButton.addEventListener('click', function () {
      showDetails(pokemon);               
    }); // creates a event listener, when the button is clicked console logs the type... similar to the last one but here the function is define outside the addListItem fuction. and called as 2d parameter
        
    //showDetailsFromOutside(newButton, pokemon); // here the event listener is declare as a function outside, when the button is clicked console logs the height... this code is to practice the createEventListener() inside the function and outside the function and  
  }

  function showDetails(pokemon){
    let index = pokemonList.indexOf(pokemon);
    let nextPokemon = pokemonList[index + 1]
    let previousPokemon = pokemonList[index - 1]
    loadDetails(pokemon).then(function(){
           
      showModal (pokemon.name, pokemon.height, pokemon.types, pokemon.image, nextPokemon, previousPokemon);
    })
  }
    

  // function showDetailsFromOutside (button, pokemon) { //
  //     button.addEventListener('click', function () {
  //         loadDetails(pokemon).then(function(){
  //             showModal (pokemon.name, 'height: ' + pokemon.height, 'type: ' + pokemon.types, pokemon.image);
  //         }); 
  // })}; // this funcion is to be called from addListItem to listen to the click of a previously created button 
     

  //-------------------fetch pokemon list from API----

  function loadDetails(item) {
    console.log(item);
    showLoadingMessage ();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) { //details is the parameter that would be the return value of the previous function
      // Now we add the details to the item
      hideLoadingMessage();
      item.imageUrl = details.sprites.front_default; //sprites is the key of the object with the imgs
      item.height = details.height;
      item.image = details.sprites.other.dream_world.front_default;
      item.types = []; 
            
      details.types.forEach(function(pokemon){
        item.types.push(pokemon.type.name)
      })
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }
    
  function showLoadingMessage (){
    let loadingContainer = document.querySelector('.loading-message');
    let loadingMessage = document.createElement('h1');
    loadingMessage.innerText='Loading list...'
    return loadingContainer.appendChild(loadingMessage);
  }

  function hideLoadingMessage(){
    let elementToRemove = document.querySelector('.loading-message');
    let remove = document.querySelector('h1')
    return elementToRemove.removeChild(remove)
  }

  // --------------------- Modal Code
  let modalContainer = document.querySelector('#modal-container');

  function showModal (title, text, type, imgUrl, nextPokemon, previousPokemon) {

    text = 'Height: ' + text + ' cm';
    type = 'Type: ' + type;
        
    //next, we add the content of the modal with js...

    modalContainer.innerText = ''; // clear all existing code (important cause it clean the previous pokemon info).

    //crate the div .modal.
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modalContainer.appendChild(modal);
        
    // add modal content: 
    
    // let modalHeader = new Image();
    // modalHeader.src = "js/pokedex.svg";
    // modalHeader.classList.add('pokedex-svg')
    //     modal.appendChild(modalHeader);


    //Close button             
    let modalClose = document.createElement('button');
    modalClose.classList.add('modal-close');
    modalClose.innerText = 'close';
    modal.appendChild(modalClose);

    modalClose.addEventListener('click', function () { //calls the hideModal() so removes the .is-visible. it Has to be call from inside this function because here is the created element.
      hideModal (); 
    });
    //Modal title
    let tittleElement = document.createElement('h1');
    tittleElement.innerText = title;
    tittleElement.classList.add('pokemon-title');
    modal.appendChild(tittleElement);

    //modal Paragraf
    let contentElement = document.createElement('p');
    contentElement.innerText = text;
    modal.appendChild(contentElement);

    //modal Paragraf 2; 
    let typeElement = document.createElement('p');
    typeElement.innerText = type;
    modal.appendChild(typeElement);

    // add imgage

    let imageElement = new Image();
    imageElement.src = imgUrl;
    imageElement.classList.add('image-pokemon')
    modal.appendChild(imageElement);


    // -------------------next button
        
        

    let nextPreviousConteiner = document.createElement('div');
    nextPreviousConteiner.classList.add('next-previous-container')
    modal.appendChild(nextPreviousConteiner);

    if (previousPokemon !== undefined){
      let previousButton = document.createElement('button');
      previousButton.classList.add('previous-button');
      previousButton.innerText = 'previous';
                
      nextPreviousConteiner.appendChild(previousButton);
    
      previousButton.addEventListener('click', function () { 
        hideModal (); 
                
        showDetails(previousPokemon);
      });
    }

    let extraDiv = document.createElement('div');
    nextPreviousConteiner.appendChild(extraDiv);

    if (nextPokemon !== undefined){
      let nextButton = document.createElement('button');
      nextButton.classList.add('next-button');
      nextButton.innerText = 'next';
      nextPreviousConteiner.appendChild(nextButton);

      nextButton.addEventListener('click', function () { 
        hideModal (); 

        showDetails(nextPokemon);
      });
    }
            

    //-------------------
      
    //hide modal clicking outside the modal
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer){
        hideModal();
      }
    })

    modalContainer.classList.add('is-visible'); // adds the .is-visible to the #modal-container making it visible.
  }

 

  let dialogPromiseReject; // This can be set later, by showDialog

  function hideModal () {
    modalContainer.classList.remove('is-visible')

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }


  //hide the modal by pressing Escape.    
  window.addEventListener('keydown', (e) => { 
       
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  } );
   
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    //showDetailsFromOutside: showDetailsFromOutside,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
        
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){  
    pokemonRepository.addListItem(pokemon)
  });    
});




// ------            dialog code        -------------
//     to use this function it muss be copied inside the Immediately Invoked Function Expression IIFE and adapt the parameter of showDialog() to the new created parameter of showModal()
//     function showDialog(tittle, text) {
//         showModal(tittle, text);

//         // add confirm and cancel button to the modal
//         let modal = modalContainer.querySelector('.modal');

//         let confirmButton = document.createElement('button');
//         confirmButton.classList.add('modal-confirm');
//         confirmButton.innerText = 'Confirm';

//         let cancelButton = document.createElement('button');
//         cancelButton.classList.add('modal-cancel');
//         cancelButton.innerText = 'Cancel';

//         modal.appendChild(confirmButton);
//         modal.appendChild(cancelButton);

//         confirmButton.focus();// We want to focus the confirmButton so that the user can simply press Enter

//         return new Promise((resolve, reject) => {
//             cancelButton.addEventListener('click', hideModal);
//             confirmButton.addEventListener('click', () => {
//               dialogPromiseReject = null; // Reset this
//               hideModal();
//               resolve();
//             });
//             // This can be used to reject from other functions
//             dialogPromiseReject = reject;
//           });
//     };

//     document.querySelector('#show-dialog').addEventListener('click', function () {
//         showDialog('Confirm action','Are you sure you want to do this?').then(function() {
//             alert('confirmed!');
//           }, () => {
//             alert('not confirmed');
//           });
//     }); ------------------------------dialog code ends--------------





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

