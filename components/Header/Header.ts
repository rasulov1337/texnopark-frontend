'use strict';

import AuthPopup from "../AuthPopup/AuthPopup" 

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

    #addHrefsListeners(){
        Object.entries(this.#config).forEach(([name, {callback}])=>{
            const href = document.getElementById(name);
            href?.addEventListener('click', (e)=>{
                e.preventDefault();
                callback();
            })
        })
    }

    #addButtonEventListener(){
        const authPopup = new AuthPopup();
        const root = document.getElementById('root');

        const button = document.getElementById('login-button');
        button?.addEventListener('click', (e)=>{
            e.preventDefault();
            if (root) authPopup.render(root);
        })
    }

    #addEventListeners(){
        this.#addHrefsListeners();
        this.#addButtonEventListener();
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