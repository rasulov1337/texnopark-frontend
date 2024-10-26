"use strict";

import BookCard from "../BookCard/BookCard";
import { BookCardData } from "../BookCard/BookCard";

class MainPage {
    #templateContainer: HTMLDivElement;

    constructor(books: BookCardData[]) {
        const template = Handlebars.templates["MainPage.hbs"];
        this.#templateContainer = document.createElement("div");

        this.#templateContainer.innerHTML = template({});

        const booksContainer = this.#templateContainer.querySelector(
            ".js-books-container"
        ) as HTMLDivElement;
        for (const book of books) {
            const bookCard = new BookCard(book);
            bookCard.render(booksContainer);
            // booksContainer?.appendChild(bookCard);
        }

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.#templateContainer
            .querySelector(".js-book-card")
            ?.addEventListener("click", () => {
                console.log("I was clicked");
            });
    }

    render(parent: HTMLDivElement) {
        parent.appendChild(this.#templateContainer);
    }
}

export default MainPage;
