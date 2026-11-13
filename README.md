# TodoManager Tests (Лабораторна робота №5)

Індивідуальний навчальний JavaScript-проєкт для демонстрації модульного (Unit) та інтеграційного (Integration) тестування за допомогою **Jest** та інтеграції з **Testomat.io**.

## Структура проєкту
- `src/validator.js` — валідація та нормалізація назви й пріоритету завдання
- `src/storage.js` — збереження та завантаження стану (LocalStorage-сумісний інтерфейс)
- `src/taskService.js` — бізнес-логіка створення, перемикання статусу, фільтрації та статистики
- `src/syncApi.js` — завантаження й синхронізація завдань із зовнішнім REST API (`axios`)
- `tests/` — **3 модульні тести** (`validator.unit.test.js`, `taskService.unit.test.js`, `storage.unit.test.js`) та **2 інтеграційні тести** (`taskWorkflow.integration.test.js`, `syncApi.integration.test.js`)

## Запуск тестів
```bash
npm install
npm test
```
