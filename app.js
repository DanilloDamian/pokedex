//pegar dados api, mostrar dados via js,layout 4 cards (150)
document.addEventListener("DOMContentLoaded", function(){
    const doc = document.querySelector('main');
    
    const mainDiv = document.createElement('div');
    doc.appendChild(mainDiv);
    mainDiv.classList.add('divCards');
    
    const pokemons = []; 

    function createCard(pokemons){
        const cardPokemon = document.createElement('div');
        mainDiv.appendChild(cardPokemon);
        cardPokemon.classList.add("cardPokemon");

        const cardHeader = document.createElement('div');
        cardPokemon.appendChild(cardHeader);
        cardHeader.classList.add('cardHeader');

        const buttonSound = document.createElement('button');
        buttonSound.type = 'button';
        buttonSound.classList.add('buttonSound');
        cardHeader.appendChild(buttonSound);
        
        const imgSound = document.createElement('img')
        buttonSound.appendChild(imgSound);
        imgSound.src = 'img/sound.png';
        imgSound.classList.add('imgSound');

        const name = document.createElement('h2');
        cardHeader.appendChild(name);
        name.classList.add('nomePokemon');
        name.textContent= pokemons.name;

        const internalDivisionCard = document.createElement('article');
        cardPokemon.appendChild(internalDivisionCard);
        internalDivisionCard.classList.add('articleCard');
        
        const img = document.createElement('img');
        internalDivisionCard.appendChild(img);
        img.classList.add('imgPokemon');
        img.src = pokemons.img;

        const divStats = document.createElement('section');
        internalDivisionCard.appendChild(divStats);
        divStats.classList.add('sectionStats');
    }
    pokemons.forEach(element=> createCard(element));


})

