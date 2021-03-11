
const pokemonRepository = (function() {
  const pokemonList = [];                //defining the variable pokemon list as an blank Array
  const apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=150'; //the API
        
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

    newButton.addEventListener('click', function () {
      showDetails(pokemon);               
    }); // creates a event listener, when the button is clicked console logs the type... similar to the last one but here the function is define outside the addListItem function. and called as 2d parameter
  }

  function showDetails(pokemon){
    let index = pokemonList.indexOf(pokemon);
    let nextPokemon = pokemonList[index + 1]
    let previousPokemon = pokemonList[index - 1]
    loadDetails(pokemon).then(function(){
           
      showModal (pokemon.name, pokemon.height, pokemon.types, pokemon.image, nextPokemon, previousPokemon);
    })
  }
    

     

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
    
    loadingMessage.innerText='Loading list...';
       
    loadingContainer.appendChild(pokeball);
    pokeball.appendChild(pokeballRed);
    pokeball.appendChild(pokeballwhite);

    return loadingContainer.appendChild(loadingMessage);
  }

  function hideLoadingMessage(){
    let elementToRemove = document.querySelector('.loading-message');
    let remove = document.querySelector('h1')

        
    let removeIt = document.querySelector('.pokeball');
    elementToRemove.removeChild(removeIt)
    return elementToRemove.removeChild(remove)
  }



  let pokeball = document.createElement('div');
  pokeball.classList.add('pokeball');
     
  let pokeballRed = document.createElement('div');
  pokeballRed.classList.add('pokeball-red');  
        
  let pokeballwhite = document.createElement('div');
  pokeballwhite.classList.add('pokeball-white');

  function showLoadingPokeball() {
    imageContainer.innerText = '';
      
    imageContainer.appendChild(pokeball);
    pokeball.appendChild(pokeballRed);
    pokeball.appendChild(pokeballwhite);
  }

  function hideLoadingPokeball (){
    let removePokeball = document.querySelector('.image-container');
    let remove = document.querySelector('.pokeball');
    return removePokeball.removeChild(remove)
  }




  // --------------------- Modal Code
  let modalContainer = document.querySelector('#modal-container');
  let imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container')
   

  function showModal (title, text, type, imgUrl, nextPokemon, previousPokemon) {

    text = 'height: ' + text;
    type = 'type: ' + type;
        
    //next, we add the content of the modal with js...

    modalContainer.innerText = ''; // clear all existing code (important cause it clean the previous pokemon info).

    //crate the div .modal.
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modalContainer.appendChild(modal);
        
    // add modal content: 
    
  
    //Close button             
    let modalClose = document.createElement('button');
    modalClose.classList.add('modal-close');
    modalClose.innerText = 'Close';
    modal.appendChild(modalClose);

    modalClose.addEventListener('click', function () { //calls the hideModal() so removes the .is-visible. it Has to be call from inside this function because here is the created element.
      hideModal (); 
    });
    //Modal title
    let tittleElement = document.createElement('h1');
    tittleElement.innerText = title;
    modal.appendChild(tittleElement);

    //modal Paragraph
    let contentElement = document.createElement('p');
    contentElement.innerText = text;
    modal.appendChild(contentElement);

    //modal Paragraph 2; 
    let typeElement = document.createElement('p');
    typeElement.innerText = type;
    modal.appendChild(typeElement);

    // add image

    modal.appendChild(imageContainer);

       
    showLoadingPokeball()
        

    let imageElement = new Image();
   
    imageElement.src = imgUrl;
    imageElement.classList.add('image-pokemon')
    imageContainer.appendChild(imageElement)
    imageElement.addEventListener('load', function (){
      hideLoadingPokeball();
    })
       


    // ---------- ----- --------next button
              

    let nextPreviousContainer = document.createElement('div');
    nextPreviousContainer.classList.add('next-previous-container')
    modal.appendChild(nextPreviousContainer);

    if (previousPokemon !== undefined){
      let previousButton = document.createElement('button');
      previousButton.classList.add('previous-button');
      previousButton.innerText = 'previous';
                
      nextPreviousContainer.appendChild(previousButton);
    
      previousButton.addEventListener('click', function () { 
        hideModal (); 
                
        showDetails(previousPokemon);
      });
    }

    // the objective of the extraDiv is to have at least two elements in the nextPreviousContainer so the css property display: space-between works. ths way when the nextButton in the first pokemon will be  at the right and not at the center
    let extraDiv = document.createElement('div');
    nextPreviousContainer.appendChild(extraDiv);

    if (nextPokemon !== undefined){
      let nextButton = document.createElement('button');
      nextButton.classList.add('next-button');
      nextButton.innerText = 'next';
      nextPreviousContainer.appendChild(nextButton);

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

  function hideModal () {
    modalContainer.classList.remove('is-visible')
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
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showLoadingPokeball: showLoadingPokeball,
    hideLoadingPokeball: hideLoadingPokeball
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){  
    pokemonRepository.addListItem(pokemon)
  });    
})
