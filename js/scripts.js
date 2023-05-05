// new pokemonRepository variable to hold the IIFE with the pokemonList
let pokemonRepository = (function () {

  //pokemon list must be a empty array
  let pokemonList = [];
  // link to the  data from an external source.
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150';

  // functions inside the pokemon repository:
  
  //getAll: return all items (pokemonRepository.getAll(); should return the pokemonList array)
  function getAll() {
    return pokemonList;
  }
  //add: add a single item to the pokemonList array 
  //conditional, that make sure can only add the passed argument of the function to pokemonList if it’s an object and validate the keys
  function add(pokemon) {
    if (typeof pokemon === 'object' &&
      'name' in pokemon) {
      pokemonList.push(pokemon)
    } else {
      console.log('pokemon is not correct')
    }
  }

  //loadList function will fetch data from the API, 
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //loadDetails function will load detailed data for a given pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //addListItem: append the list (listItem) of  buttons (each of then content a single Pokemon)  to the parent Pokemon-list (ul)
  function addListItem(pokemon) {
    let newElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    newElement.appendChild(listItem);
    button.addEventListener('click', () => showDetails(pokemon));
  }
  // function for the addEventListener to log the name of each pokemon in the console when clicked 
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  return {
    add,
    getAll,
    addListItem,
    showDetails,
    loadList,
    loadDetails
  };

})();


//forEach loop that iterates over each element in the pokemonList inside the repository and use the function addListItem

pokemonRepository.loadList().then(function(){ 
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});





