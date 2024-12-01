"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCommonMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const applyCommonMiddleware = (app) => {
    app.use((0, cors_1.default)()); // فعال کردن CORS
    app.use(body_parser_1.default.json()); // پارس کردن JSON در درخواست‌ها
    app.use((0, morgan_1.default)('combined')); // ثبت لاگ‌های درخواست‌ها با فرمت 'combined'
    // سایر middlewareها مانند لاگ‌گیری یا احراز هویت را می‌توان اضافه کرد
};
exports.applyCommonMiddleware = applyCommonMiddleware;
