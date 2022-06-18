firstPokemonCard();
pokemonListCreator();

async function pokemonListCreator() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=6`;
  const response = await fetch(url);
  const json = await response.json();
  await createPokemonList(json.results);
  addPokemonClickEvent();
}

function addPokemonClickEvent() {
  const pokemons = document.querySelectorAll("#list .pokemon");
  mouseSounds(pokemons);
  pokemons.forEach((pokemon) => {
    pokemon.addEventListener('click', async () => {
      await changePokemon(pokemon.id, pokemon);
    });
    pokemon.addEventListener('mouseenter', () => {
      let dataType = pokemon.getAttribute('data-type')
      if (!dataType.includes('undefined')) {
        let types = dataType.split(',')
        let colorBg = `linear-gradient(90deg, var(--${types[0]}), var(--${types[1]}))`;
        pokemon.style.background = colorBg
      } else {
        let types = dataType.split(',')
        let colorBg = `var(--${types[0]})`;
        pokemon.style.background = colorBg
      }
    })
    pokemon.addEventListener('mouseleave', () => {
      if (!pokemon.classList.contains('selected')) {
        pokemon.style.background = 'white'
      }
    })
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
  pokemonList[0].style.background = 'linear-gradient(90deg, var(--grass), var(--poison))'
}

async function createPokemonListElement(data, pokemonName) {
  let selectorList = document.getElementById("list");
  let pokeImg = data.sprites.other.home.front_default;
  let types = []
  for (let i = 0; i < data.types.length; i++) {
    let typesValue = data.types[i].type.name;
    types.push(typesValue);
  }
  selectorList.innerHTML +=
    `<li class="pokemon" id="${pokemonName}" data-type="${types[0]},${types[1]}">
                <img src="${pokeImg}" alt="Imagem do ${pokemonName}">
                <span>${pokemonName[0].toUpperCase()}${pokemonName.substring(1).replace("-", " ")}</span>
    </li>`;
}

async function firstPokemonCard() {
  const url = `https://pokeapi.co/api/v2/pokemon/bulbasaur`
  const response = await fetch(url)
  const data = await response.json()

  changeImg();
  changeBg();
  changeName();
  changeID();
  changeType();
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
  changeSelectedBg(pokemon);
  changeName();
  changeID();
  changeType();
  changeStatus();
  changeSkills();
  cardAni();

  function cardAni() {
    const card = document.getElementById('card-pokemon')
    card.classList.add('ani')
    setTimeout(() => {
      card.classList.remove('ani')
    }, 100);
  }

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
    imgPlace.classList.add('imgTransition')
    let imgPokemon = data.sprites.other.home.front_default;
    imgPlace.src = imgPokemon;
    setTimeout(() => {
      imgPlace.classList.remove('imgTransition')
    }, 200);
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

  function changeSelectedBg(pokemon) {
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
  const audioMouseOver = document.getElementById("soundMouseOver");
  const audioClick = document.getElementById("soundClick");

  pokemons.forEach((pokemon) => {
    pokemon.addEventListener("mouseenter", () => {
      audioMouseOver.currentTime = 0;
      audioMouseOver.volume = 0.05;
      audioMouseOver.play();
    });
    pokemon.addEventListener("click", () => {
      audioClick.currentTime = 0;
      audioClick.volume = 0.05;
      audioClick.play();
    });
  });
}

