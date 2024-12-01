import { LogLevel } from '../enum/LogLevel';

export interface ILogger {
    log(level: LogLevel, message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    trackError(error: Error): void;
    trackAction(action: string, details: string): void;
}
