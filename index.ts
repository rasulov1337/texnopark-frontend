"use strict";

import APIClient from "./modules/ApiClient";
import Header from "./components/Header/Header";
import "./components/precompiled-templates";
import MainPage from "./components/MainPage/MainPage";
import BestsellersPage from "./components/BestsellersPage/BestsellersPage";

import { BookCardData } from "./modules/Types";
import ReadBooksPage from "./components/ReadBooksPage/ReadBooksPage";
import AuthorPage from "./components/AuthorPage/AuthorPage";

const root = document.getElementById("root");
const pageContainer = document.createElement("div");
pageContainer.id = "page-container";

const headerCallbacks = {
    mainPage: renderMainPage,
    recomendPage: renderRecomendPage,
    bestPage: renderBestPage,
    favouritesPage: renderFavouritesPage,
    profilePage: renderProfilePage,
    readBooksPage: renderReadBooksPage,
};

async function renderMainPage(): Promise<void> {
    pageContainer.innerHTML = "";
    document.body.classList.remove("body-grey");
    const booksData = await APIClient.getBooks({
        startId: 0,
    });

    const mainPage = new MainPage(booksData);
    mainPage.render(pageContainer);
}

async function renderRecomendPage(): Promise<void> {
    pageContainer.replaceChildren();
    document.body.classList.remove("body-grey");
    const booksData = await APIClient.getRecommendations();

    const page = new BestsellersPage(booksData, "Рекомендации");
    page.render(pageContainer);
}

async function renderBestPage(): Promise<void> {
    pageContainer.replaceChildren();
    document.body.classList.remove("body-grey");

    const booksData = await APIClient.getBooks({
        startId: 0,
        best: true,
    });

    const page = new BestsellersPage(booksData, "Бестселлеры");
    page.render(pageContainer);
}

function renderFavouritesPage() {
    console.log("me");
}

async function renderProfilePage() {
    const profileData = await APIClient.getProfileInfo(1);
    const page = new AuthorPage(profileData);
    pageContainer.appendChild(page.root);
}

async function renderReadBooksPage() {
    pageContainer.replaceChildren();
    document.body.classList.remove("body-grey");
    const data = await APIClient.getReadBooks();
    const page = new ReadBooksPage(data);
    pageContainer.appendChild(page.root);
}

const main = async () => {
    const header = new Header(headerCallbacks);
    if (root) await header.render(root);

    pageContainer.classList.add("page-container");
    root?.appendChild(pageContainer);

    renderMainPage();
};

main();
