'use strict';

class Header {
    #headerCallbacks

    constructor(headerCallbacks: any) {
        this.#headerCallbacks = headerCallbacks
    }

    render(parent: HTMLElement){
        const template = Handlebars.templates['Header.hbs'];
        const header = document.createElement('header');
        header.insertAdjacentHTML('afterbegin', template({}));
        parent.appendChild(header);
    }
}

export default Header;