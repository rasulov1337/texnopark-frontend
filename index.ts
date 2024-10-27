"use strict";

import APIClient from "./modules/ApiClient";
import Header from "./components/Header/Header";
import "./components/precompiled-templates";
import MainPage from "./components/MainPage/MainPage";
import BookPage from "./components/BookPage/BookPage";

import { BookCardData } from "./components/BookCard/BookCard";

const root = document.getElementById("root");
const pageContainer = document.createElement("div");

const headerCallbacks = {
    mainPage: renderMainPage,
    recomendPage: renderRecomendPage,
    bestPage: renderBestPage,
    favouritesPage: renderFavouritesPage,
    profilePage: renderProfilePage,
};

async function renderMainPage(): Promise<void> {
    pageContainer.innerHTML = '';
    document.body.classList.remove('body-grey');
    const data = [] as BookCardData[];
    const f = await APIClient.getBooks();
    const fetchedData = await f.json();
    console.log(fetchedData);
    for (const d of fetchedData) {
        data.push({
            image: d.photo_url,
            authorName: d.author_name,
            bookTitle: d.book_name,
        });
    }

    const mainPage = new MainPage(data);
    mainPage.render(pageContainer);
}

function renderRecomendPage(): void {
    pageContainer.innerHTML = '';
    const bookPage = new BookPage();
    bookPage.render(pageContainer);
}

function renderBestPage(): void {
    pageContainer.innerHTML = '';
    document.body.classList.remove('body-grey');
}

function renderFavouritesPage() {
    console.log("me");
}

function renderProfilePage() {}

const main = async () => {
    const header = new Header(headerCallbacks);
    if (root) header.render(root);

    pageContainer.classList.add("page-container");
    root?.appendChild(pageContainer);

    renderMainPage();
};

main();
