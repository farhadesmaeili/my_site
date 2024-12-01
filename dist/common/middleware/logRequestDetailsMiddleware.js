"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useragent_1 = __importDefault(require("useragent"));
const inversify_config_1 = require("../configs/inversify.config"); // دریافت کانتینر
const common_injection_container_1 = require("../common_injection_container");
const logRequestDetailsMiddleware = (req, res, next) => {
    const logger = inversify_config_1.appContainer.get(common_injection_container_1.COMMON_TYPES.MyLogger); // دریافت logger از کانتینر DI
    const userIp = req.ip;
    const userAgent = req.headers['user-agent'];
    if (userAgent) {
        const agent = useragent_1.default.parse(userAgent);
        logger.info(`Request from IP: ${userIp}, Browser: ${agent.toAgent()}, OS: ${agent.os.toString()}, Device: ${agent.device.toString()}`);
    }
    else {
        logger.info(`Request from IP: ${userIp}, User-Agent not available`);
    }
    next(); // انتقال به middleware بعدی
};
exports.default = logRequestDetailsMiddleware;
