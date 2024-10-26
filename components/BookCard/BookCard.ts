"use strict";

export interface BookCardData {
    image: string;
    authorName: string;
    bookTitle: string;
}

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
            ?.addEventListener("click", () => {
                console.log("I was clicked");
            });
    }

    render(parent: HTMLDivElement) {
        parent.appendChild(this.#templateContainer);
    }
}

export default BookCard;
