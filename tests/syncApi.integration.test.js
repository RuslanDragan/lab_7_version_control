// tests/syncApi.integration.test.js — Інтеграційний тест №2
const axios = require('axios');
const { REMOTE_TODOS_URL, syncTasksWithStorage } = require('../src/syncApi');
const { loadTasks, createMemoryStorage } = require('../src/storage');

jest.mock('axios');

describe('Інтеграція syncApi + axios (mock) + taskService + storage (Integration Test #2)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Успішна синхронізація завдань із замоканого API та збереження в сховище', async () => {
        const mockApiResponse = {
            data: [
                { userId: 1, id: 101, title: '  Підготувати середовище Node.js  ', completed: true },
                { userId: 1, id: 102, title: 'Запустити Jest тести', completed: false }
            ]
        };
        axios.get.mockResolvedValueOnce(mockApiResponse);

        const store = createMemoryStorage();
        const result = await syncTasksWithStorage(store, 'remote_todos');

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(REMOTE_TODOS_URL);
        expect(result.summary).toEqual({ total: 2, active: 1, completed: 1 });

        const saved = loadTasks(store, 'remote_todos');
        expect(saved).toHaveLength(2);
        expect(saved[0].title).toBe('Підготувати середовище Node.js');
        expect(saved[0].priority).toBe('low');
        expect(saved[1].priority).toBe('high');
    });

    test('Обробка помилки мережі при недоступності API без пошкодження сховища', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error: 503 Service Unavailable'));
        const store = createMemoryStorage();

        await expect(syncTasksWithStorage(store, 'remote_todos')).rejects.toThrow('503 Service Unavailable');
        expect(loadTasks(store, 'remote_todos')).toEqual([]);
    });
});
