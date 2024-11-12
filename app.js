const pokemonNameInput = document.getElementById('pokemonName');
const fetchButton = document.getElementById('fetch-button');
const pokemonCard = document.getElementById('pokemon-card');

fetchButton.addEventListener('click', async () => {
    const pokemonName = pokemonNameInput.value.trim().toLowerCase();

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
          <img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemonData.name}" onError="this.onerror=null;this.src='./error.png'">
          <div class="card-body">
            <h5 class="card-title">${pokemonData.name} ('#'${pokemonData.id})</h5>
          </div>
        </div>
      `;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        pokemonCard.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});