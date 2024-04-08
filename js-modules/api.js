const personalKey = `uvarov-ms`;
const apiURL = `https://wedev-api.sky.pro/api/v2/${personalKey}`

let userToken = "";
let userName = "";

export function setToken(token) {
    userToken = `Bearer ${token}`;
    setLocalData();
}

export function getToken() {
    return userToken;
}

export function setUserName(name) {
    userName = name;
    setLocalData();
}

export function getUserName() {
    return userName;
}

export function setLocalData() {
    localStorage.setItem("userToken", userToken);
    localStorage.setItem("userName", userName);
}

export function restoreLocalData() {
    let _token = localStorage.getItem("userToken");
    userToken = typeof _token === "string" ? _token : "";
    let name = localStorage.getItem("userName");
    userName = typeof name === "string" ? name : "";
}

/**
 * Получить список комментариев
 */
export function getComments() {
    return fetch(`${apiURL}/comments`, {
        method: `GET`,
        headers: {
            Authorization: getToken()
        },
    })
        .then((response) => {
            return Promise.all([response.status, response.json()]);
        })
        .then(([responseStatus, responseData]) => {
            if (responseStatus === 200 || responseStatus === 201) {
                return (responseData.comments);
            }
            return Promise.reject();
        })
        .catch((error) => {
            if (error instanceof TypeError && error.message === "Failed to fetch") {
                alert(`Отсутствует интернет-соединение.`);
            } else {
                setTimeout(() => {
                    return getComments();
                }, 1000);
            }
            return Promise.reject();
        });
}

/**
 * Записать новый комментарий
 */
export function postComment(name, comment) {
    return fetch(`${apiURL}/comments`, {
        method: `POST`,
        headers: {
            Authorization: getToken()
        },
        body: JSON.stringify({
            name: name,
            text: comment,
            forceError: true,
        }),
    })
        .then((response) => {
            return Promise.all([response.status, response.json()]);
        })
        .then(([responseStatus, responseData]) => {
            if (responseStatus === 500) {
                return postComment(name, comment);
            }
            if (responseStatus !== 201) return Promise.reject(responseData.error);
            return Promise.resolve(responseData.comments);
        })
        .catch((error) => {
            if (error instanceof TypeError && error.message === "Failed to fetch") alert(`Отсутствует интернет-соединение`);
            else if (error !== undefined && error.length > 0) alert(error);
            return Promise.reject();
        });
}

/**
 * Авторизация пользователя по логину и паролю
 * @param login
 * @param password
 * @returns {Promise<void>}
 */
export function authorization(login, password) {
    return fetch(`https://wedev-api.sky.pro/api/user/login`, {
        method: `POST`,
        body: JSON.stringify({
            login: login,
            password: password
        })
    }).then((response) => {
        return Promise.all([response.status, response.json()])
    }).then(([responseStatus, responseData]) => {
        if (responseStatus === 201) {
            setToken(responseData.user.token);
            setUserName(responseData.user.name);
            return Promise.resolve();
        }
        return Promise.reject(responseData);
    }).catch((error) => {
        if (error instanceof TypeError && error.message === "Failed to fetch") alert(`Отсутствует интернет-соединение`);
        return Promise.reject(error);
    });
}

/**
 * Регистрация пользователя
 * @param login
 * @param password
 * @param name
 * @returns {Promise<void>}
 */
export function registration(login, password, name) {
    return fetch(`https://wedev-api.sky.pro/api/user`, {
        method: `POST`,
        body: JSON.stringify({
            name: name,
            login: login,
            password: password
        })
    }).then((response) => {
        return Promise.all([response.status, response.json()])
    }).then(([responseStatus, responseData]) => {
        if (responseStatus === 201) {
            setToken(responseData.user.token);
            setUserName(responseData.user.name);
            return Promise.resolve();
        }
        return Promise.reject(responseData);
    }).catch((error) => {
        if (error instanceof TypeError && error.message === "Failed to fetch") alert(`Отсутствует интернет-соединение`);
        return Promise.reject(error);
    });
}
