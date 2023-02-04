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
        
            //button sound
            const buttonSound = document.createElement('button');
            buttonSound.type = 'button';
            buttonSound.classList.add('buttonSound');
            cardHeader.appendChild(buttonSound);        
            
            const imgSound = document.createElement('img')
            buttonSound.appendChild(imgSound);
            imgSound.src = 'img/sound.png';
            imgSound.classList.add('imgSound');
            //end button sound

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

        });
    } 

    fetch('https://raw.githubusercontent.com/alluzera/allupokedex/pokedex-API/pokestats.json?pageSize=20')
    .then(response=>response.json())
    .then(jsonData => addPokemons(jsonData.data));
   
    
    
   
})

