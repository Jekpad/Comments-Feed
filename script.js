<<<<<<<< HEAD:renderComments.js
import * as sanitizeData from './sanitizeData.js'
import * as api from './api.js'
import * as authorization from './renderAuthorization.js'

const csvLoading = `<?xml version="1.0" encoding="utf-8"?>
========
"use strict";

const personalKey = "uvarov-ms";

const commentsSection = document.getElementById(`comments`);

const addForm = document.getElementById(`add-form`);
let nameInput = document.getElementById(`name-input`);
let commentInput = document.getElementById(`comment-input`);
let submitButton = document.getElementById(`submit-comment`);
let _deleteLastComment = document.getElementById(`delete-last-comment`);

let comments = [];

renderComments();
renderAddEditComment();

/**
 * Получить список комментариев
 * @param getRemoteData
 * @returns {Promise<any>|Promise<unknown>}
 */
function getComments(getRemoteData = true) {
    if (getRemoteData) {
        return fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`, {
            method: `GET`,
        })
            .then((response) => {
                return Promise.all([response.status, response.json()]);
            })
            .then(([responseStatus, responseData]) => {
                if (responseStatus === 200 || responseStatus === 201) {
                    return (comments = responseData.comments);
                }
                return Promise.reject();
            })
            .catch((error) => {
                if (error instanceof TypeError && error.message === "Failed to fetch") {
                    alert(`Отсутствует интернет-соединение.`);
                } else {
                    setTimeout(() => {
                        renderComments();
                    }, 1000);
                }

                return Promise.reject();
            });
    } else {
        return new Promise((resolve) => resolve(comments));
    }
}

/**
 * Отрисовка комментариев
 * @return void
 */
function renderComments(getRemoteData = true) {
    getComments(getRemoteData)
        .then((comments) => {
            if (comments === undefined) return;
            document.getElementById(`comments`).innerHTML = comments
                .map((comment, index) => {
                    return `
                        <li class="comment" data-id="${comment.id}", data-index="${index}">
                            <div class="comment-header">
                                <div>${comment.author.name}</div>
                                <div>${getFormatedDate(comment.date)}</div>
                            </div>
                            <div class="comment-body">
                                <div class="comment-text">${comment.text}</div>
                            </div>
                            <div class="comment-footer">
                                <button class="comment-button">Редактировать</button>
                                <div class="likes">
                                    <span class="likes-counter">${comment.likes}</span>
                                    <button class="like-button ${comment.isLiked ? "-active-like" : ""}"></button>
                                </div>
                            </div>
                        </li>
                        `;
                })
                .join(``);

            renderAddEditComment();

            initCommentLikeListener();
            initCommentStartEditListener();
            initCommentAnswerListener();
        }).catch();
}

/**
 * Отрисовка формы добавления/редактирования комментариев
 *
 * @return void
 * @param isLoading
 * @param name
 * @param comment
 */
