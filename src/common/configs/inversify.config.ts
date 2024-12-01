import { Container, ContainerModule } from 'inversify';
import { commonContainer, COMMON_TYPES } from '../common_injection_container';
import { ILogger } from '../../common/interfaces/ILogger';

// تعریف کانتینر اصلی
const appContainer = new Container();

// بارگذاری کانتینر common
appContainer.load(commonContainer);

// دریافت Logger از کانتینر
const logger = appContainer.get<ILogger>(COMMON_TYPES.MyLogger);
if (!logger) {
    throw new Error('Logger not found in the container');
}

// تعریف اینترفیس برای آرایه کانتینرها
interface ContainerDefinition {
    container: ContainerModule;
    name: string;
}

// تعریف کانتینرها
const containers: ContainerDefinition[] = [
    { container: commonContainer, name: 'Common' },
];

// حلقه برای بارگذاری هر کانتینر
containers.forEach(({ container, name }) => {
    try {
        appContainer.load(container); // بارگذاری کانتینر
        logger.info(`${name} container loaded successfully`);
    } catch (error) {
        logger.error(`Failed to load ${name} container`);
        if (error instanceof Error) {
            logger.trackError(error);
        } else {
            logger.error('An unknown error occurred while loading the container.');
        }
    }
});

export { appContainer };
