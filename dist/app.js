"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const commonMiddleware_1 = require("./common/middleware/commonMiddleware");
const inversify_config_1 = require("./common/configs/inversify.config"); // افزودن کانتینر DI
const common_injection_container_1 = require("./common/common_injection_container"); // اضافه کردن COMMON_TYPES
const loggerMiddleware_1 = __importDefault(require("./common/middleware/loggerMiddleware"));
const logRequestDetailsMiddleware_1 = __importDefault(require("./common/middleware/logRequestDetailsMiddleware"));
// دریافت logger از طریق DI
const logger = inversify_config_1.appContainer.get(common_injection_container_1.COMMON_TYPES.MyLogger);
// دریافت AuthRoutes از کانتینر DI
//const authRoutes = appContainer.get<IAuthRoutes>(AUTH_TYPES.IAuthRoutes);
// دریافت UserRoutes از کانتینر DI
//const userRoutes = appContainer.get<IUserRoutes>(COMMON_TYPES.IUserRoutes);
// ایجاد اپلیکیشن Express
const app = (0, express_1.default)();
exports.app = app;
// اضافه کردن middleware برای لاگ‌گیری به تمام درخواست‌ها
app.use(loggerMiddleware_1.default);
// اعمال middlewareهای عمومی
(0, commonMiddleware_1.applyCommonMiddleware)(app);
// اضافه کردن middleware برای ثبت جزئیات درخواست‌ها
app.use(logRequestDetailsMiddleware_1.default);
// مسیرهای مربوط به احراز هویت
//app.use('/api/auth', authRoutes.getRouter());
// مسیرهای مربوط به جلسات
//app.use('/api/session', sessionRouter.getRouter());
// مسیرهای مربوط به کاربران
//app.use('/api/user', userRoutes.getRouter());
// مدیریت مسیرهای 404 (پیدا نشدن)
app.use((req, res) => {
    logger.warn(`404 - Route not found - ${req.originalUrl}`); // ثبت خطای 404 با لاگر
    res.status(404).json({
        message: 'Route not found',
    });
});
// مدیریت خطاهای عمومی
app.use((err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`); // ثبت خطا با استفاده از logger
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});
