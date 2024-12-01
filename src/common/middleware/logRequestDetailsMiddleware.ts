import { Request, Response, NextFunction } from 'express';
import useragent from 'useragent';
import { appContainer } from '../configs/inversify.config'; // دریافت کانتینر
import { ILogger } from '../interfaces/ILogger';
import { COMMON_TYPES } from '../common_injection_container';

const logRequestDetailsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const logger = appContainer.get<ILogger>(COMMON_TYPES.MyLogger); // دریافت logger از کانتینر DI
    const userIp = req.ip;
    const userAgent = req.headers['user-agent'];

    if (userAgent) {
        const agent = useragent.parse(userAgent);
        logger.info(`Request from IP: ${userIp}, Browser: ${agent.toAgent()}, OS: ${agent.os.toString()}, Device: ${agent.device.toString()}`);
    } else {
        logger.info(`Request from IP: ${userIp}, User-Agent not available`);
    }

    next(); // انتقال به middleware بعدی
};

export default logRequestDetailsMiddleware;
