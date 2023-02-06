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

            const listStats = document.createElement('div');
            internalDivisionCard.appendChild(listStats);
            listStats.classList.add('divStats','invisible');
            const arrayStats = Object.keys(pokemon.stats);            
            
            arrayStats.forEach((element)=>{                
                if(element != 'total'){                    
                    const stats = document.createElement('p');
                    listStats.appendChild(stats);
                    stats.classList.add('nameListStats'); 
                    stats.textContent = element.toUpperCase();                    
                    const textStats = (pokemon.stats[element]/2);
                    const numStats = document.createElement('div');
                    listStats.appendChild(numStats);
                    numStats.style = `width:${textStats}%`;
                    numStats.classList.add('backGroundStats');
                };            
            });
        
            const divStats = document.createElement('section');
            internalDivisionCard.appendChild(divStats);
            divStats.classList.add('sectionStats');

            const buttonStatus = document.createElement('button');
            divStats.appendChild(buttonStatus);
            buttonStatus.classList.add('buttonStatus');
            buttonStatus.textContent = 'stats';
            buttonStatus.addEventListener('click',showStatus);

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
    function showStatus(evt){
        var parent = this.parentNode;
        var grandParent = parent.parentNode;
        var bigParent = grandParent.parentNode;
        var img= bigParent.querySelector('img');
        var divStats= grandParent.querySelector('div');
        img.classList.toggle('invisible');        
        divStats.classList.toggle('invisible');
    }

    fetch('https://raw.githubusercontent.com/alluzera/allupokedex/pokedex-API/pokestats.json?pageSize=20')
    .then(response=>response.json())
    .then(jsonData => addPokemons(jsonData.data))
    .catch(e=>alert(e));
     
})