function renderAddEditComment(isLoading = false, name = "", comment = "") {
    if (isLoading) {
        addForm.innerHTML = `
            <div class="add-form-loading">
                <h3>Комментарий добавляется</h3>
                <?xml version="1.0" encoding="utf-8"?>
>>>>>>>> main:script.js
                    <svg class="loading-image" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <g transform="rotate(0 50 50)">
                    <rect x="44" y="21" rx="6" ry="6" width="12" height="12" fill="#bcec30">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="2.5s" begin="-2.25s" repeatCount="indefinite"></animate>
                    </rect>
                    </g><g transform="rotate(36 50 50)">
                    <rect x="44" y="21" rx="6" ry="6" width="12" height="12" fill="#bcec30">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="2.5s" begin="-2s" repeatCount="indefinite"></animate>
                    </rect>
                    </g><g transform="rotate(72 50 50)">
                    <rect x="44" y="21" rx="6" ry="6" width="12" height="12" fill="#bcec30">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="2.5s" begin="-1.75s" repeatCount="indefinite"></animate>
                    </rect>
                    </g><g transform="rotate(108 50 50)">
                    <rect x="44" y="21" rx="6" ry="6" width="12" height="12" fill="#bcec30">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="2.5s" begin="-1.5s" repeatCount="indefinite"></animate>
                    </rect>
                    </g><g transform="rotate(144 50 50)">
                    <rect x="44" y="21" rx="6" ry="6" width="12" height="12" fill="#bcec30">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="2.5s" begin="-1.25s" repeatCount="indefinite"></animate>
                    </rect>
                    </g><g transform="rotate(180 50 50)">
                    <rect x="44" y="21" rx="6" ry="6" width="12" height="12" fill="#bcec30">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="2.5s" begin="-1s" repeatCount="indefinite"></animate>
                    </rect>
                    </g><g transform="rotate(216 50 50)">
                    <rect x="44" y="21" rx="6" ry="6" width="12" height="12" fill="#bcec30">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="2.5s" begin="-0.75s" repeatCount="indefinite"></animate>
                    </rect>
                    </g><g transform="rotate(252 50 50)">
                    <rect x="44" y="21" rx="6" ry="6" width="12" height="12" fill="#bcec30">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="2.5s" begin="-0.5s" repeatCount="indefinite"></animate>
                    </rect>
                    </g><g transform="rotate(288 50 50)">
                    <rect x="44" y="21" rx="6" ry="6" width="12" height="12" fill="#bcec30">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="2.5s" begin="-0.25s" repeatCount="indefinite"></animate>
                    </rect>
                    </g><g transform="rotate(324 50 50)">
                    <rect x="44" y="21" rx="6" ry="6" width="12" height="12" fill="#bcec30">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="2.5s" begin="0s" repeatCount="indefinite"></animate>
                    </rect>
                    </g>
                    <!-- [ldio] generated by https://loading.io/ --></svg>`

let commentsElement = document.getElementById('comments')
let addForm = document.getElementById('add-form')
let nameInput = document.getElementById('name-input')
let commentInput = document.getElementById('comment-input')
let submitButton = document.getElementById('submit-comment')

let comments = []

export function renderCommentsSection() {
    const appElement = document.getElementById('app')
    appElement.innerHTML = `
    <ul id="comments" class="comments">
        <div class="add-form-loading">
            <h3>Список комментариев загружается...</h3>
            ${csvLoading}              
        </div>
    </ul>
    <div id="add-form" class="add-form">
    </div>`
    commentsElement = document.getElementById('comments')
    addForm = document.getElementById('add-form')
    renderComments()
}

/**
 * Отрисовка комментариев
 * @return void
 */
function renderComments(getRemoteData = true) {
    const render = (comments) => {
        commentsElement.innerHTML = comments
            .map((comment, index) => {
                return `
                <li class="comment" data-id="${comment.id}" data-index="${index}">
                    <div class="comment-header">
                        <div>${comment.author.name}</div>
                        <div>${sanitizeData.getFormatedDate(comment.date)}</div>
                    </div>
                        <div class="comment-body">
                        <div class="comment-text">${comment.text}</div>
                    </div>
                    <div class="comment-footer">
                        <button class="comment-button">Редактировать</button>
                        <div class="likes">
                            <span class="likes-counter">${comment.likes}</span>
                            <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
                        </div>
                    </div>
                </li>`
            })
            .join('')
    }

    if (!getRemoteData) {
        render(comments)

        initCommentLikeListener()
        initCommentStartEditListener()
        initCommentAnswerListener()

        renderAddEditComment()
    } else {
        api.getComments().then((returnedComments) => {
            if (returnedComments === undefined) return
            render((comments = returnedComments))

            initCommentLikeListener()
            initCommentStartEditListener()
            initCommentAnswerListener()

            renderAddEditComment()
        })
    }
}

/**
 * Отрисовка формы добавления/редактирования комментариев
 *
 * @return void
 * @param isLoading
 * @param name
 * @param comment
 */
function renderAddEditComment(isLoading = false, comment = '') {
    if (api.getToken().length <= 0) {
        addForm.innerHTML = `
            <div class="add-form-loading">
                <p>Для добавления комментариев необходима <a id="authorization" class="link" href="index.html">авторизация</a></p>
            </div>
        `
        document.getElementById('authorization').addEventListener('click', (event) => {
            event.preventDefault()
            authorization.renderAuthorizationSection()
        })
        return
    }

    if (isLoading) {
        addForm.innerHTML = `
            <div class="add-form-loading">
                <h3>Комментарий добавляется</h3>
                ${csvLoading}
            </div> 
<<<<<<<< HEAD:renderComments.js
        `
        return
    }

    addForm.innerHTML = `
========
        `;
    } else {
        addForm.innerHTML = `
>>>>>>>> main:script.js
            <input id="name-input" type="text" class="add-form-name" placeholder="Введите имя (не менее 3 символов)" />
            <textarea id="comment-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
            <div class="add-form-row">
                <button id="delete-last-comment" class="add-form-button">Удалить последний комментарий</button>
                <button id="submit-comment" class="add-form-button button_disabled" disabled>Написать</button>
            </div>
        `

<<<<<<<< HEAD:renderComments.js
    nameInput = document.getElementById('name-input')
    commentInput = document.getElementById('comment-input')
    submitButton = document.getElementById('submit-comment')
    let _deleteLastComment = document.getElementById('delete-last-comment')

    nameInput.disabled = true
    nameInput.value = api.getUserName()
    commentInput.value = comment

    submitButton.addEventListener('click', initAddEditCommentEvent)
    addForm.addEventListener('keyup', initAddEditCommentEvent)

    _deleteLastComment.addEventListener('click', () => {
        deleteLastComment()
    })
    ;[nameInput, commentInput].forEach((input) => {
        input.addEventListener('input', () => {
            validateCommentForm()
        })

        input.addEventListener('keyup', () => {
            validateCommentForm()
        })
    })

    validateCommentForm()
========
        nameInput = document.getElementById(`name-input`);
        commentInput = document.getElementById(`comment-input`);
        submitButton = document.getElementById(`submit-comment`);
        _deleteLastComment = document.getElementById(`delete-last-comment`);

        submitButton.addEventListener(`click`, initAddEditCommentEvent);
        addForm.addEventListener(`keyup`, initAddEditCommentEvent);

        nameInput.value = name;
        commentInput.value = comment;

        _deleteLastComment.addEventListener(`click`, () => {
            deleteLastComment();
        });

        [nameInput, commentInput].forEach((input) => {
            input.addEventListener(`input`, () => {
                validateCommentForm();
            });

            input.addEventListener(`keyup`, () => {
                validateCommentForm();
            });
        });

        validateCommentForm();
    }
>>>>>>>> main:script.js
}

/**
 * Обработчик отправки комментариев
 * @param event
 *
 * @return void
 */
function initAddEditCommentEvent(event) {
<<<<<<<< HEAD:renderComments.js
    if (event.type === 'keyup' && (event.key !== 'Enter' || !validateCommentForm())) return
    addComment(nameInput.value, commentInput.value)
========
    if (event.type === "keyup" && (event.key !== "Enter" || !validateCommentForm())) return;

    addComment(nameInput.value, commentInput.value);
    nameInput.value = "";
    commentInput.value = "";
    validateCommentForm();
>>>>>>>> main:script.js
}

/**
 * Обработчик лайков комментариев
 * @return void
 */
function initCommentLikeListener() {
    const buttons = document.querySelectorAll('button.like-button')

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()

            button.classList.add('-loading-like')

            const comment = comments[button.closest('.comment').dataset.index]

            const delay = (interval = 300) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve()
                    }, interval)
                })
            }

            delay(1500).then(() => {
                comment.likes += comment.isLiked ? -1 : 1
                comment.isLiked = !comment.isLiked
                renderComments(false)
            })
        })
    })
}

