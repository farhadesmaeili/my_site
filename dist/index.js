"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata"); // افزودن reflect-metadata
const app_1 = require("./app");
const inversify_config_1 = require("./common/configs/inversify.config"); // Import DI container
const common_injection_container_1 = require("./common/common_injection_container"); // Import COMMON_TYPES
// استخراج logger از کانتینر DI
const logger = inversify_config_1.appContainer.get(common_injection_container_1.COMMON_TYPES.MyLogger);
if (!logger) {
    throw new Error('Logger not found in the container');
}
// استخراج MongoDBConnector از کانتینر DI
const mongoDBConnector = inversify_config_1.appContainer.get(common_injection_container_1.COMMON_TYPES.MongoDBConnector);
if (!mongoDBConnector) {
    throw new Error('MongoDBConnector not found in the container');
}
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // اتصال به MongoDB با استفاده از MongoDBConnector
        yield mongoDBConnector.connectToMongoDB();
        // راه‌اندازی سرور
        const PORT = process.env.PORT || 3000;
        app_1.app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`); // ثبت پیام موفقیت
        });
    }
    catch (error) {
        // مدیریت خطاها
        if (error instanceof Error) {
            logger.error('Failed to start server'); // ثبت خطای سرور
            logger.error(`Error message: ${error.message}`); // جزئیات پیام خطا
            logger.error(`Stack trace: ${error.stack}`); // جزئیات stack trace
        }
        else {
            logger.error('Failed to start server with an unknown error'); // خطای عمومی
        }
        process.exit(1); // خروج با کد 1
    }
});
// شروع سرور
startServer();
