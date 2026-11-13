// src/taskService.js
const { normalizeTitle, isValidPriority } = require('./validator');

let nextId = 1;

/**
 * Створює новий об’єкт завдання після валідації назви та пріоритету.
 * @param {string} title
 * @param {string} priority
 * @param {boolean} completed
 * @returns {{ id: number, title: string, priority: string, completed: boolean }}
 */
function createTask(title, priority = 'normal', completed = false) {
    const cleanTitle = normalizeTitle(title);
    if (!isValidPriority(priority)) {
        throw new Error(`Невідомий пріоритет: ${priority}`);
    }
    return {
        id: nextId++,
        title: cleanTitle,
        priority,
        completed: Boolean(completed)
    };
}

/**
 * Перемикає статус виконання завдання за його ідентифікатором.
 * @param {Array<Object>} tasks
 * @param {number} id
 * @returns {Array<Object>}
 */
function toggleTaskStatus(tasks, id) {
    return tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
}

/**
 * Фільтрує список завдань за статусом ('all' | 'active' | 'completed').
 * @param {Array<Object>} tasks
 * @param {string} filter
 * @returns {Array<Object>}
 */
function filterTasks(tasks, filter = 'all') {
    if (filter === 'active') {
        return tasks.filter((t) => !t.completed);
    }
    if (filter === 'completed') {
        return tasks.filter((t) => t.completed);
    }
    return tasks;
}

/**
 * Повертає підсумкову статистику списку завдань.
 * @param {Array<Object>} tasks
 * @returns {{ total: number, active: number, completed: number }}
 */
function getTasksSummary(tasks) {
    const completed = tasks.filter((t) => t.completed).length;
    return {
        total: tasks.length,
        active: tasks.length - completed,
        completed
    };
}

module.exports = {
    createTask,
    toggleTaskStatus,
    filterTasks,
    getTasksSummary
};