/**
 * Обработчик редактирования комментариев
 * @return void
 */
function initCommentStartEditListener() {
    const buttons = document.querySelectorAll('button.comment-button')

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()

            const commentStructure = button.closest('.comment')
            const commentObject = comments[commentStructure.dataset.index]

            const newCommentText = document.createElement('textarea')
            newCommentText.innerText = commentObject.text
            newCommentText.setAttribute('class', 'add-form-text')
            newCommentText.setAttribute('rows', '4')
            commentStructure.querySelector('.comment-text').replaceWith(newCommentText)

            const newButton = document.createElement('button')
            newButton.setAttribute('class', 'comment-button')
            newButton.innerText = 'Сохранить'
            button.replaceWith(newButton)

<<<<<<<< HEAD:renderComments.js
            newButton.addEventListener('click', (event) => {
                event.stopPropagation()
                if (newCommentText.value === '') return
                commentObject.text = sanitizeData.sanitizeHTML(newCommentText.value)
                renderComments(false)
            })
========
            newButton.addEventListener(`click`, (event) => {
                event.stopPropagation();
                if (newCommentText.value === "") return;
                commentObject.text = sanitizeHTML(newCommentText.value);
                renderComments(false);
            });
>>>>>>>> main:script.js

            newCommentText.addEventListener('click', (event) => {
                event.stopPropagation()
            })

<<<<<<<< HEAD:renderComments.js
            commentStructure.addEventListener('keyup', (event) => {
                event.stopPropagation()

                const newComment = sanitizeData.sanitizeHTML(newCommentText.value)
                if (event.key !== 'Enter') {
                    newButton.disabled = newComment === ''
                    return
                }
                commentObject.text = sanitizeData.sanitizeHTML(newCommentText.value)
                renderComments(false)
            })
        })
    })
