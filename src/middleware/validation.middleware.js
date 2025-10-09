import { body } from "express-validator";

export const signUpValidation = [
    body("fullName")
        .trim()
        .notEmpty().withMessage("Имя обязателено")
        .isLength({ max: 255 }).withMessage("Имя не должно превышать 255 символов"),
    body("email")
        .notEmpty().withMessage("Почта обязателена")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 255 }).withMessage("Почта не должна превышать 255 символов")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль обязателен")
        .isLength({ min: 6 }).withMessage("Пароль должен содержать минимум 6 символов")
        .isLength({ max: 255 }).withMessage("Пароль не должен превышать 255 символов")
];

export const signInValidation = [
    body("email")
        .notEmpty().withMessage("Почта обязателена")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 255 }).withMessage("Почта не должна превышать 255 символов")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль обязателен")
        .isLength({ min: 6 }).withMessage("Пароль должен содержать минимум 6 символов")
        .isLength({ max: 255 }).withMessage("Пароль не должен превышать 255 символов")
];

export const updateUserValidation = [
    body("fullName")
        .trim()
        .notEmpty().withMessage("Имя обязателено")
        .isLength({ max: 255 }).withMessage("Имя не должно превышать 255 символов"),
    body("email")
        .notEmpty().withMessage("Почта обязателена")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 255 }).withMessage("Почта не должна превышать 255 символов")
        .normalizeEmail(),
    body("oldPassword")
        .trim()
        .notEmpty().withMessage("Пароль обязателен")
        .isLength({ min: 6 }).withMessage("Пароль должен содержать минимум 6 символов")
        .isLength({ max: 255 }).withMessage("Пароль не должен превышать 255 символов"),
    body("newPassword")
        .trim()
        .notEmpty().withMessage("Новый пароль обязателен")
        .isLength({ min: 6 }).withMessage("Новый пароль должен содержать минимум 6 символов")
        .isLength({ max: 255 }).withMessage("Новый пароль не должен превышать 255 символов")
];

export const productValidation = [
    body("title")
        .trim()
        .notEmpty().withMessage("Название обязателено")
        .isLength({ max: 255 }).withMessage("Название не должно превышать 255 символов"),
    body("description")
        .trim()
        .notEmpty().withMessage("Описание обязателено")
        .isLength({ max: 500 }).withMessage("Описание не должно превышать 500 символов")
];