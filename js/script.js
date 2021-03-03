
let pokemonRepository = (function() {
    let pokemonList = [];                //defining the variable pokemon list as an blank Array
    let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=150'; //the API
        
        // this wraps the pokemonList array in an Immediately Invoked Function Expression (IIFE) to avoid accidentally accessing the global state.
    function add(pokemon) {
        properties = Object.keys(pokemon)

             //the first conditional control if the pokemon that is trying to be added is an object. the second controls if the properties match the desired properties. 
            if (typeof pokemon === 'object'){ 
                if( properties[0] === "name" && 
                properties[1] === "detailsUrl" 
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
        listItem.classList.add('group-list-item');
    
        let newButton = document.createElement('button');
        newButton.innerText = `${pokemon.name}`;  
        listItem.appendChild(newButton);
        newButton.classList.add('btn');
        newButton.classList.add('btn-primary');
        newButton.classList.add('btn-lg');
        newButton.classList.add('btn-block');
        newButton.dataset.target = "#exampleModal";
        newButton.dataset.toggle = "modal"


        newButton.addEventListener('click', function () {
            showDetails(pokemon);               
        }); // creates a event listener, when the button is clicked console logs the type... similar to the last one but here the function is define outside the addListItem fuction. and called as 2d parameter
        
        //showDetailsFromOutside(newButton, pokemon); // here the event listener is declare as a function outside, when the button is clicked console logs the height... this code is to practice the createEventListener() inside the function and outside the function and  
    }

    function showDetails(pokemon){
          loadDetails(pokemon).then(function(){
             showModal (pokemon.name, pokemon.height, pokemon.types, pokemon.image);
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
        loadingMessage.innerText='Loading list...'
        return loadingContainer.appendChild(loadingMessage);
    };

    function hideLoadingMessage(){
        let elementToRemove = document.querySelector('.loading-message');
        let remove = document.querySelector('h1')
        return elementToRemove.removeChild(remove)
    };

        // --------------------- Modal Code
  

    function showModal (title, text, type, imgUrl, nextPokemon, previousPokemon) {

        let modalBody = document.querySelector('.modal-body')
        let tittleElement = document.querySelector('.modal-title')
       
      

        text = 'height: ' + text;
        type = 'type: ' + type;
   
        modalBody.innerText= "";
        tittleElement.innerText= "";

         
        tittleElement.innerText = title;
           

                //modal Paragraf
        let contentElement = document.createElement('p');
        contentElement.innerText = text;
        modalBody.appendChild(contentElement);

               //modal Paragraf 2; 
        let typeElement = document.createElement('p');
        typeElement.innerText = type;
        modalBody.appendChild(typeElement);

               // add imgage

        let imageElement = new Image();
        imageElement.src = imgUrl;
        imageElement.classList.add('image-pokemon')
        modalBody.appendChild(imageElement);


    };

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
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
