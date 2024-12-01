import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { applyCommonMiddleware } from './common/middleware/commonMiddleware';
import { appContainer } from './common/configs/inversify.config'; // افزودن کانتینر DI
import { COMMON_TYPES } from './common/common_injection_container'; // اضافه کردن COMMON_TYPES
import { ILogger } from './common/interfaces/ILogger'; // افزودن ILogger
import loggerMiddleware from './common/middleware/loggerMiddleware';
import logRequestDetailsMiddleware from './common/middleware/logRequestDetailsMiddleware';


// دریافت logger از طریق DI
const logger = appContainer.get<ILogger>(COMMON_TYPES.MyLogger);

// دریافت AuthRoutes از کانتینر DI
//const authRoutes = appContainer.get<IAuthRoutes>(AUTH_TYPES.IAuthRoutes);

// دریافت UserRoutes از کانتینر DI

//const userRoutes = appContainer.get<IUserRoutes>(COMMON_TYPES.IUserRoutes);




// ایجاد اپلیکیشن Express
const app = express();

// اضافه کردن middleware برای لاگ‌گیری به تمام درخواست‌ها
app.use(loggerMiddleware);

// اعمال middlewareهای عمومی
applyCommonMiddleware(app);

// اضافه کردن middleware برای ثبت جزئیات درخواست‌ها
app.use(logRequestDetailsMiddleware);

// مسیرهای مربوط به احراز هویت
//app.use('/api/auth', authRoutes.getRouter());

// مسیرهای مربوط به جلسات
//app.use('/api/session', sessionRouter.getRouter());

// مسیرهای مربوط به کاربران
//app.use('/api/user', userRoutes.getRouter());

// مدیریت مسیرهای 404 (پیدا نشدن)
app.use((req: Request, res: Response) => {
    logger.warn(`404 - Route not found - ${req.originalUrl}`); // ثبت خطای 404 با لاگر
    res.status(404).json({
        message: 'Route not found',
    });
});

// مدیریت خطاهای عمومی
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Unhandled error: ${err.message}`); // ثبت خطا با استفاده از logger
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

export { app };
