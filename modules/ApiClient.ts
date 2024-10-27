"use strict";

import { BookCardData } from "../modules/Types";

interface RegisterParams {
    username: string;
    password: string;
}

interface LoginParams {
    username: string;
    password: string;
}

interface GetBooksQueryParameter {
    startId: number;
    bookName?: string;
}

import Ajax from "./Ajax.ts";

const APIClient = {
    BASE_URL: `http://${window.location.hostname}:8000`,

    async getBooks(params: GetBooksQueryParameter): Promise<BookCardData[]> {
        let url = this.BASE_URL + `/books?start_id=${params.startId}`;
        if (params.bookName) {
            url += `&book_name=${params.bookName}`;
        }
        const response = await Ajax.get(url);
        const data = await response.json();
        const res = [] as BookCardData[];
        for (const bookData of data) {
            res.push({
                id: bookData.id,
                authorName: bookData.author,
                bookTitle: bookData.name,
            });
        }
        return res;
    },

    async login({ username, password }: LoginParams) {
        const url = this.BASE_URL + "/auth/login";
        const body = {
            username: username,
            password: password,
        };
        return Ajax.post({ url, body });
    },

    async logout() {
        const url = this.BASE_URL + "/auth/logout";
        const body = {};
        return Ajax.delete({ url, body });
    },

    async register({ username, password }: RegisterParams) {
        const url = this.BASE_URL + "/auth/register";
        const body = {
            username: username,
            password: password,
        };

        return Ajax.post({ url, body });
    },
};

export default APIClient;
