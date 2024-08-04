const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const weightElement = document.getElementById("weight");
const heightElement = document.getElementById("height");
const spriteContainer = document.getElementById("sprite-container");
const pokemonCard = document.getElementById("pokemon-card");
const statsContainer = document.getElementById("stats-container");
const typesDiv = document.getElementById("types");

const baseUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const typesColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    posion: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#F0B6BC",
};

const isSearchedById = (text) => /^\d+$/g.test(text);

const getNameForUrl = (text) => text.replace(/[ .-]/g, "-").toLowerCase();

const setNameAndID = (name, id) => {
    pokemonName.textContent = name.toUpperCase();
    pokemonID.textContent = `#${id}`;
};

const setWeightAndHeight = (weight, height) => {
    weightElement.textContent = `Weight: ${weight}`;
    heightElement.textContent = `Height: ${height}`;
};

const setSprite = (spriteUrl) => {
    spriteContainer.innerHTML += `<img id="sprite" src="${spriteUrl}">`;
};

const setTypes = (typesArr) => {
    typesArr.forEach((type, index) => {
        const typeChild = document.createElement("span");
        const typeName = type.type.name;
        typeChild.id = `type-${index + 1}`;
        typeChild.textContent = typeName;
        typeChild.style.backgroundColor = typesColors[typeName];
        typesDiv.appendChild(typeChild);
    });
};

const setStats = (statsArr) => {
    statsArr.forEach((stat) => {
        document.getElementById(stat.stat.name).textContent = stat.base_stat;
    });
};

const resetSprite = () => {
    spriteContainer.innerHTML = "";
};

const clearTypes = () => {
    typesDiv.innerHTML = "";
};

const displayDivs = () => {
    pokemonCard.style.display = "block";
    statsContainer.style.display = "block";
};

const setElementsFromPokemonJSON = (jsonData) => {
    const { height, id, name, sprites, stats, types, weight } = jsonData;

    setNameAndID(name, id);
    setWeightAndHeight(weight, height);
    setSprite(sprites["front_default"]);
    setTypes(types);
    setStats(stats);
};

const findPokemon = async () => {
    const searchValue = searchInput.value;
    if (searchValue === "") {
        alert("Enter valid pokemon name or ID!");
        return;
    }
    const pokemonUrl = `${baseUrl}/${
        isSearchedById(searchValue) ? searchValue : getNameForUrl(searchValue)
    }`;
    try {
        const req = await fetch(pokemonUrl);
        const data = await req.json();
        console.log(data);

        displayDivs();
        resetSprite();
        clearTypes();
        setElementsFromPokemonJSON(data);
    } catch (err) {
        console.error("Something went wrong:\n" + err);
        alert("Pokémon not found");
    }
};

searchButton.addEventListener("click", findPokemon);
