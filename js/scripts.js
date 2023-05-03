// new pokemonRepository variable to hold the IIFE with the pokemonList
let pokemonRepository = (function(){

//Adding a Pokemon List 
  let pokemonList = [
    { name: "Dragonite", height: 7, type: ['dragon', 'flying'] },
    { name: "Amaura", height: 4, type: ['rock', 'ice'] },
    { name: "Oricorio", height: 2, type: ['fire', 'flying'] }
  ];
// functions inside the pokemon repository:
//getAll: return all items (pokemonRepository.getAll(); should return the pokemonList array)
  function getAll(){
    return pokemonList; 
  }
  //add: add a single item to the pokemonList array 
  function add(item) {
    pokemonList.push(item)
  } 

  return{
    add,
    getAll
  };

})();

//calling pokemonRepository.add(item); should add the Pokémon referred to with item to the pokemonList array)
pokemonRepository.add({name:'Pikachu', height:1.04, type:['electric']});
console.log(pokemonRepository.getAll());

// conditional function of height of each pokemon
function pokemonHeightCondition(item) {
  if (item.height < 10 && item.height > 5) {
    document.write(`<p> ${item.name} (height: ${item.height}) - Wow that's big! </p>`);
  }
  else {
    document.write(`<p>${item.name} (height: ${item.height}) </p>`);
  }
}

//  forEach loop that iterates over each element in the pokemonList inside the repository and use the function pokemonHeightCondition:


(pokemonRepository.getAll()).forEach (pokemonHeightCondition); 

function pokemonRepositoryBlock (item){
  let newElement = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = 'pokemon Name';
  button.classList.add('button-class');
  listItem.appendChild(button);
  newElement.appendChild(listItem);

}


