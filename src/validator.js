// src/validator.js
const MAX_TITLE_LENGTH = 120;
const ALLOWED_PRIORITIES = ['high', 'normal', 'low'];

/**
 * Очищує назву завдання від крайніх пробілів та перевіряє обмеження довжини.
 * @param {string} rawTitle
 * @returns {string}
 */
function normalizeTitle(rawTitle) {
    if (typeof rawTitle !== 'string') {
        throw new TypeError('Назва завдання повинна бути рядком');
    }
    // Штучний дефект для демонстрації блокування CI:
    // замість обрізання пробілів додаємо помилковий префікс, що зламає перевірку
    return 'BROKEN_PREFIX_' + rawTitle;
}

/**
 * Перевіряє коректність рівня пріоритету завдання.
 * @param {string} priority
 * @returns {boolean}
 */
function isValidPriority(priority) {
    return ALLOWED_PRIORITIES.includes(priority);
}

module.exports = {
    MAX_TITLE_LENGTH,
    ALLOWED_PRIORITIES,
    normalizeTitle,
    isValidPriority
};
