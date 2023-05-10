// new pokemonRepository variable to hold the IIFE with the pokemonList
let pokemonRepository = (function () {

  //pokemon list must be a empty array
  let pokemonList = [];
  // link to the  data from an external source.
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150';
  let modalContainer = document.querySelector('#modal-container');
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


  // modal that will contain the detail of each pokemon when it is selected 
  function showModal(title, text, img) {
    modalContainer.innerHTML= '';
    
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', img);
    imageElement.setAttribute('width', '304');
    imageElement.setAttribute('height', '228');
    imageElement.setAttribute('alt', 'pokemon image');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

  }

  //remove the Modal 
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  //to close the modal when the letter esc is clicked
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });
  
  // function to close only if the user clicks directly on the overlay
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if(target === modalContainer) {
      hideModal();
    }
  });

  // function for the addEventListener to log the name of each pokemon in the console when clicked 
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item.name, 'height:'+ item.height, item.imageUrl );
      console.log(item.types);
    });
  }

  return {
    add,
    getAll,
    addListItem,
    showDetails,
    loadList,
    loadDetails,

  };

})();


//forEach loop that iterates over each element in the pokemonList inside the repository and use the function addListItem

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});





