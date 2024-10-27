class AuthorPage {
    root: HTMLDivElement;
    constructor(data) {
        const template = Handlebars.templates["AuthorPage.hbs"];

        this.root = document.createElement("div");
        this.root.innerHTML = template(data);
    }
}

export default AuthorPage;
