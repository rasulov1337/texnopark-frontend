"use strict";

import APIService from "./modules/ApiClient";
import Header from "./components/Header/Header";
import "./components/precompiled-templates";
import MainPage from "./components/MainPage/MainPage";

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

function renderMainPage(): void {
    console.log("me");
}

function renderRecomendPage(): void {
    console.log("me");
}

function renderBestPage(): void {
    console.log("me");
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

    const data = [] as BookCardData[];
    for (let i = 0; i < 20; ++i) {
        data.push({
            image: "https://www.gutenberg.org/cache/epub/72980/pg72980.cover.medium.jpg",
            authorName: "Author Name",
            bookTitle: `Book Title ${i + 1}`,
        });
    }

    const mainPage = new MainPage(data);
    mainPage.render(pageContainer);
};

main();
