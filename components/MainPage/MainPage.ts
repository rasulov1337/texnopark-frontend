"use strict";

import APIClient from "../../modules/ApiClient";
import BookCard from "../BookCard/BookCard";
import { BookCardData } from "../../modules/Types";

class MainPage {
    #templateContainer: HTMLDivElement;
    #booksContainer: HTMLDivElement;

    constructor(books: BookCardData[]) {
        const template = Handlebars.templates["MainPage.hbs"];
        this.#templateContainer = document.createElement("div");

        this.#templateContainer.innerHTML = template({});

        this.#booksContainer = this.#templateContainer.querySelector(
            ".js-books-container"
        ) as HTMLDivElement;
        this.#redrawCards(books);

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.#templateContainer
            .querySelector(".js-book-card")
            ?.addEventListener("click", () => {
                console.log("I was clicked");
            });

        this.#templateContainer
            .querySelector(".js-search-form")
            ?.addEventListener("submit", (e: Event) => {
                e.preventDefault();
                this.search();
            });
    }

    async search() {
        const search = this.#templateContainer.querySelector(
            ".js-search"
        ) as HTMLInputElement;
        const booksData = await APIClient.getBooks({
            startId: 0,
            bookName: search.value,
        });

        this.#redrawCards(booksData);
    }

    async #redrawCards(booksData: BookCardData[]) {
        this.#booksContainer.replaceChildren();

        for (const bd of booksData) {
            const bookCard = new BookCard(bd);
            bookCard.render(this.#booksContainer);
        }
    }

    render(parent: HTMLDivElement) {
        parent.appendChild(this.#templateContainer);
    }
}

export default MainPage;
