class ReadBooksPage {
    root: HTMLDivElement;
    constructor(data) {
        const template = Handlebars.templates["ReadBooksPage.hbs"];

        this.root = document.createElement("div");
        for (let i = 0; i < data.length; ++i) {
            data[i].ratingStars = "";
            for (let j = 0; j < data[i].rating; ++j) {
                data[i].ratingStars += "⭐️";
            }
        }
        this.root.innerHTML = template({ books: data });
    }
}

export default ReadBooksPage;
