'use strict';

import APIClient from '../../modules/ApiClient';
import Validation from '../../modules/Validation';

class AuthPopup {
    #config;
    #currentState;

    /**
     *
     * @param {('auth' | 'signup')} currentState
     */
    constructor(currentState: 'auth' | 'signup' = 'auth') {
        this.#currentState = currentState;
        document.body.classList.add('no-scroll');

        this.#config = {
            auth: {
                authMessage: 'Войти в аккаунт',
                inputs: {
                    username: {
                        placeholder: 'Логин',
                        type: 'text',
                        minLen: 5,
                        maxLen: 20,
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 8,
                        maxLen: 16,
                    },
                },
                buttonText: 'Войти',
                bottomText: 'Еще нет аккаунта?',
                bottomAText: 'Создать',
            },

            signup: {
                authMessage: 'Зарегистрироваться',
                inputs: {
                    username: {
                        placeholder: 'Логин',
                        type: 'text',
                        minLen: 6,
                        maxLen: 20,
                    },
                    password: {
                        placeholder: 'Пароль',
                        type: 'password',
                        minLen: 8,
                        maxLen: 16,
                    },
                    passwordRepeat: {
                        placeholder: 'Повторите пароль',
                        type: 'password',
                        minLen: 8,
                        maxLen: 16,
                    },
                },
                buttonText: 'Создать аккаунт',
                bottomText: 'Уже есть аккаунт?',
                bottomAText: 'Войти',
            },
        };
    }

    /**
     * @private
     * @description Функция для валидации данных
     * @returns {boolean} прошла ли валидацию форма
     */
    #validateData(): boolean {
        if (this.#currentState === 'auth') {
            return this.#validateAuthData();
        }
        return this.#validateRegistrationData();
    }

    /**
     * @returns {boolean} прошла ли валидацию форма
     */
    #validateAuthData(): boolean {
        const form = document.forms['auth-form'];

        const usernameInput = form.elements.username;
        const passwordInput = form.elements.password;

        const usernameValidationInfo =
            Validation.validateUsername(usernameInput);

        if (!usernameValidationInfo.ok) {
            this.showErrorMessage(usernameInput, usernameValidationInfo.text);
        } else {
            this.hideErrorMsg(usernameInput);
        }

        const passwordValidationInfo =
            Validation.validatePassword(passwordInput);
        if (!passwordValidationInfo.ok) {
            this.showErrorMessage(passwordInput, passwordValidationInfo.text);
        } else {
            this.hideErrorMsg(passwordInput);
        }

        return usernameValidationInfo.ok && passwordValidationInfo.ok;
    }

    /**
     * @returns {boolean} прошла ли валидацию форма
     */
    #validateRegistrationData(): boolean {
        const form = document.forms['auth-form'];

        const usernameInput = form.elements.username;
        const passwordInput = form.elements.password;
        const passwordRepeatInput = form.elements.passwordRepeat;

        const usernameValidInfo = Validation.validateUsername(usernameInput);
        const passwordValidInfo = Validation.validatePassword(passwordInput);
        const passwordRepeatValidInfo =
            Validation.validatePassword(passwordRepeatInput);
        const passwordsValidInfo = Validation.validatePasswords(
            passwordInput,
            passwordRepeatInput
        );

        if (!usernameValidInfo.ok) {
            this.showErrorMessage(usernameInput, usernameValidInfo.text);
        } else {
            this.hideErrorMsg(usernameInput);
        }

        if (!passwordValidInfo.ok) {
            this.showErrorMessage(passwordInput, passwordValidInfo.text);
        } else {
            this.hideErrorMsg(passwordInput);
        }

        if (!passwordRepeatValidInfo.ok) {
            this.showErrorMessage(
                passwordRepeatInput,
                passwordRepeatValidInfo.text
            );
        } else {
            if (!passwordsValidInfo.ok) {
                this.showErrorMessage(
                    passwordRepeatInput,
                    passwordsValidInfo.text
                );
            } else {
                this.hideErrorMsg(passwordRepeatInput);
            }
        }

        return (
            usernameValidInfo.ok &&
            passwordValidInfo.ok &&
            passwordRepeatValidInfo.ok &&
            passwordsValidInfo.ok
        );
    }

    showErrorMessage(inputElem: HTMLInputElement, errorMsg: string) {
        inputElem.classList.add('popup__input__error');
        const exclamation = inputElem.parentElement!.querySelector(
            '.popup__exclamation'
        )!;
        exclamation.classList.remove('none');

        const validationMessageContainer =
            inputElem.parentElement!.querySelector(
                '.popup__validationMessage'
            )!;

        validationMessageContainer.textContent = errorMsg;
    }

    hideErrorMsg(inputElem: HTMLInputElement) {
        const parentElem = inputElem.parentElement!;
        inputElem.classList.remove('popup__input__error');
        parentElem
            .querySelector('.popup__validationMessage')!
            .classList.add('none');
        parentElem.querySelector('.popup__exclamation')!.classList.add('none');
    }

    /**
     * @private
     */
    async #onFormSubmit(e: any) {
        e.preventDefault();

        if (!this.#validateData()) {
            return;
        }

        const data = {};
        Array.from(e.target.elements).forEach((el) => {
            const { name, value } = el;
            data[name] = value;
        });

        if (this.#currentState === 'signup') {
            try {
                const res = await APIClient.register({
                    username: data['username'],
                    password: data['password'],
                });

                if (res.ok) location.reload();
                else if (res.status === 409)
                    this.#setFailureMessage('Такой аккаунт уже создан!');
                else this.#setFailureMessage('Неизвестная ошибка на сервере');
            } catch (err) {
                this.#setFailureMessage('Неизвестная ошибка: ' + err.message);
            }
            return;
        }

        APIClient.login({
            username: data['username'],
            password: data['password'],
        })
            .then((r) => {
                if (r.ok) location.reload();
                else {
                    this.#setFailureMessage('Неверный логин или пароль!');
                }
            })
            .catch((err) => {
                this.#setFailureMessage('Неизвестная ошибка: ' + err.message);
            });
    }

    /**
     * @private
     * @param {string} message
     */
    #setFailureMessage(message: string): void {
        const failureMessageElem = document.querySelector(
            '.popup__failure-message'
        );

        if (message === null) {
            failureMessageElem?.classList.add('none');
        }
        failureMessageElem?.classList.remove('none');
        if (failureMessageElem) failureMessageElem.textContent = message;
    }

    #closeOverlay(parent: HTMLInputElement): void {
        parent.querySelector('.overlay')?.remove();
        document.body.classList.remove('no-scroll');
    }

    /**
     *
     * @param {HTMLElement} parent
     *
     */
    render(parent: HTMLElement): void {
        const template = Handlebars.templates['AuthPopup.hbs'];
        const templateContainer = document.createElement('div');

        const data = this.#config[this.#currentState];

        templateContainer.innerHTML = template(data);

        parent.appendChild(templateContainer);
        setTimeout(() => this.#addEventListeners(parent), 0);
    }

    #addEventListeners(parent: HTMLInputElement): void {
        // Close overlay
        const form: HTMLFormElement = parent.querySelector('.popup')!;
        form.onclick = (e) => e.stopPropagation();
        form.onsubmit = (e) => this.#onFormSubmit(e);

        parent
            .querySelector('.close-cross')!
            .addEventListener('click', () => this.#closeOverlay(parent));

        parent
            .querySelector('.overlay')!
            .addEventListener('click', () => this.#closeOverlay(parent));

        parent.querySelector('.popup__a')!.addEventListener('click', (e) => {
            e.preventDefault();

            const newPopupWindow = new AuthPopup(
                this.#currentState === 'auth' ? 'signup' : 'auth'
            );
            parent.querySelector('.overlay')!.remove();
            newPopupWindow.render(parent);
        });

        Array.prototype.forEach.call(
            (parent.querySelector('#auth-form')!).elements,
            (element) => {
                const exclamation = element.parentElement.querySelector(
                    '.popup__exclamation'
                );

                if (exclamation === undefined) return;

                const validationMessageContainer =
                    element.parentElement.querySelector(
                        '.popup__validationMessage'
                    );

                exclamation.onmouseover = () =>
                    validationMessageContainer.classList.remove('none');

                exclamation.onmouseout = () =>
                    validationMessageContainer.classList.add('none');
            }
        );
    }
}

export default AuthPopup;