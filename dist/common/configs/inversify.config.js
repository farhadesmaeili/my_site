"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = void 0;
const inversify_1 = require("inversify");
const common_injection_container_1 = require("../common_injection_container");
// تعریف کانتینر اصلی
const appContainer = new inversify_1.Container();
exports.appContainer = appContainer;
// بارگذاری کانتینر common
appContainer.load(common_injection_container_1.commonContainer);
// دریافت Logger از کانتینر
const logger = appContainer.get(common_injection_container_1.COMMON_TYPES.MyLogger);
if (!logger) {
    throw new Error('Logger not found in the container');
}
// تعریف کانتینرها
const containers = [
    { container: common_injection_container_1.commonContainer, name: 'Common' },
];
// حلقه برای بارگذاری هر کانتینر
containers.forEach(({ container, name }) => {
    try {
        appContainer.load(container); // بارگذاری کانتینر
        logger.info(`${name} container loaded successfully`);
    }
    catch (error) {
        logger.error(`Failed to load ${name} container`);
        if (error instanceof Error) {
            logger.trackError(error);
        }
        else {
            logger.error('An unknown error occurred while loading the container.');
        }
    }
});
