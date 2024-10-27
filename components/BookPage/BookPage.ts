'use strict';

import APIClient from "../../modules/ApiClient";

interface ResponseData {
    id: number,
    book_name: string,
    author_name: string,
    description: string,
    rating: number,
    photo_url: string,
    text: string
}

interface BookData {
    id: number,
    name: string,
    author: string,
    description: string,
    rating: number,
    photo: string,
    text: string
}

class BookPage {
    #id: number;
    #name: string;
    #author: string;
    #rating: number;
    #photo: string;
    #text: string;
    #showText: true | false;

    constructor(data: ResponseData){
        this.#showText = false;
        console.log(data)

        this.#getText(data.id);
        this.#id = data.id;
        this.#name = data.name;
        this.#author = data.author.name;
        this.#rating = data.rating;
        this.#photo = `https://www.gutenberg.org/cache/epub/${this.#id}/pg${this.#id}.cover.medium.jpg`;
    }

    async #getText(id: number){
        const response = await APIClient.getText(id);
        if (response.ok){
            console.log('well')
        } 
    }

    #renderText(){
        // this.#showText = !this.#showText;
        // const arrow = document.getElementById('arrow');
        // const textContainer = document.getElementById('text')
        // if (this.#showText) {
        //     if (arrow) arrow.style.transform = 'rotate(90deg)';
        //     if (textContainer) textContainer.textContent = this.#text;
        // } else {
        //     if (arrow) arrow.style.transform = 'rotate(0deg)';
        //     if (textContainer) textContainer.textContent = '';
        // }
        window.open(`https://www.gutenberg.org/cache/epub/${this.#id}/pg${this.#id}.txt`, '_blank');
    }

    #addEventListeners(){
        const arrow = document.getElementById('arrow');
        arrow?.addEventListener('click', (e)=>{
            e.preventDefault();
            this.#renderText();
        })
    }

    render(parent: HTMLElement){
        document.body.classList.add('body-grey')
        const template = Handlebars.templates['BookPage.hbs'];
        const data = {
            name: this.#name,
            author: this.#author,
            rating: this.#rating,
            photo: this.#photo,
            text: this.#text
        } as BookData
        parent.insertAdjacentHTML('afterbegin', template(data));
        this.#addEventListeners();
    }
}

export default BookPage;