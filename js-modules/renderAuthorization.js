import * as api from './api.js'
import * as sanitize from './sanitizeData.js'
import * as comments from './renderComments.js'

export function renderAuthorizationSection() {
    const appElement = document.getElementById('app')
    appElement.innerHTML = `
    <div class="add-form login-form">
        <h1>Авторизация</h1>
        <input class="add-form-name" type="text" id="login" placeholder="Логин"/>
        <input class="add-form-name" type="text" id="password" placeholder="Пароль"/>
        <button class="add-form-button" id="authorization">Авторизоваться</button>
        <a href=""  id="to-registration" class="link"><h3>Перейти к регистрации</h3></a>
    </div>
    `

    document.getElementById('to-registration').addEventListener('click', (event) => {
        event.preventDefault()
        renderRegisterSection()
    })

    const _authorization = () => {
        let login = document.getElementById('login').value
        login = sanitize.sanitizeHTML(login)
        let password = document.getElementById('password').value
        password = sanitize.sanitizeHTML(password)

        api.authorization(login, password)
            .then(() => {
                comments.renderCommentsSection()
            })
            .catch((error) => {
                alert(error.error)
            })
    }

    document.querySelector('.login-form').addEventListener('keyup', (event) => {
        if (event.type === 'keyup' && event.key !== 'Enter') return
        _authorization()
    })

    document.getElementById('authorization').addEventListener('click', () => {
        _authorization()
    })
}

export function renderRegisterSection() {
    const appElement = document.getElementById('app')
    appElement.innerHTML = `
    <div class="add-form login-form">
        <h1>Регистрация</h1>
        <input class="add-form-name" type="text" id="name" placeholder="Имя"/>
        <input class="add-form-name" type="text" id="login" placeholder="Логин"/>
        <input class="add-form-name" type="password" id="password" placeholder="Пароль"/>
        <button class="add-form-button" id="registration">Зарегистрироваться</button>
        <a href="#" class="link" id="to-authorization"><h3>Перейти к авторизации</h3></a>
    </div>
    `

    document.getElementById('to-authorization').addEventListener('click', (event) => {
        event.preventDefault()
        renderAuthorizationSection()
    })

    const _registration = () => {
        let name = document.getElementById('name').value
        name = sanitize.sanitizeHTML(name)
        let login = document.getElementById('login').value
        login = sanitize.sanitizeHTML(login)
        let password = document.getElementById('password').value
        password = sanitize.sanitizeHTML(password)

        api.registration(login, password, name)
            .then(() => {
                comments.renderCommentsSection()
            })
            .catch((error) => {
                alert(error.error)
            })
    }

    document.querySelector('.login-form').addEventListener('keyup', (event) => {
        if (event.type === 'keyup' && event.key !== 'Enter') return
        _registration()
    })

    document.getElementById('registration').addEventListener('click', () => {
        _registration()
    })
}
