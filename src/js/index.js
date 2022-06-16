firstPokemonCard();
pokemonListCreator();

async function pokemonListCreator() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=4`;
  const response = await fetch(url);
  const json = await response.json();
  await createPokemonList(json.results);
  addPokemonClickEvent();
}

function addPokemonClickEvent() {
  const pokemons = document.querySelectorAll("#list .pokemon");
  mouseSounds(pokemons);
  pokemons.forEach((pokemon) => {
    pokemon.addEventListener("click", async () => {
      await changePokemon(pokemon.id, pokemon);
    });
  });
}

async function createPokemonList(pokemons) {
  for (let i = 0; i < pokemons.length; i++) {
    let pokemonName = pokemons[i].name;
    let pokeurl = pokemons[i].url;

    const response = await fetch(pokeurl);
    const json = await response.json();
    await createPokemonListElement(json, pokemonName);
  }
  const pokemonList = document.querySelectorAll('.pokemon')
  pokemonList[0].classList.add('selected')
  console.log(pokemons);
}

function firstPokemonSelected() {
  console.log();
}

async function createPokemonListElement(data, pokemonName) {
  let selectorList = document.getElementById("list");
  let pokeImg = data.sprites.other.home.front_default;
  selectorList.innerHTML +=
    `<li class="pokemon" id="${pokemonName}">
                <img src="${pokeImg}" alt="Imagem do ${pokemonName}">
                <span>${pokemonName[0].toUpperCase()}${pokemonName.substring(1).replace("-", " ")}</span>
    </li>`;
}

async function firstPokemonCard() {
  const url = `https://pokeapi.co/api/v2/pokemon/bulbasaur`
  const response = await fetch(url)
  const data = await response.json()

  changeName();
  changeID();
  changeType();
  changeImg();
  changeBg();
  changeStatus();
  changeSkills();

  function changeName() {
    const name = document.getElementById("name");
    name.innerText = `${data.name[0].toUpperCase()}${data.name.substring(
      1
    )}`;
  }

  function changeID() {
    const pokePlaceID = document.getElementById("pokeID");
    let idText = addZeros(data.id, 3);
    pokePlaceID.innerText = `#${idText}`;
    function addZeros(num, length) {
      return String(num).padStart(length, "0");
    }
  }

  function changeType() {
    const typePlace = document.getElementById("type");
    const rawTypes = data.types;
    let types = [];
    let spanLength = document.querySelectorAll(".type").length;
    if (spanLength !== types.length) {
      typePlace.innerHTML = "";
    }
    for (let i = 0; i < rawTypes.length; i++) {
      let typesValue = rawTypes[i].type.name;
      types.push(typesValue);
      typePlace.innerHTML += `<span class="type">${typesValue[0].toUpperCase()}${typesValue.substring(
        1
      )}</span>`;
    }
  }

  function changeImg() {
    const imgPlace = document.getElementById("card-img");
    let imgPokemon = data.sprites.other.home.front_default;
    imgPlace.src = imgPokemon;
  }

  function changeBg() {
    const cardBg = document.getElementById("card-pokemon");
    const rawTypesBg = data.types;
    let typesBg = [];
    for (let i = 0; i < rawTypesBg.length; i++) {
      let typesValueBg = rawTypesBg[i].type.name;
      typesBg.push(typesValueBg);
    }
    if (typesBg.length === 1) {
      let colorBg = `var(--${typesBg})`;
      cardBg.style.background = colorBg;
    } else {
      let colorBg = `linear-gradient(90deg, var(--${typesBg[0]}), var(--${typesBg[1]}))`;
      cardBg.style.backgroundImage = colorBg;
    }
  }

  function changeStatus() {
    const statsApi = data.stats;
    const statsUl = document.querySelector(".stats");
    if (statsApi !== statsUl) {
      statsUl.innerHTML = "";
    }
    for (let i = 0; i < statsApi.length; i++) {
      let statsName = statsApi[i].stat.name;
      let statsValue = statsApi[i].base_stat;
      statsUl.innerHTML += `<li><p>${statsName[0].toUpperCase()}${statsName
        .substring(1)
        .replace("-", " ")}:</p> <p>${statsValue}</p>`;
    }
  }

  function changeSkills() {
    const skillsApi = data.abilities;
    const skillsUl = document.querySelector(".skills");
    if (skillsApi.length !== skillsUl.length) {
      skillsUl.innerHTML = "";
    }
    for (let i = 0; i < skillsApi.length; i++) {
      let skill = skillsApi[i].ability.name;
      skillsUl.innerHTML += `<li class="skill">${skill[0].toUpperCase()}${skill
        .substring(1)
        .replace("-", " ")}</li>`;
    }
  }
}

