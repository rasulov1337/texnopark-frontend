'use strict';

import APIService from './src/modules/ApiClient';
import Header from './src/components/Header/Header';

const root = document.getElementById('root');
const pageContainer = document.createElement('div');

const headerCallbacks = {
    mainPage: renderMainPage,
    profilePage: renderProfilePage,
}

function renderMainPage() {}

function renderProfilePage() {

}

const main = async () => {
    const header = new Header(headerCallbacks);
    if (root) header.render(root);

    pageContainer.classList.add('page-container');
    root?.appendChild(pageContainer);

    renderMainPage();
};