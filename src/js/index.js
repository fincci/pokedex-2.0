var audioMouseOver = document.getElementsByClassName('soundMouseOver')[0];
var audioClick = document.getElementsByClassName('soundClick')[0];

const pokemonList = document.querySelectorAll('.pokemon')
const pokemonsCards = document.querySelectorAll('.card-pokemon')


mouseSounds();
selectPokemon();

function selectPokemon() {
    pokemonList.forEach(pokemon => {
        pokemon.addEventListener('click', () => {
            let pokeName = pokemon.id
            let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    changeName();
                    changeID();
                    changeType();
                    changeImg();
                    changeBg();
                    changeStatus();
                    changeSkills();

                    function changeName() {
                        const name = document.getElementById('name')
                        name.innerText = `${data.name[0].toUpperCase()}${data.name.substring(1)}`
                    }

                    function changeID() {
                        const pokePlaceID = document.getElementById('pokeID')
                        let idText = addZeros(data.id, 3)
                        pokePlaceID.innerText = `#${idText}`

                        function addZeros(num, length) {
                            return String(num).padStart(length, '0')
                        }
                    }

                    function changeType() {
                        const typePlace = document.getElementById('type')
                        const rawTypes = data.types
                        let types = []
                        let spanLength = document.querySelectorAll('.type').length
                        if (spanLength !== types.length) {
                            typePlace.innerHTML = ''
                        }
                        for (let i = 0; i < rawTypes.length; i++) {
                            let typesValue = rawTypes[i].type.name;
                            types.push(typesValue)
                            typePlace.innerHTML += `<span class="type">${typesValue[0].toUpperCase()}${typesValue.substring(1)}</span>`
                        }
                    }

                    function changeImg() {
                        const imgPlace = document.getElementById('card-img')
                        let imgPokemon = data.sprites.other.home.front_default
                        imgPlace.src = imgPokemon
                    }

                    function changeBg() {
                        const cardBg = document.getElementById('card-pokemon')
                        const rawTypes = data.types
                        let types = []
                        for (let i = 0; i < rawTypes.length; i++) {
                            let typesValue = rawTypes[i].type.name;
                            types.push(typesValue)
                        }
                        if (types.length === 1) {
                            let colorBg = `var(--${types})`
                            cardBg.style.background = colorBg
                        } else {
                            let colorBg = `linear-gradient(90deg, var(--${types[0]}), var(--${types[1]}))`
                            cardBg.style.backgroundImage = colorBg
                        }
                    }

                    function changeStatus() {
                        const statsApi = data.stats
                        const statsPlace = document.querySelectorAll('.rawStats')
                        statsPlace.forEach(statsP => {
                            let statsID = statsP.id
                            let i = statsID.substring(5)
                            let statsName = statsApi[i].stat.name
                            let statsValue = statsApi[i].base_stat
                            statsP.innerHTML = `${statsName[0].toUpperCase()}${statsName.substring(1).replace('-', ' ')}: ${statsValue}`
                        })
                    }

                    function changeSkills() {
                        const skillsApi = data.abilities
                        const skillsUl = document.querySelector('.skills')
                        if (skillsApi.length !== skillsUl.length) {
                            skillsUl.innerHTML = ''
                        }
                        for (let i = 0; i < skillsApi.length; i++) {
                            let skill = skillsApi[i].ability.name;
                            skillsUl.innerHTML += `<li class="skill">${skill[0].toUpperCase()}${skill.substring(1).replace('-', ' ')}</li>`
                        }
                    }
                })
                .catch((err) => {
                    console.log(`Erro: ${err}`);
                });
        })
    })
}

function mouseSounds() {
    pokemonList.forEach(pokemon => {
        pokemon.addEventListener('mouseenter', () => {
            audioMouseOver.volume = 0.1;
            audioMouseOver.play();
        })

        pokemon.addEventListener('click', () => {
            audioClick.volume = 0.1;
            audioClick.play();
        })
    })
}