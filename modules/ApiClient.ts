"use strict";

interface RegisterParams {
    username: string;
    password: string;
}

interface LoginParams {
    username: string;
    password: string;
}

import Ajax from "./Ajax.ts";

const APIClient = {
    BASE_URL: `http://${window.location.hostname}:8000`,

    async getBooks() {
        const url = this.BASE_URL + "/books?start_id=0";
        return Ajax.get(url);
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
