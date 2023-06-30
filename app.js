document.addEventListener("DOMContentLoaded", function () {
    const doc = document.querySelector('main');

    const mainDiv = document.createElement('div');
    doc.appendChild(mainDiv);
    mainDiv.classList.add('divCards'); 

    const pages = pokemons =>{
                
        let limitPerPage = 8;

        let state = {
            page: 1,
            limitPerPage,
            totalPage: Math.ceil((pokemons.length) / limitPerPage),
            maxVisibleButtons: 5
        }

        const html = {
            get(element){
                return document.querySelector(element)
            }
        }
        const controlPagination = {
            next() {
                state.page++
                if (state.page > state.totalPage) {state.page--}
            },
            prev() {
                state.page--
                if (state.page < 1) {state.page++}                
            },
            goTo(page) {                
                if(page<1){
                    page = 1
                };
                state.page = +page;
                if(page> state.totalPage){
                    state.page = state.totalPage
                };
            },
            createListeners() {
                html.get('.first').addEventListener('click', () => {controlPagination.goTo(1);update()})
                html.get('.last').addEventListener('click', () => {controlPagination.goTo(state.totalPage);update()})
                html.get('.next').addEventListener('click', () => {controlPagination.next();update()})
                html.get('.prev').addEventListener('click', () =>{ controlPagination.prev();update()})
            }
        }
        
       const buttonsPagination ={
        element: html.get('#pagination .numbers'),
        create(number){
            const button = document.createElement('div');
            button.innerHTML= number;

            if(state.page == number){
                button.classList.add('active')
            }
            button.addEventListener('click', e => {
                const page = e.target.innerText;
                controlPagination.goTo(page);
                update()
            })
            buttonsPagination.element.appendChild(button);
        },
        update(){
            buttonsPagination.element.innerHTML = "";
            const {maxLeft,maxRight} = buttonsPagination.calculateMaxVisible()

            for(let page = maxLeft; page <= maxRight;page++){
                buttonsPagination.create(page)
            }
        },
        calculateMaxVisible(){
            const {maxVisibleButtons} = state;

            let maxLeft = (state.page - Math.floor(maxVisibleButtons/2))
            let maxRight = (state.page + Math.floor(maxVisibleButtons/2))

            if(maxLeft <1){
                maxLeft = 1
                maxRight = maxVisibleButtons
            }
            if(maxRight > state.totalPage){
                maxLeft = state.totalPage - (maxVisibleButtons -1);
                maxRight = state.totalPage
                if(maxLeft<1){maxLeft = 1}
            }
            return {maxLeft,maxRight}
        }
       }

       const list = {
        create(pokemons ){
            addPokemons(pokemons);            
        },
        update(){
            mainDiv.innerText = "";
            let page = state.page -1
            let start = page* state.limitPerPage;
            let end = start + state.limitPerPage

            const listPerPage = pokemons.slice(start, end);            
            addPokemons(listPerPage);
        }
       }

       function update(){         
        list.update();
        buttonsPagination.update();
        
       }
       function init(){
        update();
        controlPagination.createListeners();
       }
       init()
          
    } 

    const addPokemons = (pokemons) => {        
        pokemons.forEach(pokemon => {

            const cardPokemon = document.createElement('div');
            mainDiv.appendChild(cardPokemon);
            cardPokemon.classList.add("cardPokemon");
            cardPokemon.addEventListener('click', showStatus);

            const cardHeader = document.createElement('div');
            cardPokemon.appendChild(cardHeader);
            cardHeader.classList.add('cardHeader');

            const blueBall = document.createElement('div');
            blueBall.classList.add('blueBall');
            cardHeader.appendChild(blueBall);

            const name = document.createElement('h2');
            cardHeader.appendChild(name);
            name.classList.add('nomePokemon');
            name.textContent = pokemon.name;

            const internalDivisionCard = document.createElement('article');
            cardPokemon.appendChild(internalDivisionCard);
            internalDivisionCard.classList.add('articleCard');

            const img = document.createElement('img');
            internalDivisionCard.appendChild(img);
            img.classList.add('imgPokemon');
            img.src = pokemon.img;

            const listStats = document.createElement('div');
            internalDivisionCard.appendChild(listStats);
            listStats.classList.add('divStats', 'invisible');
            const arrayStats = Object.keys(pokemon.stats);

            arrayStats.forEach((element) => {
                if (element != 'total') {
                    const stats = document.createElement('p');
                    listStats.appendChild(stats);
                    stats.classList.add('nameListStats');
                    stats.textContent = element.toUpperCase();
                    const textStats = (pokemon.stats[element] / 2);
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

            const pokemonTypes = document.createElement('div');
            divStats.appendChild(pokemonTypes);
            pokemonTypes.classList.add('divTypes');

            for (let index = 0; index < pokemon.type.length; index++) {
                const type = document.createElement('h3');
                pokemonTypes.appendChild(type);
                type.textContent = `${pokemon.type[index]}`;
                type.classList.add('type', `type-${pokemon.type[index]}`);
            };

            const imgButtons = document.createElement('img');
            cardPokemon.appendChild(imgButtons);
            imgButtons.classList.add('imgButtons');
            imgButtons.src = 'img/button.png';
        });
    };

    function showStatus(evt) {
        evt.preventDefault();
        const forClick = this;
        forClick.childNodes[1].childNodes[0].classList.toggle('invisible');
        forClick.childNodes[1].childNodes[1].classList.toggle('invisible');
    };

    const filter = document.querySelector("#filter");
    const typeSelect = document.querySelector("#select_type");

    filter.addEventListener("input", function () {
        removePokemons();
        if (filter.value.length == 0) {
            findByType(typeSelect.value);
        } else {
            findByName(filter.value, typeSelect.value);
        }
    });

    typeSelect.addEventListener("input", function () {
        removePokemons();
        if (typeSelect.value == '') {
            findAll()
        } else {
            findByName(filter.value, typeSelect.value);
        }
    });

    function removePokemons() {
        mainDiv.innerText = "";
    }
    async function findByType(type) {
        const findPokemonByType = await fetch(`http://localhost:3000/type/${type}`)
            .then(response => response.json())
            .then(r => { pages(r) })
            .catch(e => { console.log(e); window.location.reload() });
    }
    async function findByName(name, type) {
        if (type == "") {
            const findPokemonByName = await fetch(`http://localhost:3000/name/${name}`)
                .then(response => response.json())
                .then(r => pages(r))
                .catch(e => console.log(e));
        } else {
            const findPokemonByType = await fetch(`http://localhost:3000/type/${type}`)
                .then(response => response.json())
                .then(r => {
                    let list = [];
                    r.forEach(element => {
                        if ((element.name).toUpperCase().includes(name.toUpperCase())) {
                            list.push(element)
                        }
                    });
                    pages(list);
                }).catch(e => { console.log(e); window.location.reload() });
        }
    }
    async function findAll() {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then(r => pages(r))
            .catch(e => alert(e));
    }
    findAll();
});
