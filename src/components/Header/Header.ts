'use strict';

class Header {
    #headerCallbacks

    constructor(headerCallbacks: any) {
        this.#headerCallbacks = headerCallbacks
    }

    render(parent: HTMLElement){
        const template = Handlebars.templates['header'];
        parent.appendChild(template({}))
    }
}

export default Header;