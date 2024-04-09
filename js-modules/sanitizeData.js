/**
 * Получить текущую дату в формате dd.mm.YYYY hh:mm
 * @return string
 */
export function getFormatedDate(date = null) {
    let formatDateDigits = (digit) => (digit <= 9 ? `0${digit}` : digit)

    if (date.length > 0) date = new Date(date)

    let day = formatDateDigits(date.getDate())
    let month = formatDateDigits(date.getMonth() + 1)
    let year = date.getFullYear()

    let hours = formatDateDigits(date.getHours())
    let minutes = formatDateDigits(date.getMinutes())

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

/**
 * Очистка данных из формы ввода
 * @returns string
 */
export function sanitizeHTML(text) {
    return text
        .trim()
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
}
