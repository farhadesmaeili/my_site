import mongoose from 'mongoose';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../common/interfaces/ILogger';
import { COMMON_TYPES } from '../../common/common_injection_container';

@injectable()
export class MongoDBConnector {
    private logger: ILogger;

    constructor(@inject(COMMON_TYPES.MyLogger) logger: ILogger) {
        if (!logger) {
            throw new Error('Logger not found during MongoDBConnector injection');
        }
        this.logger = logger;
    }

    public async connectToMongoDB(): Promise<void> {
        try {
            await mongoose.connect(process.env.MONGODB_URI!, {
                serverSelectionTimeoutMS: 30000, // افزایش تایم‌آوت به 30 ثانیه
            });
            this.logger.info('Connected to MongoDB'); // استفاده از logger برای ثبت موفقیت
        } catch (error: any) {
            if (error instanceof Error) {
                this.logger.error('Could not connect to MongoDB'); // استفاده از logger برای ثبت خطا
                this.logger.error(`Error details: ${error.message}`); // ثبت جزئیات خطا
            } else {
                this.logger.error('Could not connect to MongoDB with an unknown error');
            }
            throw error; // ارسال خطا به لایه بالاتر برای مدیریت
        }
    }
}
