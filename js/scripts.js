//Adding a Pokemon List 
let pokemonList = [
  { name: "Dragonite", height: 7, type: ['dragon', 'flying'] },
  { name: "Amaura", height: 4, type: ['rock', 'ice'] },
  { name: "Oricorio", height: 2, type: ['fire', 'flying'] }
];

//  for loop that iterates over each element in the pokemon list:
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height < 10 && pokemonList[i].height > 5) {
    document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow that's big! </p>`);
  }
  else {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}) </p>`);
  }
}