const personalKey = "uvarov-ms";

/**
 * Получить список комментариев
 */
export function getComments() {
    return fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`, {
        method: `GET`,
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
    return fetch(`https://wedev-api.sky.pro/api/v1/${personalKey}/comments`, {
        method: `POST`,
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
                postComment(name, comment);
                return Promise.reject();
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