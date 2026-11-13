// src/syncApi.js
const axios = require('axios');
const { createTask, getTasksSummary } = require('./taskService');
const { saveTasks } = require('./storage');

const REMOTE_TODOS_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';

/**
 * Завантажує завдання з віддаленого API та адаптує їх до моделі TodoManager.
 * @returns {Promise<Array<Object>>}
 */
async function fetchRemoteTasks() {
    const response = await axios.get(REMOTE_TODOS_URL);
    return response.data.map((item) =>
        createTask(item.title, item.completed ? 'low' : 'high', item.completed)
    );
}

/**
 * Інтеграційний сценарій: отримує завдання через API, зберігає у сховище та повертає зведення.
 * @param {Object} store
 * @param {string} storageKey
 * @returns {Promise<{ tasks: Array<Object>, summary: Object }>}
 */
async function syncTasksWithStorage(store, storageKey = 'todos') {
    const tasks = await fetchRemoteTasks();
    saveTasks(store, storageKey, tasks);
    const summary = getTasksSummary(tasks);
    return { tasks, summary };
}

module.exports = {
    REMOTE_TODOS_URL,
    fetchRemoteTasks,
    syncTasksWithStorage
};
