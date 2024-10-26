'use strict';


interface RegisterParams {
    name: string;
    username: string;
    password: string;
    email: string;
}

interface LoginParams {
    username: string;
    password: string;
}

import Ajax from './Ajax.ts';

const APIClient = {
    BASE_URL: `http://${window.location.hostname}:8008/api`,


    async login({ username, password }: LoginParams) {
        const url = this.BASE_URL + '/auth/login';
        const body = {
            username: username,
            password: password,
        };
        return Ajax.post({ url, body });
    },

    async logout() {
        const url = this.BASE_URL + '/auth/logout';
        const body = {};
        return Ajax.delete({ url, body });
    },

    async register({ name, username, password, email }: RegisterParams) {
        const url = this.BASE_URL + '/auth/register';
        const body = {
            name: name,
            username: username,
            password: password,
            email: email,
        };

        return Ajax.post({ url, body });
    },
};

export default APIClient;