async function changePokemon(idPokemon, pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
  const response = await fetch(url);
  const data = await response.json();

  changeImg();
  changeBg();
  changeName();
  changeID();
  changeType();
  changeStatus();
  changeSkills();
  pokemonSelected(pokemon);

  function changeName() {
    const name = document.getElementById("name");
    name.innerText = `${data.name[0].toUpperCase()}${data.name.substring(
      1
    )}`;
  }

  function changeID() {
    const pokePlaceID = document.getElementById("pokeID");
    let idText = addZeros(data.id, 3);
    pokePlaceID.innerText = `#${idText}`;
    function addZeros(num, length) {
      return String(num).padStart(length, "0");
    }
  }

  function changeType() {
    const typePlace = document.getElementById("type");
    const rawTypes = data.types;
    let types = [];
    let spanLength = document.querySelectorAll(".type").length;
    if (spanLength !== types.length) {
      typePlace.innerHTML = "";
    }
    for (let i = 0; i < rawTypes.length; i++) {
      let typesValue = rawTypes[i].type.name;
      types.push(typesValue);
      typePlace.innerHTML += `<span class="type">${typesValue[0].toUpperCase()}${typesValue.substring(
        1
      )}</span>`;
    }
  }

  function changeImg() {
    const imgPlace = document.getElementById("card-img");
    let imgPokemon = data.sprites.other.home.front_default;
    imgPlace.src = imgPokemon;
  }

  function changeBg() {
    const cardBg = document.getElementById("card-pokemon");
    const rawTypesBg = data.types;
    let typesBg = [];
    for (let i = 0; i < rawTypesBg.length; i++) {
      let typesValueBg = rawTypesBg[i].type.name;
      typesBg.push(typesValueBg);
    }
    if (typesBg.length === 1) {
      let colorBg = `var(--${typesBg})`;
      cardBg.style.background = colorBg;
    } else {
      let colorBg = `linear-gradient(90deg, var(--${typesBg[0]}), var(--${typesBg[1]}))`;
      cardBg.style.backgroundImage = colorBg;
    }
  }

  function pokemonSelected(pokemon) {
    let selectedBefore = document.querySelector('.selected')
    selectedBefore.classList.remove('selected')
    selectedBefore.style.background = 'white'
    pokemon.classList.add('selected')
    let selectedAfter = document.querySelector('.selected')
    const rawTypesBg = data.types;
      let typesBg = [];
      for (let i = 0; i < rawTypesBg.length; i++) {
        let typesValueBg = rawTypesBg[i].type.name;
        typesBg.push(typesValueBg);
      }
      if (typesBg.length === 1) {
        let colorBg = `var(--${typesBg})`;
        selectedAfter.style.background = colorBg;
      } else {
        let colorBg = `linear-gradient(90deg, var(--${typesBg[0]}), var(--${typesBg[1]}))`;
        selectedAfter.style.backgroundImage = colorBg;
      }
  }

  function changeStatus() {
    const statsApi = data.stats;
    const statsUl = document.querySelector(".stats");
    if (statsApi !== statsUl) {
      statsUl.innerHTML = "";
    }
    for (let i = 0; i < statsApi.length; i++) {
      let statsName = statsApi[i].stat.name;
      let statsValue = statsApi[i].base_stat;
      statsUl.innerHTML += `<li><p>${statsName[0].toUpperCase()}${statsName
        .substring(1)
        .replace("-", " ")}:</p> <p>${statsValue}</p>`;
    }
  }

  function changeSkills() {
    const skillsApi = data.abilities;
    const skillsUl = document.querySelector(".skills");
    if (skillsApi.length !== skillsUl.length) {
      skillsUl.innerHTML = "";
    }
    for (let i = 0; i < skillsApi.length; i++) {
      let skill = skillsApi[i].ability.name;
      skillsUl.innerHTML += `<li class="skill">${skill[0].toUpperCase()}${skill
        .substring(1)
        .replace("-", " ")}</li>`;
    }
  }
}

function mouseSounds(pokemons) {
  const audioMouseOver = document.getElementsByClassName("soundMouseOver")[0];
  const audioClick = document.getElementsByClassName("soundClick")[0];

  pokemons.forEach((pokemon) => {
    pokemon.addEventListener("mouseenter", () => {
      audioMouseOver.volume = 0.1;
      audioMouseOver.play();
    });

    pokemon.addEventListener("click", () => {
      audioClick.volume = 0.1;
      audioClick.play();
    });
  });
}

