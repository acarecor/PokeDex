// new pokemonRepository variable to hold the IIFE with the pokemonList
let pokemonRepository = (function () {

  //Adding a Pokemon List 
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
  function add(item) {
    if (typeof pokemon === 'object' &&
      typeof pokemon.name === 'string') {
      pokemonList.push(item)
    } else {
      console.log('pokemon is not correct')
    }
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
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }


  return {
    add,
    getAll,
    addListItem,
    showDetails
  };

})();

//calling pokemonRepository.add(item); should add the Pokémon referred to with item to the pokemonList array)
pokemonRepository.add({ name: 'Pikachu', height: 1.04, type: ['electric'] });
console.log(pokemonRepository.getAll());


//  forEach loop that iterates over each element in the pokemonList inside the repository and use the function addListItem


(pokemonRepository.getAll()).forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});




