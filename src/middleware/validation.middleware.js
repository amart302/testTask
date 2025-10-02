import { body } from "express-validator";


export const signUpValidation = [
    body("fullName")
        .trim()
        .notEmpty().withMessage("Имя обязателено")
        .isLength({ max: 255 }).withMessage("Имя не должно превышать 100 символов"),
    body("email")
        .notEmpty().withMessage("Почта обязателена")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 255 }).withMessage("Почта не должна превышать 100 символов")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль обязателен")
        .isLength({ min: 6 }).withMessage("Пароль должен содержать минимум 6 символов")
        .isLength({ max: 100 }).withMessage("Пароль не должен превышать 100 символов")
];

export const signInValidation = [
    body("email")
        .notEmpty().withMessage("Почта обязателена")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 100 }).withMessage("Почта не должна превышать 100 символов")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль обязателен")
        .isLength({ min: 6 }).withMessage("Пароль должен содержать минимум 6 символов")
        .isLength({ max: 100 }).withMessage("Пароль не должен превышать 100 символов")
];