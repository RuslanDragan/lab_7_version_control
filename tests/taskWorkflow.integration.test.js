// tests/taskWorkflow.integration.test.js — Інтеграційний тест №1
const { createTask, toggleTaskStatus, filterTasks, getTasksSummary } = require('../src/taskService');
const { saveTasks, loadTasks, createMemoryStorage } = require('../src/storage');

describe('Інтеграція taskService + validator + storage (Integration Test #1)', () => {
    test('Повний цикл керування завданнями зі збереженням та відновленням стану', () => {
        const store = createMemoryStorage();

        // 1. Створення завдань (інтеграція taskService + validator)
        const task1 = createTask('  Купити молоко  ', 'high');
        const task2 = createTask('Здати лабораторну роботу №5', 'normal');
        const initialList = [task1, task2];

        // 2. Перемикання статусу першого завдання та збереження у сховище
        const updatedList = toggleTaskStatus(initialList, task1.id);
        saveTasks(store, 'todomvc_state', updatedList);

        // 3. Імітація перезавантаження (читання зі сховища та фільтрація)
        const restoredList = loadTasks(store, 'todomvc_state');
        expect(restoredList).toHaveLength(2);
        expect(filterTasks(restoredList, 'completed').map((t) => t.title)).toEqual(['Купити молоко']);
        expect(filterTasks(restoredList, 'active').map((t) => t.title)).toEqual(['Здати лабораторну роботу №5']);
        expect(getTasksSummary(restoredList)).toEqual({ total: 2, active: 1, completed: 1 });
    });
});
