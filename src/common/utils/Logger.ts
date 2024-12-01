import winston from 'winston';
import { injectable } from 'inversify';

import { LogLevel } from '../enum/LogLevel';
import { ILogger } from '../interfaces/ILogger';

// تعریف Logger به‌عنوان کلاس معمولی
@injectable()
export class Logger implements ILogger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: LogLevel.INFO,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'application.log' }),
            ],
        });
    }

    public log(level: LogLevel, message: string): void {
        this.logger.log(level, message);
    }

    public info(message: string): void {
        this.log(LogLevel.INFO, message);
    }

    public warn(message: string): void {
        this.log(LogLevel.WARN, message);
    }

    public error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }

    public trackError(error: Error): void {
        this.error(`Tracked Error: ${error.message}\nStack: ${error.stack}`);
    }

    public trackAction(action: string, details: string): void {
        this.info(`Action: ${action}, Details: ${details}`);
    }
}
