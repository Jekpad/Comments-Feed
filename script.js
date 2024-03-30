"use strict";

const commentsSection = document.getElementById(`comments`);

const addForm = document.getElementById(`add-form`);
const nameInput = document.getElementById(`name-input`);
const commentInput = document.getElementById(`comment-input`);

const submitButton = document.getElementById(`submit-comment`);
const _deleteLastComment = document.getElementById(`delete-last-comment`);

let comments = [
    {
        name: "Глеб Фокин",
        date: "12.02.22 12:18",
        text: "Это будет первый комментарий на этой странице",
        likes: 3,
        isLiked: false,
    },
    {
        name: "Варвара Н.",
        date: "13.02.22 19:22",
        text: "Мне нравится как оформлена эта страница! ❤",
        likes: 74,
        isLiked: true,
    },
];

renderComments();

/**
 * Отрисовка комментариев
 * @return void
 */
function renderComments() {
    document.getElementById(`comments`).innerHTML = comments
        .map((comment, index) => {
            return `
            <li class="comment" data-index="${index}">
                <div class="comment-header">
                    <div>${comment.name}</div>
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
    initCommentLikeListener();
    initCommentStartEditListener();
    initCommentAnswerListener();
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
            renderComments();
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
                renderComments();
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
                renderComments();
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

/**
 * Валидация формы заполнения комментариев
 * @return boolean
 */
function validateCommentForm() {
    let name = nameInput.value.trim();
    let comment = nameInput.value.trim();
    if (name === "" || comment === "") {
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
    comments.push({
        name: sanitizeHTML(name),
        date: date,
        text: comment,
        likes: 0,
        isLiked: false,
    });
    renderComments();
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
