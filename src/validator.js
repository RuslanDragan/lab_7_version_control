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
    const trimmed = rawTitle.trim();
    if (trimmed.length === 0) {
        throw new Error('Назва завдання не може бути порожньою');
    }
    if (trimmed.length > MAX_TITLE_LENGTH) {
        throw new Error(`Назва завдання не повинна перевищувати ${MAX_TITLE_LENGTH} символів`);
    }
    return trimmed;
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
