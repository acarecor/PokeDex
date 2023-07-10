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
    return fetch(apiUrl).then((response) =>  response.json())
    .then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  //loadDetails function will load detailed data for a given pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //addListItem: append the list (listItem) of  buttons (each of then content a single Pokemon)  to the parent Pokemon-list (ul)
  function addListItem(pokemon) {
    let newElement = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    //add class from bootstrap :list-group-item
    listItem.classList.add('list-group-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    //add class from bootstrap :btn
   // button.classList.add('pokemon-name-button');
    button.classList.add('btn'); 

    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');

    listItem.appendChild(button);
    newElement.appendChild(listItem);
    button.addEventListener('click', () => showDetails(pokemon));
  }


  // modal that will contain the detail of each pokemon when it is selected 
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    

    modalTitle.empty();
    modalBody.empty();


    let nameElement = $('<h1>' + item.name + '</h1>');
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", item.imageUrl);
    let heightElement = $("<p>" + "height: " + item.height + "<p>");
    let typesElement = $("<p>" + "types : " + item.types + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }


// function for the addEventListener to log the name of each pokemon in the console when clicked 
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  let searchInput = document.getElementById("search-input");

  function searchPokemon() {
    
   let searchText = searchInput.value.toLowerCase();



   // let searchedPokemons = pokemonList.filter((pokemon) => {
     // let lowerCase = pokemon.name.toLowerCase();
     // return lowerCase.includes(searchText);
    //});

    //cleanUIState();

    //searchedPokemons.forEach((pokemon)=> {
    //  addListItem(pokemon);
    //});

    //isSearching = true;
    let allPokemon = document.querySelectorAll(".list-group-item");

    allPokemon.forEach(function (pokemon) {
      let pokemonText = pokemon.querySelector(".btn").innerText.toLowerCase();
      let searchList = document.querySelector(".list-group");

      if (pokemonText.includes(searchText)) {
        searchList.classList.add("search-list");
        pokemon.style.display = "inline-block";
      } else {
        pokemon.style.display = "none";
      }

      if (!searchInput.value) {
        searchList.classList.remove("search-list");
      }
    });
  }
  
  
  searchInput.addEventListener("input", function () {
    searchPokemon();
  });

  return {
    add,
    getAll,
    addListItem,
    showDetails,
    loadList,
    loadDetails,
    showModal,
    searchPokemon,
  

  };

})();


//forEach loop that iterates over each element in the pokemonList inside the repository and use the function addListItem

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});





