// src/middleware/loggerMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { appContainer } from '../configs/inversify.config'; // دریافت کانتینر
import { ILogger } from '../interfaces/ILogger';
import { COMMON_TYPES } from '../common_injection_container';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const logger = appContainer.get<ILogger>(COMMON_TYPES.MyLogger); // دریافت logger از کانتینر DI
    logger.info(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`); // ثبت اطلاعات درخواست
    next(); // انتقال به middleware بعدی
};

export default loggerMiddleware;
