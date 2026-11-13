// tests/validator.unit.test.js — Модульний тест №1
const { normalizeTitle, isValidPriority, MAX_TITLE_LENGTH } = require('../src/validator');

describe('Модуль validator (Unit Test #1)', () => {
    test('Обрізає зайві пробіли та повертає коректну назву', () => {
        expect(normalizeTitle('   Підготувати звіт ЛР5   ')).toBe('Підготувати звіт ЛР5');
    });

    test('Відхиляє порожній рядок або рядок з одних пробілів', () => {
        expect(() => normalizeTitle('')).toThrow('Назва завдання не може бути порожньою');
        expect(() => normalizeTitle('     ')).toThrow('Назва завдання не може бути порожньою');
    });

    test('Обмежує наддовгий рядок понад 120 символів та перевіряє пріоритети', () => {
        const longText = 'A'.repeat(MAX_TITLE_LENGTH + 1);
        expect(() => normalizeTitle(longText)).toThrow(`не повинна перевищувати ${MAX_TITLE_LENGTH}`);
        expect(isValidPriority('high')).toBe(true);
        expect(isValidPriority('urgent')).toBe(false);
    });
});
