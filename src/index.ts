import 'dotenv/config';
import 'reflect-metadata'; // افزودن reflect-metadata
import { app } from './app';
import { MongoDBConnector } from './common/database/MongoDBConnector'; // Import MongoDBConnector
import { appContainer } from './common/configs/inversify.config'; // Import DI container
import { COMMON_TYPES } from './common/common_injection_container'; // Import COMMON_TYPES
import { ILogger } from './common/interfaces/ILogger'; // Import logger interface

// استخراج logger از کانتینر DI
const logger = appContainer.get<ILogger>(COMMON_TYPES.MyLogger);
if (!logger) {
    throw new Error('Logger not found in the container');
}
// استخراج MongoDBConnector از کانتینر DI
const mongoDBConnector = appContainer.get<MongoDBConnector>(COMMON_TYPES.MongoDBConnector);
if (!mongoDBConnector) {
    throw new Error('MongoDBConnector not found in the container');
}

const startServer = async () => {
    try {
        // اتصال به MongoDB با استفاده از MongoDBConnector
        await mongoDBConnector.connectToMongoDB();

        // راه‌اندازی سرور
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`); // ثبت پیام موفقیت
        });
    } catch (error) {
        // مدیریت خطاها
        if (error instanceof Error) {
            logger.error('Failed to start server'); // ثبت خطای سرور
            logger.error(`Error message: ${error.message}`); // جزئیات پیام خطا
            logger.error(`Stack trace: ${error.stack}`); // جزئیات stack trace
        } else {
            logger.error('Failed to start server with an unknown error'); // خطای عمومی
        }
        process.exit(1); // خروج با کد 1
    }
};

// شروع سرور
startServer();
