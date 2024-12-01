"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_config_1 = require("../configs/inversify.config"); // دریافت کانتینر
const common_injection_container_1 = require("../common_injection_container");
const loggerMiddleware = (req, res, next) => {
    const logger = inversify_config_1.appContainer.get(common_injection_container_1.COMMON_TYPES.MyLogger); // دریافت logger از کانتینر DI
    logger.info(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`); // ثبت اطلاعات درخواست
    next(); // انتقال به middleware بعدی
};
exports.default = loggerMiddleware;
