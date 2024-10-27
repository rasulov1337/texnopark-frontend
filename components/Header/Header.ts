"use strict";

import AuthPopup from "../AuthPopup/AuthPopup";

interface HeaderCallbacks {
    mainPage: () => void;
    recomendPage: () => void;
    bestPage: () => void;
}

class Header {
    #config;
    #activeHeaderHref: 'main' | 'recomend' | 'best';

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
            },
        };

        this.#activeHeaderHref = 'main';
    }

    #changeActiveHeaderHref(newActive: string){
        document.getElementById(this.#activeHeaderHref)?.classList.remove('active-header-href');
        document.getElementById(newActive)?.classList.add('active-header-href');
        this.#activeHeaderHref = newActive;
    }

    #addHrefsListeners() {
        Object.entries(this.#config).forEach(([name, { callback }]) => {
            const href = document.getElementById(name);
            href?.addEventListener("click", (e) => {
                e.preventDefault();
                callback();
                this.#changeActiveHeaderHref(name);
            });
        });
    }

    #addButtonEventListener() {
        const root = document.getElementById("root");

        const button = document.getElementById("login-button");
        button?.addEventListener("click", (e) => {
            e.preventDefault();
            const authPopup = new AuthPopup();
            if (root) authPopup.render(root);
        });
    }

    #addEventListeners() {
        this.#addHrefsListeners();
        this.#addButtonEventListener();
    }

    render(parent: HTMLElement) {
        const template = Handlebars.templates["Header.hbs"];
        const header = document.createElement("header");
        header.insertAdjacentHTML("afterbegin", template({}));
        parent.appendChild(header);

        this.#addEventListeners();
        document.getElementById('main')?.classList.add('active-header-href');
    }
}

export default Header;
