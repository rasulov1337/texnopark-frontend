'use strict';

interface HeaderCallbacks {
    mainPage: () => void,
    recomendPage: () => void,
    bestPage: () => void,
}

class Header {
    #config

    constructor(headerCallbacks: HeaderCallbacks) {
        this.#config = {
            main: {
                callback: headerCallbacks.mainPage,
            },

            recomend: { 
                callback: headerCallbacks.recomendPage,
            },

            best: {
                callback: headerCallbacks.bestPage,
            }
        }
    }

    #addEventListeners(){
        Object.entries(this.#config).forEach(([name, {callback}])=>{
            const href = document.getElementById(name);
            href?.addEventListener('click', (e)=>{
                e.preventDefault();
                callback();
            })
        })
    }

    render(parent: HTMLElement){
        const template = Handlebars.templates['Header.hbs'];
        const header = document.createElement('header');
        header.insertAdjacentHTML('afterbegin', template({}));
        parent.appendChild(header);

        this.#addEventListeners();
    }
}

export default Header;