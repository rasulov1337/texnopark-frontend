"use strict";

import { BookCardData } from "../../modules/Types";
import APIClient from "../../modules/ApiClient";
import BookPage from "../BookPage/BookPage";

class BookCard {
    #templateContainer: HTMLDivElement;

    constructor(data: BookCardData) {
        const template = Handlebars.templates["BookCard.hbs"];
        this.#templateContainer = document.createElement("div");
        this.#templateContainer.innerHTML = template(data);

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.#templateContainer
            .querySelector(".js-book-card")
            ?.addEventListener("click", async (e) => {
                const pageContainer = document.getElementById('page-container');
                if (pageContainer){
                    pageContainer.innerHTML = '';
                    const data = await APIClient.getBook(e.target.id);
                    const bookPage = new BookPage(await data.json());
                    bookPage.render(pageContainer);
                }
            });
    }

    render(parent: HTMLDivElement) {
        parent.appendChild(this.#templateContainer);
    }
}

export default BookCard;
