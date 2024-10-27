"use strict";

import APIClient from "../../modules/ApiClient";
import AuthorPage from "../AuthorPage/AuthorPage";

interface ResponseData {
    id: number;
    book_name: string;
    author_name: string;
    description: string;
    rating: number;
    photo_url: string;
    text: string;
}

interface BookData {
    id: number;
    name: string;
    author: string;
    description: string;
    rating: number;
    photo: string;
    text: string;
}

class BookPage {
    #id: number;
    #name: string;
    #author: string;
    #rating: number;
    #photo: string;
    #text: string;
    #showText: true | false;
    #userRating: number;

    constructor(data: ResponseData) {
        this.#showText = false;
        this.#id = data.id;
        this.#name = data.name;
        this.#author = data.author;
        this.#rating = data.rating;
        this.#photo = `https://www.gutenberg.org/cache/epub/${this.#id}/pg${
            this.#id
        }.cover.medium.jpg`;
        this.#userRating = data.user_rating;
    }

    async #getText(id: number) {
        const response = await APIClient.getText(id);
        if (response.ok) {
            this.#text = await response.json();
        }
    }

    async #renderText() {
        this.#showText = !this.#showText;
        const arrow = document.getElementById("arrow");
        const textContainer = document.getElementById("text");
        await this.#getText(this.#id);

        if (this.#showText) {
            if (arrow) arrow.style.transform = "rotate(90deg)";
            if (textContainer) {
                textContainer.classList.remove("hide");
                textContainer.classList.add("show");
                textContainer.value = this.#text;
                this.#autoResizeTextarea(textContainer);
            }
        } else {
            if (arrow) arrow.style.transform = "rotate(0deg)";
            if (textContainer) {
                textContainer.classList.remove("show");
                textContainer.classList.add("hide");
                textContainer.value = "";
            }
        }
    }

    #autoResizeTextarea(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    #addOnChangeForm() {
        const form = document.getElementById("form");
        const stars = document.getElementsByName("rating");

        form?.addEventListener("change", async (e) => {
            e.preventDefault();
            let rating = null;
            stars.forEach((star) => {
                if (star.checked) {
                    rating = star.value;
                }
            });

            const response = await APIClient.setRating(this.#id, rating);
            if (response.ok) {
                console.log("success");
            }
        });
    }

    #addAuthorEventListener() {
        const author = document.querySelector(".js-author");
        author?.addEventListener("click", async (e) => {
            const data = await APIClient.getProfileInfo(parseInt(author.id));
            const authorPage = new AuthorPage(data);
            const pageContainer = document.querySelector("#page-container");
            pageContainer?.replaceChildren();
            pageContainer?.appendChild(authorPage.root);
            document.body.classList.remove("body-grey");
        });
    }

    #addEventListeners() {
        const arrow = document.getElementById("arrow");
        arrow?.addEventListener("click", (e) => {
            e.preventDefault();
            this.#renderText();
        });
    }

    render(parent: HTMLElement) {
        document.body.classList.add("body-grey");
        const template = Handlebars.templates["BookPage.hbs"];
        const data = {
            name: this.#name,
            author: this.#author,
            rating: this.#rating,
            photo: this.#photo,
            text: this.#text,
        } as BookData;
        parent.insertAdjacentHTML("afterbegin", template(data));

        this.#addEventListeners();
        this.#addOnChangeForm();
        this.#addAuthorEventListener();
        document.getElementById(`rating-${this.#userRating}`).checked = true;
    }
}

export default BookPage;