========
            commentsSection.addEventListener(`keyup`, (event) => {
                event.stopPropagation();

                const newComment = sanitizeHTML(newCommentText.value);
                if (event.key !== "Enter") {
                    newButton.disabled = newComment === "";
                    return;
                }
                commentObject.text = sanitizeHTML(newCommentText.value);
                renderComments(false);
            });
        });
    });
>>>>>>>> main:script.js
}

/**
 * Возможность комментировать чужой пост
 * @return void
 */
function initCommentAnswerListener() {
    const commentsElements = document.querySelectorAll('.comment')
    commentsElements.forEach((comment) => {
        comment.addEventListener('click', () => {
            const commentObject = comments[comment.dataset.index]
            let commentText = commentObject.text
            commentText = commentText
                .replaceAll('<div class="quote">', 'QUOTE_BEGIN')
                .replaceAll('<br>', 'QUOTE_NEXT')
                .replaceAll('</div>', 'QUOTE_END')
            commentInput.value = `QUOTE_BEGIN${commentObject.author.name}QUOTE_NEXT${commentText}QUOTE_END\n`
            validateCommentForm()
        })
    })
}

/**
 * Валидация формы заполнения комментариев
 * @return boolean
 */
function validateCommentForm() {
    let name = nameInput.value.trim();
    let comment = commentInput.value.trim();

    if (
        name === "" ||
        comment === ""
        // || name.length < 3
    ) {
        submitButton.classList.add(`button_disabled`);
        submitButton.disabled = true;
        return false;
    } else {
        submitButton.classList.remove(`button_disabled`);
        submitButton.disabled = false;
        return true;
    }
}

/**
 * Добавить новый комментарий пользователя
 * @param name
 * @param comment
 *
 * @return void
 */
function addComment(name, comment) {
<<<<<<<< HEAD:renderComments.js
    let clearName = sanitizeData.sanitizeHTML(name)
    let clearComment = sanitizeData.sanitizeHTML(comment)
========
    let clearComment = sanitizeHTML(comment);
>>>>>>>> main:script.js
    clearComment = clearComment
        .replaceAll('QUOTE_BEGIN', '<div class="quote">')
        .replaceAll('QUOTE_NEXT', '<br>')
        .replaceAll('QUOTE_END', '</div>')

    renderAddEditComment(true)

<<<<<<<< HEAD:renderComments.js
    api.postComment(clearName, clearComment)
        .then(() => {
            renderAddEditComment(false)
            renderComments()
        })
        .catch(() => {
            renderAddEditComment(false, comment)
        })
========
    fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`, {
        method: `POST`,
        body: JSON.stringify({
            name: sanitizeHTML(name),
            text: clearComment,
            forceError: true,
        }),
    })
        .then((response) => {
            return Promise.all([response.status, response.json()]);
        })
        .then(([responseStatus, responseData]) => {
            if (responseStatus === 500) {
                addComment(name, comment);
                return;
            }
            if (responseStatus !== 201) return Promise.reject(responseData.error);
            comments = responseData.comments;
            renderComments();
            renderAddEditComment();
        })
        .catch((error) => {
            if (error instanceof TypeError && error.message === "Failed to fetch") alert(`Отсутствует интернет-соединение`);
            else alert(error);
            renderAddEditComment(false, name, comment);
        });
>>>>>>>> main:script.js
}

/**
 * Удалить последний комментарий
 * @return void
 */
function deleteLastComment() {
    comments.pop()
    renderComments(false)
}

/**
 * Получить текущую дату в формате dd.mm.YYYY hh:mm
 * @return string
 */
<<<<<<<< HEAD:renderComments.js
function validateCommentForm() {
    let name = nameInput.value.trim()
    let comment = commentInput.value.trim()

    if (name === '' || comment === '') {
        submitButton.classList.add('button_disabled')
        submitButton.disabled = true
        return false
    } else {
        submitButton.classList.remove('button_disabled')
        submitButton.disabled = false
        return true
    }
========
function getFormatedDate(date = null) {
    let formatDateDigits = (digit) => (digit <= 9 ? `0${digit}` : digit);

    if (date.length > 0)
        date = new Date(date);

    let day = formatDateDigits(date.getDate());
    let month = formatDateDigits(date.getMonth() + 1);
    let year = date.getFullYear();

    let hours = formatDateDigits(date.getHours());
    let minutes = formatDateDigits(date.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

/**
 * Очистка данных из формы ввода
 * @param text
 * @returns {string}
 */
function sanitizeHTML(text) {
    return text.trim().replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
>>>>>>>> main:script.js
}
