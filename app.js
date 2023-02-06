//pegar dados api, mostrar dados via js,layout 4 cards (150)
document.addEventListener("DOMContentLoaded", function(){
    const doc = document.querySelector('main');
    
    const mainDiv = document.createElement('div');
    doc.appendChild(mainDiv);
    mainDiv.classList.add('divCards'); 

    const addPokemons = (pokemons) =>{
        pokemons.forEach(pokemon => {

            const cardPokemon = document.createElement('div');
            mainDiv.appendChild(cardPokemon);
            cardPokemon.classList.add("cardPokemon");
        
            const cardHeader = document.createElement('div');
            cardPokemon.appendChild(cardHeader);
            cardHeader.classList.add('cardHeader');
        
            const blueBall = document.createElement('div');           
            blueBall.classList.add('blueBall');
            cardHeader.appendChild(blueBall);        
            
            const name = document.createElement('h2');
            cardHeader.appendChild(name);
            name.classList.add('nomePokemon');
            name.textContent= pokemon.name;
        
            const internalDivisionCard = document.createElement('article');
            cardPokemon.appendChild(internalDivisionCard);
            internalDivisionCard.classList.add('articleCard');
            
            const img = document.createElement('img');
            internalDivisionCard.appendChild(img);
            img.classList.add('imgPokemon');
            img.src = pokemon.img;
        
            const divStats = document.createElement('section');
            internalDivisionCard.appendChild(divStats);
            divStats.classList.add('sectionStats');

            const buttonStatus = document.createElement('button');
            divStats.appendChild(buttonStatus);
            buttonStatus.classList.add('buttonStatus');
            buttonStatus.textContent = 'status'

            const pokemonTypes = document.createElement('div');
            divStats.appendChild(pokemonTypes);                            
            
            for (let index = 0; index < pokemon.type.length; index++) {
                const type = document.createElement('h3');
                pokemonTypes.appendChild(type);
                type.textContent= `${pokemon.type[index]}`;
                type.classList.add('type',`type-${pokemon.type[index]}`);                                          
            };                        
        });
    };

    fetch('https://raw.githubusercontent.com/alluzera/allupokedex/pokedex-API/pokestats.json?pageSize=20')
    .then(response=>response.json())
    .then(jsonData => addPokemons(jsonData.data))
    .catch(e=>alert(e));
     
})

