// tests/taskService.unit.test.js — Модульний тест №2
const {
    createTask,
    toggleTaskStatus,
    filterTasks,
    getTasksSummary
} = require('../src/taskService');

describe('Модуль taskService (Unit Test #2)', () => {
    test('Створення завдання, перемикання статусу та підрахунок статистики', () => {
        const t1 = createTask('Вивчити Jest', 'high');
        const t2 = createTask('Написати тести', 'normal', true);

        expect(t1.title).toBe('Вивчити Jest');
        expect(t1.completed).toBe(false);

        const updated = toggleTaskStatus([t1, t2], t1.id);
        expect(updated[0].completed).toBe(true);
        expect(filterTasks(updated, 'completed')).toHaveLength(2);
        expect(filterTasks(updated, 'active')).toHaveLength(0);
        expect(getTasksSummary(updated)).toEqual({ total: 2, active: 0, completed: 2 });
    });

    test('Відхилення некоректного пріоритету при створенні завдання', () => {
        expect(() => createTask('Тестове завдання', 'blocker')).toThrow('Невідомий пріоритет: blocker');
    });
});
