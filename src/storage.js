// src/storage.js
/**
 * Зберігає масив завдань у сумісне з localStorage сховище.
 * @param {{ getItem: Function, setItem: Function }} store
 * @param {string} key
 * @param {Array<Object>} tasks
 */
function saveTasks(store, key, tasks) {
    if (!store || typeof store.setItem !== 'function') {
        throw new Error('Некоректний об’єкт сховища');
    }
    store.setItem(key, JSON.stringify(tasks));
}

/**
 * Зчитує масив завдань зі сховища з безпечною обробкою пошкодженого JSON.
 * @param {{ getItem: Function, setItem: Function }} store
 * @param {string} key
 * @returns {Array<Object>}
 */
function loadTasks(store, key) {
    if (!store || typeof store.getItem !== 'function') {
        throw new Error('Некоректний об’єкт сховища');
    }
    const raw = store.getItem(key);
    if (!raw) {
        return [];
    }
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

/**
 * Створює просту реалізацію сховища в оперативній пам’яті для тестів.
 */
function createMemoryStorage() {
    const data = new Map();
    return {
        getItem: (key) => (data.has(key) ? data.get(key) : null),
        setItem: (key, value) => data.set(key, String(value)),
        clear: () => data.clear()
    };
}

module.exports = {
    saveTasks,
    loadTasks,
    createMemoryStorage
};
