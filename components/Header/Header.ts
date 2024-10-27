"use strict";

import AuthPopup from "../AuthPopup/AuthPopup";
import { isAuthorized } from "../../modules/IsAuthorized";
import APIClient from "../../modules/ApiClient";

interface HeaderCallbacks {
    mainPage: () => void;
    recomendPage: () => void;
    bestPage: () => void;
}

class Header {
    #config;
    #activeHeaderHref: 'main' | 'recomend' | 'best';
    #isAuth: boolean;

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

    async #getSession(){
        this.#isAuth = await isAuthorized();
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

        const logoutButton = document.getElementById("logout-button");
        logoutButton?.addEventListener("click", async (e) => {
            e.preventDefault();
            const response = await APIClient.logout();
            if (response.ok) {
                window.location.reload();
            }
        });
    }

    #addEventListeners() {
        this.#addHrefsListeners();
        this.#addButtonEventListener();
    }

    async render(parent: HTMLElement) {
        const template = Handlebars.templates["Header.hbs"];
        const header = document.createElement("header");
        await this.#getSession();
        console.log(this.#isAuth)
        header.insertAdjacentHTML("afterbegin", template({isAuth: this.#isAuth}));
        parent.appendChild(header);

        this.#addEventListeners();
        document.getElementById('main')?.classList.add('active-header-href');
    }
}

export default Header;
