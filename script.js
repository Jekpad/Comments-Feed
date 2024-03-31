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
 * Отрисовка комментариев
 * @return void
 */
function renderComments(getRemoteData = true) {
    if (getRemoteData) {
        renderAddEditComment(true);
        fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`, {
            method: `GET`,
        }).then((response) => {
            response.json().then((responseData) => {
                comments = responseData.comments;
                document.getElementById(`comments`).innerHTML = comments
                    .map((comment, index) => {
                        return `
                        <li class="comment" data-id="${comment.id}", data-index="${index}">
                            <div class="comment-header">
                                <div>${comment.author.name}</div>
                                <div>${comment.date}</div>
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
            });
        });
    } else {
        document.getElementById(`comments`).innerHTML = comments
            .map((comment, index) => {
                return `
            <li class="comment" data-id="${comment.id}", data-index="${index}">
                <div class="comment-header">
                    <div>${comment.author.name}</div>
                    <div>${comment.date}</div>
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
    }
}

/**
 * Отрисовка формы добавления/редактирования комментариев
 * @param bool isLoading Блокировать ввод на время записи комментария
 *
 * @return void
 */
function renderAddEditComment(isLoading = false) {
    if (isLoading) {
        addForm.innerHTML = `
            <div class="add-form-loading">
                <h3>Комментарий добавляется</h3>
                <?xml version="1.0" encoding="utf-8"?>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
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
                    <!-- [ldio] generated by https://loading.io/ --></svg>
            </div> 
        `;
    } else {
        addForm.innerHTML = `
            <input id="name-input" type="text" class="add-form-name" placeholder="Введите имя (не менее 3 символов)" />
            <textarea id="comment-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
            <div class="add-form-row">
                <button id="delete-last-comment" class="add-form-button">Удалить последний комментарий</button>
                <button id="submit-comment" class="add-form-button button_disabled" disabled>Написать</button>
            </div>
        `;
        nameInput = document.getElementById(`name-input`);
        commentInput = document.getElementById(`comment-input`);
        submitButton = document.getElementById(`submit-comment`);
        _deleteLastComment = document.getElementById(`delete-last-comment`);

        submitButton.addEventListener(`click`, () => {
            addComment(nameInput.value, commentInput.value, getFormatedDate());

            nameInput.value = "";
            commentInput.value = "";
            validateCommentForm();
        });

        addForm.addEventListener(`keyup`, (event) => {
            if (event.key != "Enter" || !validateCommentForm()) return;
            addComment(nameInput.value, commentInput.value, getFormatedDate());

            nameInput.value = "";
            commentInput.value = "";
            validateCommentForm();
        });

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
    }
}

/**
 * Обработчик лайков комментариев
 * @return void
 */
function initCommentLikeListener() {
    const buttons = document.querySelectorAll(`button.like-button`);

    buttons.forEach((button) => {
        button.addEventListener(`click`, (event) => {
            event.stopPropagation();
            const comment = comments[button.closest(`.comment`).dataset.index];

            comment.likes += comment.isLiked ? -1 : 1;
            comment.isLiked = !comment.isLiked;
            renderComments(false);
        });
    });
}

/**
 * Обработчик редактирования комментариев
 * @return void
 */
function initCommentStartEditListener() {
    const buttons = document.querySelectorAll(`button.comment-button`);

    buttons.forEach((button) => {
        button.addEventListener(`click`, (event) => {
            event.stopPropagation();

            const commentStructure = button.closest(`.comment`);
            const commentObject = comments[commentStructure.dataset.index];

            const newCommentText = document.createElement(`textarea`);
            newCommentText.innerText = commentObject.text;
            newCommentText.setAttribute(`class`, `add-form-text`);
            newCommentText.setAttribute(`rows`, `4`);
            commentStructure.querySelector(`.comment-text`).replaceWith(newCommentText);

            const newButton = document.createElement(`button`);
            newButton.setAttribute(`class`, `comment-button`);
            newButton.innerText = `Сохранить`;
            button.replaceWith(newButton);

            newButton.addEventListener(`click`, (event) => {
                event.stopPropagation();
                if (newCommentText.value === "") return;
                commentObject.text = sanitizeHTML(newCommentText.value);
                renderComments(false);
            });

            newCommentText.addEventListener(`click`, (event) => {
                event.stopPropagation();
            });

            commentsSection.addEventListener(`keyup`, (event) => {
                event.stopPropagation();

                const newComment = sanitizeHTML(newCommentText.value);
                if (event.key != "Enter") {
                    if (newComment === "") {
                        newButton.disabled = true;
                    } else {
                        newButton.disabled = false;
                    }
                    return;
                }
                commentObject.text = sanitizeHTML(newCommentText.value);
                renderComments(false);
            });
        });
    });
}

/**
 * Возможность комментировать чужой пост
 * @return void
 */
function initCommentAnswerListener() {
    const commentsElements = document.querySelectorAll(`.comment`);
    commentsElements.forEach((comment) => {
        comment.addEventListener(`click`, (event) => {
            const commentObject = comments[comment.dataset.index];
            let commentText = commentObject.text;
            commentText = commentText
                .replaceAll("<div class='quote'>", "QUOTE_BEGIN")
                .replaceAll("<br>", "QUOTE_NEXT")
                .replaceAll("</div>", "QUOTE_END");
            commentInput.value = `QUOTE_BEGIN${commentObject.name}QUOTE_NEXT${commentText}QUOTE_END\n`;
            validateCommentForm();

            // if (event.target.dataset.index != undefined) {
            //     nameInput.scrollIntoView();
            // }
        });
    });
}

/**
 * Валидация формы заполнения комментариев
 * @return boolean
 */
function validateCommentForm() {
    let name = nameInput.value.trim();
    let comment = commentInput.value.trim();

    if (name === "" || name.length < 3 || comment === "") {
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
 * @param string name
 * @param string comment
 * @param string date
 *
 * @return void
 */
function addComment(name, comment, date) {
    comment = sanitizeHTML(comment);
    comment = comment.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_NEXT", "<br>").replaceAll("QUOTE_END", "</div>");

    renderAddEditComment(true);

    fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`, {
        method: `POST`,
        body: JSON.stringify({
            name: sanitizeHTML(name),
            text: comment,
        }),
    }).then((response) => {
        response.json().then((responseData) => {
            comments = responseData.comments;
            renderComments();
        });
    });
}

/**
 * Удалить последний комментарий
 * @return void
 */
function deleteLastComment() {
    comments.pop();
    renderComments();
}

/**
 * Получить текущую дату в формате dd.mm.YYYY hh:mm
 * @return string
 */
function getFormatedDate() {
    let formatDateDigits = (digit) => (digit <= 9 ? `0${digit}` : digit);

    let date = new Date();

    let day = formatDateDigits(date.getDate());
    let month = formatDateDigits(date.getMonth() + 1);
    let year = date.getFullYear();

    let hours = formatDateDigits(date.getHours());
    let minutes = formatDateDigits(date.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function sanitizeHTML(text) {
    return text.trim().replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
