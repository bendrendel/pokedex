const container = document.getElementById('container');

populatePokedex();

async function populatePokedex() {
    for (let i = 1; i <= 151; i++) {
        const data = await getPokemon(i);
        
        const name = data.name;
        const number = data.id;
        const type = data.types[0].type.name;
        const artwork = data.sprites.other['official-artwork'].front_default;

        makeCard(name, number, type, artwork);
    }
}

async function getPokemon(number) {
    try {
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${number}`;
        const response = await fetch(endpoint);
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    } catch (err) {
        console.log(err);
    }
}

function makeCard(name, number, type, artwork) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add(type);
    card.innerHTML =
    `
        <div class="halo"></div>
        <img class="artwork" src="${artwork}" alt="${name} artwork">
        <p class="number">${number}</p>
        <h2 class="name">${name}</h2>
        <p class="type">Type: ${type}</p>
    `
    container.append(card);    
}