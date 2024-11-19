const pokemonNameInput = document.getElementById('pokemonName');
const fetchButton = document.getElementById('fetch-button');
const pokemonCard = document.getElementById('pokemon-card');

fetchButton.addEventListener('click', async () => {
    const pokemonName = pokemonNameInput.value.toLowerCase();

    if (!pokemonName) {
        alert('Please enter a Pokémon name!');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const pokemonData = await response.json();

        pokemonCard.innerHTML = `
        <div class="card mb-3">
          <img src="${pokemonData.sprites.front_default}" class="card-img-top " alt="${pokemonData.name}" onError="this.onerror=null;this.src='./error.png'">
          <div class="card-body" style="color:black">
            <h5 class="card-title">${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)} (#${pokemonData.id})</h5>
            <p>Type: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
            <p>Height: ${pokemonData.height}</p>
            <p>Weight: ${pokemonData.weight}</p>
          </div>
        </div>
        `;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        pokemonCard.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});