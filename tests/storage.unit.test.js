// tests/storage.unit.test.js — Модульний тест №3
const { saveTasks, loadTasks, createMemoryStorage } = require('../src/storage');

describe('Модуль storage (Unit Test #3)', () => {
    test('Збереження та завантаження списку завдань у сховищі', () => {
        const store = createMemoryStorage();
        const sample = [{ id: 1, title: 'Перевірити LocalStorage', completed: false }];

        saveTasks(store, 'todos', sample);
        expect(loadTasks(store, 'todos')).toEqual(sample);
    });

    test('Безпечно повертає порожній масив при пошкодженому JSON', () => {
        const store = createMemoryStorage();
        store.setItem('todos', '{invalid_json');

        expect(loadTasks(store, 'todos')).toEqual([]);
        expect(loadTasks(store, 'missing_key')).toEqual([]);
    });
});
